import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { handleDailyRequest, handleLookupRequest, handleWatchRequest } from "./handlers";
import { MemoryUsptoStore } from "./watch-store";

const flagsOn = {
  lookup: true,
  reminders: true,
  applicationMonitoring: true,
  liveEmail: false,
};

describe("request gates", () => {
  it("hides the feature when the flag is off and ignores a browser-supplied tenant", async () => {
    const hidden = await handleLookupRequest({
      flags: { ...flagsOn, lookup: false },
      tenantId: "tenant-a",
      body: { identifierType: "application", identifier: "78787878", tenantId: "tenant-b" },
    });
    assert.equal(hidden.status, 404);

    let called = false;
    const unauthenticated = await handleLookupRequest({
      flags: flagsOn,
      tenantId: null,
      body: { identifierType: "application", identifier: "78787878", tenantId: "tenant-b" },
      lookup: async () => {
        called = true;
        throw new Error("should not run");
      },
    });
    assert.equal(unauthenticated.status, 401);
    assert.equal(called, false);
  });

  it("rejects a bad identifier and reports a missing key without an empty record", async () => {
    const invalid = await handleLookupRequest({
      flags: flagsOn,
      tenantId: "tenant-a",
      body: { identifierType: "application", identifier: "AB-12" },
    });
    assert.equal(invalid.status, 400);

    const missingKey = await handleLookupRequest({
      flags: flagsOn,
      tenantId: "tenant-a",
      body: { identifierType: "registration", identifier: "2178784" },
      lookup: async ({ apiKey }) => ({
        ok: false,
        error: apiKey ? "provider_error" : "unavailable_key",
        staleView: null,
        detail: "USPTO_TSDR_API_KEY is not set.",
      }),
    });
    assert.equal(missingKey.status, 503);
    assert.equal(missingKey.body.error, "unavailable_key");
    assert.equal(JSON.stringify(missingKey.body).includes("secret"), false);
  });

  it("protects the daily route and does not claim that no similar applications were found", () => {
    const disabled = handleDailyRequest({
      flags: {
        lookup: false,
        reminders: false,
        applicationMonitoring: false,
        liveEmail: false,
      },
      authorization: null,
      now: "2026-11-16",
    });
    assert.equal(disabled.status, 200);
    assert.equal(disabled.body.status, "disabled");

    process.env.USPTO_CRON_SECRET = "cron-test-secret";
    const rejected = handleDailyRequest({
      flags: flagsOn,
      authorization: "Bearer wrong",
      now: "2026-11-16",
    });
    assert.equal(rejected.status, 401);

    const blocked = handleDailyRequest({
      flags: flagsOn,
      authorization: "Bearer cron-test-secret",
      now: "2026-11-16",
    });
    delete process.env.USPTO_CRON_SECRET;
    assert.equal(blocked.status, 200);
    assert.equal(blocked.body.status, "blocked");
    assert.equal(blocked.body.liveEmail, false);
    assert.doesNotMatch(JSON.stringify(blocked.body), /No similar applications found/);
  });

  it("does not pause another tenant's watch through the handler", async () => {
    const store = new MemoryUsptoStore();
    store.addWatch({
      id: "w1",
      tenantId: "tenant-a",
      identifierType: "application",
      normalizedIdentifier: "78787878",
      serialNumber: "78787878",
      mark: "Example",
      paused: false,
      createdAt: "2026-11-16",
      removedAt: null,
    });
    const result = await handleWatchRequest({
      flags: flagsOn,
      tenantId: "tenant-b",
      method: "PATCH",
      body: { watchId: "w1" },
      store: { ok: true, store },
    });
    assert.equal(result.status, 404);
    assert.equal(store.getWatch("tenant-a", "w1")?.paused, false);
  });
});

describe("source guards", () => {
  it("keeps USPTO secrets out of client components and keeps Stripe test mode and the chatbot script", () => {
    const root = join(process.cwd(), "src");
    const files = walk(root);
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      assert.equal(text.includes("NEXT_PUBLIC_USPTO"), false, file);
      if (text.includes('"use client"') || text.includes("'use client'")) {
        assert.equal(text.includes("USPTO_TSDR_API_KEY"), false, file);
        assert.equal(text.includes("USPTO_ODP_API_KEY"), false, file);
        assert.equal(text.includes("USPTO_CRON_SECRET"), false, file);
      }
    }
    const cards = readFileSync(join(root, "components/FeatureCardsGrid.tsx"), "utf8");
    assert.equal(cards.includes("Section 8"), false);
    const brand = readFileSync(join(root, "app/brand-owners/page.tsx"), "utf8");
    assert.equal(brand.includes("alert you months in advance"), false);
    assert.equal(brand.includes("lookalike marks abroad"), false);
    const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
    assert.match(layout, /confident-mastiff-102\.convex\.site\/chat\/widget\.js/);
    const checkout = readFileSync(
      join(root, "components/get-started/GetStartedEmbed.tsx"),
      "utf8",
    );
    assert.match(checkout, /Stripe TEST/);
  });
});

function walk(directory: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) found.push(...walk(path));
    else if (
      (entry.endsWith(".ts") || entry.endsWith(".tsx")) &&
      !entry.endsWith(".test.ts")
    ) {
      found.push(path);
    }
  }
  return found;
}
