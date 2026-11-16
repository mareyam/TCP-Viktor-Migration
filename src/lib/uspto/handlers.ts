import { timingSafeEqual } from "node:crypto";
import { usptoFlags, type UsptoFlags, readEnv, USPTO_ENV } from "./flags";
import { validateIdentifier } from "./identifiers";
import { getStore, type MemoryUsptoStore, type StoreHandle } from "./watch-store";
import { createLookupClient, type LookupResult } from "./tsdr";
import { MONITORING_DELAYED } from "./feed";

export type HandlerResult = { status: number; body: Record<string, unknown> };

function secretsMatch(provided: string | null, expected: string | null): boolean {
  if (!provided || !expected) return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function bearer(authorization: string | null): string | null {
  if (!authorization) return null;
  const match = /^Bearer\s+(.+)$/.exec(authorization.trim());
  return match ? match[1] : null;
}

export async function handleLookupRequest(input: {
  flags: UsptoFlags;
  tenantId: string | null;
  body: unknown;
  lookup?: (args: {
    type: "application" | "registration";
    normalized: string;
    apiKey: string | null;
  }) => Promise<LookupResult>;
}): Promise<HandlerResult> {
  if (!input.flags.lookup) return { status: 404, body: { error: "not_found" } };
  if (!input.tenantId) return { status: 401, body: { error: "unauthenticated" } };
  const body = (input.body ?? {}) as { identifierType?: unknown; identifier?: unknown };
  if (typeof body.identifierType !== "string" || typeof body.identifier !== "string") {
    return { status: 400, body: { error: "invalid_identifier" } };
  }
  const parsed = validateIdentifier(body.identifierType, body.identifier);
  if (!parsed.ok) return { status: 400, body: { error: "invalid_identifier", detail: parsed.error } };
  const apiKey = readEnv(USPTO_ENV.tsdrApiKey);
  const lookup =
    input.lookup ??
    (async (args) => {
      const client = createLookupClient();
      return client.lookup(args);
    });
  const result = await lookup({
    type: parsed.type,
    normalized: parsed.normalized,
    apiKey,
  });
  if (!result.ok) {
    return {
      status: result.error === "missing_record" ? 404 : 503,
      body: {
        error: result.error,
        detail: result.detail,
        stale: result.staleView
          ? { mark: result.staleView.mark, lastFetched: result.staleView.lastFetched, stale: true }
          : null,
      },
    };
  }
  if (result.view.fixtureLabel === "synthetic") {
    return {
      status: 200,
      body: {
        fixture: "synthetic",
        notice: "Synthetic fixture. This is not a live USPTO result.",
        record: result.view,
      },
    };
  }
  return { status: 200, body: { record: result.view } };
}

export async function handleWatchRequest(input: {
  flags: UsptoFlags;
  tenantId: string | null;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body: unknown;
  store: StoreHandle;
}): Promise<HandlerResult> {
  if (!input.flags.lookup) return { status: 404, body: { error: "not_found" } };
  if (!input.tenantId) return { status: 401, body: { error: "unauthenticated" } };
  if (!input.store.ok) {
    return { status: 503, body: { error: "persistence_not_configured", detail: input.store.reason } };
  }
  const store = input.store.store;
  if (input.method === "GET") {
    return { status: 200, body: { watches: store.listWatches(input.tenantId) } };
  }
  const body = (input.body ?? {}) as { watchId?: unknown };
  if (typeof body.watchId !== "string") {
    return { status: 400, body: { error: "invalid_watch" } };
  }
  if (input.method === "DELETE") {
    const removed = store.removeWatch(input.tenantId, body.watchId, new Date().toISOString());
    if (!removed) return { status: 404, body: { error: "not_found" } };
    return { status: 200, body: { removed: true } };
  }
  const paused = store.pauseWatch(input.tenantId, body.watchId, true);
  if (!paused) return { status: 404, body: { error: "not_found" } };
  return { status: 200, body: { paused: true } };
}

export function handleDailyRequest(input: {
  flags?: UsptoFlags;
  authorization: string | null;
  now: string;
  store?: StoreHandle;
}): HandlerResult {
  const flags = input.flags ?? usptoFlags();
  const anyEnabled = flags.lookup || flags.reminders || flags.applicationMonitoring;
  if (!anyEnabled) {
    return {
      status: 200,
      body: {
        status: "disabled",
        applicationMonitoring: "disabled",
        reminders: "disabled",
        lookup: "disabled",
      },
    };
  }
  const secret = readEnv(USPTO_ENV.cronSecret);
  if (!secretsMatch(bearer(input.authorization), secret)) {
    return { status: 401, body: { error: "unauthorized" } };
  }
  const store = input.store ?? getStore();
  if (!store.ok) {
    return {
      status: 200,
      body: {
        status: "blocked",
        blocker: store.reason,
        publicMessage: flags.applicationMonitoring ? MONITORING_DELAYED : "Not enabled",
        liveEmail: false,
      },
    };
  }
  const memory: MemoryUsptoStore = store.store;
  const reminders = memory.remindersFor("operator-not-a-tenant");
  return {
    status: 200,
    body: {
      status: "ok",
      checkedAt: input.now,
      reminderRowsSeen: reminders.length,
      liveEmail: false,
      publicMessage: flags.applicationMonitoring ? MONITORING_DELAYED : "Not enabled",
    },
  };
}
