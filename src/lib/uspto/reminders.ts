import { addMonths, compareIso } from "./dates";
import type { MaintenanceResult } from "./deadlines";

export type ReminderChannel = "in_app" | "email";
export type ReminderKind = "upcoming_filing_deadline" | "overdue_or_grace";
export type ReminderState = "pending" | "dry_run" | "failed" | "cancelled";

export type ReminderEvent = {
  at: string;
  state: ReminderState;
  note: string;
};

export type Reminder = {
  idempotencyKey: string;
  tenantId: string;
  watchId: string;
  obligationId: string;
  deadline: string;
  channel: ReminderChannel;
  kind: ReminderKind;
  triggerDate: string;
  state: ReminderState;
  attempts: number;
  providerId: null;
  receiptClaimed: false;
  events: ReminderEvent[];
  createdAt: string;
  updatedAt: string;
};

export type PlannedReminder = {
  idempotencyKey: string;
  tenantId: string;
  watchId: string;
  obligationId: string;
  deadline: string;
  channel: ReminderChannel;
  kind: ReminderKind;
  triggerDate: string;
};

export function reminderKey(parts: {
  tenantId: string;
  watchId: string;
  obligationId: string;
  deadline: string;
  channel: ReminderChannel;
}): string {
  return [
    parts.tenantId,
    parts.watchId,
    parts.obligationId,
    parts.deadline,
    parts.channel,
  ].join("|");
}

export function planReminders(input: {
  tenantId: string;
  watchId: string;
  maintenance: MaintenanceResult;
  now: string;
  paused: boolean;
  channels?: ReminderChannel[];
}): PlannedReminder[] {
  if (input.paused) return [];
  const maintenance = input.maintenance;
  if (!maintenance.ordinaryDeadline || !maintenance.filingType) return [];
  if (
    maintenance.outcome === "needs_official_review" &&
    maintenance.phase !== "grace" &&
    maintenance.phase !== "overdue_past_grace"
  ) {
    return [];
  }
  if (maintenance.outcome === "no_maintenance") return [];
  const triggerDate = addMonths(maintenance.ordinaryDeadline, -6);
  const ordinaryEnd =
    maintenance.adjustedOrdinaryDeadline ?? maintenance.ordinaryDeadline;
  if (compareIso(input.now, triggerDate) < 0) return [];
  const kind: ReminderKind =
    compareIso(input.now, ordinaryEnd) <= 0
      ? "upcoming_filing_deadline"
      : "overdue_or_grace";
  const obligationId = `${maintenance.filingType}|${maintenance.ordinaryDeadline}`;
  const channels = input.channels ?? ["in_app", "email"];
  return channels.map((channel) => ({
    idempotencyKey: reminderKey({
      tenantId: input.tenantId,
      watchId: input.watchId,
      obligationId,
      deadline: maintenance.ordinaryDeadline as string,
      channel,
    }),
    tenantId: input.tenantId,
    watchId: input.watchId,
    obligationId,
    deadline: maintenance.ordinaryDeadline as string,
    channel,
    kind,
    triggerDate,
  }));
}

function withEvent(reminder: Reminder, at: string, note: string): Reminder {
  return {
    ...reminder,
    updatedAt: at,
    events: [...reminder.events, { at, state: reminder.state, note }],
  };
}

/**
 * Dry-run delivery. This never contacts an email provider and never records
 * a receipt. Live sending is a separate function that always throws.
 */
export function dryRunDeliver(): "ok" {
  return "ok";
}

export function liveEmailDeliver(): never {
  throw new Error(
    "Live email is off. No message was sent and no receipt was claimed.",
  );
}

export function applyReminderRun(input: {
  existing: Reminder[];
  planned: PlannedReminder[];
  now: string;
  deliver?: (planned: PlannedReminder) => "ok" | "fail";
}): { reminders: Reminder[]; created: number; cancelled: number } {
  const deliver = input.deliver ?? dryRunDeliver;
  const plannedByKey = new Map(input.planned.map((item) => [item.idempotencyKey, item]));
  const seen = new Set<string>();
  let created = 0;
  let cancelled = 0;
  const next: Reminder[] = [];

  for (const current of input.existing) {
    const planned = plannedByKey.get(current.idempotencyKey);
    if (!planned) {
      if (current.state === "pending" || current.state === "dry_run") {
        const cancelledRow: Reminder = {
          ...current,
          state: "cancelled",
          updatedAt: input.now,
        };
        next.push(
          withEvent(
            cancelledRow,
            input.now,
            "Cancelled because the filing obligation changed, the watch was paused, or the reminder is no longer due.",
          ),
        );
        cancelled += 1;
      } else {
        next.push(current);
      }
      continue;
    }
    seen.add(current.idempotencyKey);
    if (current.state === "dry_run" || current.state === "pending") {
      next.push(current);
      continue;
    }
    if (current.state === "failed" || current.state === "cancelled") {
      const attempt = deliver(planned);
      const state: ReminderState = attempt === "ok" ? "dry_run" : "failed";
      const retried: Reminder = {
        ...current,
        state,
        kind: planned.kind,
        attempts: current.attempts + 1,
        providerId: null,
        receiptClaimed: false,
        updatedAt: input.now,
      };
      next.push(
        withEvent(
          retried,
          input.now,
          attempt === "ok"
            ? "Retry stored a dry-run outbox row. Receipt was not claimed."
            : "Retry failed. The row was kept.",
        ),
      );
      continue;
    }
    next.push(current);
  }

  for (const planned of input.planned) {
    if (seen.has(planned.idempotencyKey)) continue;
    const attempt = deliver(planned);
    const state: ReminderState = attempt === "ok" ? "dry_run" : "failed";
    const row: Reminder = {
      idempotencyKey: planned.idempotencyKey,
      tenantId: planned.tenantId,
      watchId: planned.watchId,
      obligationId: planned.obligationId,
      deadline: planned.deadline,
      channel: planned.channel,
      kind: planned.kind,
      triggerDate: planned.triggerDate,
      state,
      attempts: 1,
      providerId: null,
      receiptClaimed: false,
      createdAt: input.now,
      updatedAt: input.now,
      events: [],
    };
    next.push(
      withEvent(
        row,
        input.now,
        state === "dry_run"
          ? "Dry-run outbox row created. No email was sent and no receipt was claimed."
          : "Delivery failed before a dry-run row could be stored as ready.",
      ),
    );
    created += 1;
  }

  return { reminders: next, created, cancelled };
}
