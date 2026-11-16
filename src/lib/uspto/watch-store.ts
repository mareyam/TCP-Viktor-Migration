import { applyReminderRun, planReminders, type Reminder } from "./reminders";
import type { MaintenanceResult } from "./deadlines";
import type { CandidateAlert } from "./feed";
import { readEnv, USPTO_ENV } from "./flags";

export type Watch = {
  id: string;
  tenantId: string;
  identifierType: "application" | "registration";
  normalizedIdentifier: string;
  serialNumber: string;
  mark: string | null;
  paused: boolean;
  createdAt: string;
  removedAt: string | null;
};

export type StoredAlert = CandidateAlert & {
  id: string;
  disposition: "open" | "relevant" | "dismissed";
};

export class MemoryUsptoStore {
  private watches: Watch[] = [];
  private reminders: Reminder[] = [];
  private alerts: StoredAlert[] = [];
  private chain: Promise<void> = Promise.resolve();

  addWatch(watch: Watch): Watch {
    const clash = this.watches.find(
      (item) =>
        item.tenantId === watch.tenantId &&
        item.serialNumber === watch.serialNumber &&
        item.removedAt === null,
    );
    if (clash) return clash;
    this.watches.push(watch);
    return watch;
  }

  listWatches(tenantId: string, includeRemoved = false): Watch[] {
    return this.watches.filter(
      (item) =>
        item.tenantId === tenantId && (includeRemoved || item.removedAt === null),
    );
  }

  getWatch(tenantId: string, watchId: string): Watch | null {
    return (
      this.watches.find((item) => item.tenantId === tenantId && item.id === watchId) ??
      null
    );
  }

  pauseWatch(tenantId: string, watchId: string, paused: boolean): Watch | null {
    const watch = this.getWatch(tenantId, watchId);
    if (!watch || watch.removedAt) return null;
    watch.paused = paused;
    return watch;
  }

  removeWatch(tenantId: string, watchId: string, at: string): Watch | null {
    const watch = this.getWatch(tenantId, watchId);
    if (!watch) return null;
    watch.removedAt = at;
    watch.paused = true;
    return watch;
  }

  remindersFor(tenantId: string): Reminder[] {
    return this.reminders.filter((item) => item.tenantId === tenantId);
  }

  async applyReminders(input: {
    tenantId: string;
    watchId: string;
    maintenance: MaintenanceResult;
    now: string;
    paused: boolean;
    deliver?: (planned: { channel: string }) => "ok" | "fail";
  }): Promise<{ created: number; cancelled: number }> {
    const run = this.chain.then(() => {
      const watch = this.getWatch(input.tenantId, input.watchId);
      if (!watch) return { created: 0, cancelled: 0 };
      const planned = planReminders({
        tenantId: input.tenantId,
        watchId: input.watchId,
        maintenance: input.maintenance,
        now: input.now,
        paused: input.paused || watch.paused || watch.removedAt !== null,
      });
      const mine = this.reminders.filter(
        (item) => item.tenantId === input.tenantId && item.watchId === input.watchId,
      );
      const applied = applyReminderRun({
        existing: mine,
        planned,
        now: input.now,
        deliver: input.deliver,
      });
      this.reminders = [
        ...this.reminders.filter(
          (item) => !(item.tenantId === input.tenantId && item.watchId === input.watchId),
        ),
        ...applied.reminders,
      ];
      return { created: applied.created, cancelled: applied.cancelled };
    });
    this.chain = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  upsertAlerts(incoming: CandidateAlert[]): { created: number; updated: number } {
    let created = 0;
    let updated = 0;
    for (const alert of incoming) {
      const existing = this.alerts.find(
        (item) =>
          item.tenantId === alert.tenantId &&
          item.watchId === alert.watchId &&
          item.candidateSerial === alert.candidateSerial,
      );
      if (!existing) {
        this.alerts.push({
          ...alert,
          id: `${alert.tenantId}:${alert.watchId}:${alert.candidateSerial}`,
          disposition: "open",
        });
        created += 1;
        continue;
      }
      if (existing.statusCode !== alert.statusCode) {
        existing.statusCode = alert.statusCode;
        existing.events = [
          ...existing.events,
          `Status changed to ${alert.statusCode}.`,
        ];
        updated += 1;
      }
    }
    return { created, updated };
  }

  alertsFor(tenantId: string): StoredAlert[] {
    return this.alerts.filter((item) => item.tenantId === tenantId);
  }

  setDisposition(
    tenantId: string,
    alertId: string,
    disposition: "relevant" | "dismissed",
  ): StoredAlert | null {
    const alert = this.alerts.find(
      (item) => item.tenantId === tenantId && item.id === alertId,
    );
    if (!alert) return null;
    alert.disposition = disposition;
    return alert;
  }
}

export type StoreHandle =
  | { ok: true; store: MemoryUsptoStore }
  | { ok: false; reason: string };

/**
 * Customer data is not stored in memory in the server path.
 * A DATABASE_URL alone does not connect: this build has no database driver.
 */
export function getStore(): StoreHandle {
  const databaseUrl = readEnv(USPTO_ENV.databaseUrl);
  if (!databaseUrl) {
    return {
      ok: false,
      reason: "DATABASE_URL is not set. Customer watches are not persisted.",
    };
  }
  return {
    ok: false,
    reason:
      "DATABASE_URL is set, and this build does not connect. Apply docs/uspto/schema.sql only after the database is approved.",
  };
}
