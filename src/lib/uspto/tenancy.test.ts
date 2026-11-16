import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateMaintenance } from "./deadlines";
import type { CandidateAlert } from "./feed";
import { MemoryUsptoStore } from "./watch-store";

describe("tenant isolation", () => {
  it("does not return another tenant's watch, reminder, or alert disposition", async () => {
    const store = new MemoryUsptoStore();
    store.addWatch({
      id: "shared-id",
      tenantId: "tenant-a",
      identifierType: "registration",
      normalizedIdentifier: "2178784",
      serialNumber: "74631225",
      mark: "JAVA",
      paused: false,
      createdAt: "2026-11-16T00:00:00.000Z",
      removedAt: null,
    });
    assert.equal(store.getWatch("tenant-b", "shared-id"), null);
    assert.equal(store.listWatches("tenant-b").length, 0);
    assert.equal(store.removeWatch("tenant-b", "shared-id", "2026-11-16T00:00:00.000Z"), null);
    assert.equal(store.getWatch("tenant-a", "shared-id")?.removedAt, null);

    const maintenance = calculateMaintenance({
      registrationDate: "2020-01-15",
      filingDate: "2019-01-15",
      legalBasis: "1a",
      serialNumber: "74631225",
      statusText: "Registered",
      statusDate: "2020-01-15",
      asOf: "2025-07-15",
    });
    await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "shared-id",
      maintenance,
      now: "2025-07-15",
      paused: false,
    });
    assert.equal(store.remindersFor("tenant-b").length, 0);
    assert.ok(store.remindersFor("tenant-a").length > 0);

    const alert: CandidateAlert = {
      tenantId: "tenant-a",
      watchId: "shared-id",
      candidateSerial: "99000001",
      comparison: {
        matched: true,
        priority: "high",
        reasons: ["synthetic"],
        ruleVersion: "test",
        watchedOriginal: "JAVA",
        candidateOriginal: "JAVA",
        classNote: "context",
      },
      classification: "new_filing",
      visibility: "internal_review",
      statusCode: "630",
      filingDate: "2026-11-02",
      events: ["synthetic"],
    };
    store.upsertAlerts([alert]);
    assert.equal(store.setDisposition("tenant-b", "tenant-a:shared-id:99000001", "dismissed"), null);
    assert.equal(store.alertsFor("tenant-a")[0]?.disposition, "open");
    assert.equal(
      store.setDisposition("tenant-a", "tenant-a:shared-id:99000001", "dismissed")?.disposition,
      "dismissed",
    );
    assert.equal(store.alertsFor("tenant-b").length, 0);

    store.removeWatch("tenant-a", "shared-id", "2026-11-16T01:00:00.000Z");
    assert.equal(store.listWatches("tenant-a").length, 0);
    assert.equal(store.listWatches("tenant-a", true)[0]?.removedAt, "2026-11-16T01:00:00.000Z");
  });
});
