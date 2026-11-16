import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateMaintenance } from "./deadlines";
import { liveEmailDeliver, planReminders, type Reminder } from "./reminders";
import { MemoryUsptoStore } from "./watch-store";

function maintenance(asOf: string) {
  return calculateMaintenance({
    registrationDate: "2020-01-15",
    filingDate: "2019-01-15",
    legalBasis: "1a",
    serialNumber: "88000001",
    statusText: "Registered",
    statusDate: "2020-01-15",
    asOf,
  });
}

function inApp(reminders: Reminder[]) {
  return reminders.filter((item) => item.channel === "in_app");
}

describe("dry-run reminders", () => {
  it("creates exactly one reminder on the six-month trigger and not the day before", async () => {
    const store = new MemoryUsptoStore();
    store.addWatch({
      id: "w1",
      tenantId: "tenant-a",
      identifierType: "application",
      normalizedIdentifier: "88000001",
      serialNumber: "88000001",
      mark: "Example",
      paused: false,
      createdAt: "2024-01-01",
      removedAt: null,
    });
    const before = await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2025-07-14"),
      now: "2025-07-14",
      paused: false,
    });
    assert.equal(before.created, 0);
    assert.equal(inApp(store.remindersFor("tenant-a")).length, 0);

    const onTrigger = await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2025-07-15"),
      now: "2025-07-15",
      paused: false,
    });
    assert.equal(onTrigger.created, 2);
    const first = inApp(store.remindersFor("tenant-a"));
    assert.equal(first.length, 1);
    assert.equal(first[0]?.kind, "upcoming_filing_deadline");
    assert.equal(first[0]?.state, "dry_run");
    assert.equal(first[0]?.receiptClaimed, false);
    assert.equal(first[0]?.triggerDate, "2025-07-15");

    const again = await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2025-07-15"),
      now: "2025-07-15",
      paused: false,
    });
    assert.equal(again.created, 0);
    assert.equal(inApp(store.remindersFor("tenant-a")).length, 1);
  });

  it("creates one upcoming reminder when the mark is added inside the window", async () => {
    const store = seeded();
    await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2025-08-01"),
      now: "2025-08-01",
      paused: false,
    });
    assert.equal(inApp(store.remindersFor("tenant-a"))[0]?.kind, "upcoming_filing_deadline");
  });

  it("uses an overdue state inside the grace period and does not schedule a future reminder after it", async () => {
    const store = seeded();
    await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2026-02-01"),
      now: "2026-02-01",
      paused: false,
    });
    const row = inApp(store.remindersFor("tenant-a"))[0];
    assert.equal(row?.kind, "overdue_or_grace");
    assert.notEqual(row?.kind, "upcoming_filing_deadline");

    const pastGrace = planReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2026-08-01"),
      now: "2026-08-01",
      paused: false,
      channels: ["in_app"],
    });
    assert.equal(pastGrace.length, 1);
    assert.equal(pastGrace[0]?.kind, "overdue_or_grace");
  });

  it("cancels a pending dry-run when the watch is paused or the deadline changes", async () => {
    const store = seeded();
    await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2025-07-15"),
      now: "2025-07-15",
      paused: false,
    });
    store.pauseWatch("tenant-a", "w1", true);
    const paused = await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2025-07-15"),
      now: "2025-07-16",
      paused: true,
    });
    assert.ok(paused.cancelled >= 1);
    assert.equal(
      store.remindersFor("tenant-a").filter((item) => item.state === "dry_run").length,
      0,
    );
    assert.ok(store.remindersFor("tenant-a").some((item) => item.state === "cancelled"));

    const changed = calculateMaintenance({
      registrationDate: "2020-02-15",
      filingDate: "2019-02-15",
      legalBasis: "1a",
      serialNumber: "88000001",
      statusText: "Registered",
      statusDate: "2020-02-15",
      asOf: "2025-08-15",
    });
    store.pauseWatch("tenant-a", "w1", false);
    await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: changed,
      now: "2025-08-15",
      paused: false,
    });
    const active = store
      .remindersFor("tenant-a")
      .filter((item) => item.channel === "in_app" && item.state === "dry_run");
    assert.equal(active.length, 1);
    assert.equal(active[0]?.deadline, "2026-02-15");
  });

  it("retries a failed delivery without a second row and never claims receipt", async () => {
    const store = seeded();
    let mode: "fail" | "ok" = "fail";
    await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2025-07-15"),
      now: "2025-07-15",
      paused: false,
      deliver: () => mode,
    });
    assert.equal(inApp(store.remindersFor("tenant-a"))[0]?.state, "failed");
    mode = "ok";
    await store.applyReminders({
      tenantId: "tenant-a",
      watchId: "w1",
      maintenance: maintenance("2025-07-15"),
      now: "2025-07-15",
      paused: false,
      deliver: () => mode,
    });
    const rows = inApp(store.remindersFor("tenant-a"));
    assert.equal(rows.length, 1);
    assert.equal(rows[0]?.state, "dry_run");
    assert.equal(rows[0]?.attempts, 2);
    assert.equal(rows[0]?.receiptClaimed, false);
    assert.equal(rows[0]?.providerId, null);
    assert.throws(() => liveEmailDeliver(), /Live email is off/);
  });

  it("keeps overlapping runs to one in-app reminder", async () => {
    const store = seeded();
    const maintenanceResult = maintenance("2025-07-15");
    await Promise.all([
      store.applyReminders({
        tenantId: "tenant-a",
        watchId: "w1",
        maintenance: maintenanceResult,
        now: "2025-07-15",
        paused: false,
      }),
      store.applyReminders({
        tenantId: "tenant-a",
        watchId: "w1",
        maintenance: maintenanceResult,
        now: "2025-07-15",
        paused: false,
      }),
    ]);
    assert.equal(inApp(store.remindersFor("tenant-a")).length, 1);
  });
});

function seeded() {
  const store = new MemoryUsptoStore();
  store.addWatch({
    id: "w1",
    tenantId: "tenant-a",
    identifierType: "registration",
    normalizedIdentifier: "2178784",
    serialNumber: "88000001",
    mark: "Example",
    paused: false,
    createdAt: "2024-01-01",
    removedAt: null,
  });
  return store;
}
