import { addMonths, addYears, compareIso } from "./dates";
import { adjustDeadline } from "./holidays";

export const RULES_VERSION = "uspto-maintenance-2026-11-16";

export const RESPONSIBILITY_NOTE =
  "Calculated dates are not a filing receipt. You remain responsible for checking the deadline on the official USPTO record.";

export type LegalBasis = "1a" | "1b" | "44d" | "44e" | "66a" | "unknown";

export type MaintenanceEventCode =
  | "SECTION_8_FILED"
  | "SECTION_8_ACCEPTED"
  | "SECTION_8_AND_9_FILED"
  | "SECTION_8_AND_9_ACCEPTED"
  | "SECTION_71_FILED"
  | "SECTION_71_ACCEPTED"
  | "SECTION_9_ACCEPTED"
  | "SECTION_15_ACCEPTED";

export type OfficialNextFiling = {
  filingType: string;
  windowStart: string | null;
  ordinaryDeadline: string | null;
  gracePeriodEnd: string | null;
};

export type MaintenanceInput = {
  registrationDate: string | null;
  filingDate: string | null;
  legalBasis: LegalBasis | null;
  serialNumber: string | null;
  statusText: string | null;
  statusDate: string | null;
  internationalRegistrationDate?: string | null;
  officialNextFiling?: OfficialNextFiling | null;
  events?: Array<{ code: MaintenanceEventCode; date: string }>;
  asOf: string;
};

export type MaintenancePhase =
  | "not_applicable"
  | "not_yet_open"
  | "window_open"
  | "grace"
  | "pending_filing"
  | "overdue_past_grace"
  | "needs_official_review";

export type MaintenanceResult = {
  rulesVersion: string;
  outcome: "no_maintenance" | "calculated" | "official" | "needs_official_review";
  filingType: string | null;
  windowStart: string | null;
  ordinaryDeadline: string | null;
  adjustedOrdinaryDeadline: string | null;
  gracePeriodEnd: string | null;
  adjustedGracePeriodEnd: string | null;
  dateSource: "official" | "calculated" | "none";
  phase: MaintenancePhase;
  leapDayClamped: boolean;
  calendarCovered: boolean;
  notes: string[];
  responsibilityNote: string;
};

type Track = "ordinary" | "madrid";

type Cycle = {
  index: number;
  filingType: string;
  windowStart: string;
  ordinaryDeadline: string;
  adjustedOrdinaryDeadline: string | null;
  gracePeriodEnd: string;
  adjustedGracePeriodEnd: string | null;
  leapDayClamped: boolean;
  calendarCovered: boolean;
};

const ORDINARY_ACCEPTANCE = new Set<MaintenanceEventCode>([
  "SECTION_8_ACCEPTED",
  "SECTION_8_AND_9_ACCEPTED",
]);
const MADRID_ACCEPTANCE = new Set<MaintenanceEventCode>(["SECTION_71_ACCEPTED"]);
const ORDINARY_FILED = new Set<MaintenanceEventCode>([
  "SECTION_8_FILED",
  "SECTION_8_AND_9_FILED",
]);
const MADRID_FILED = new Set<MaintenanceEventCode>(["SECTION_71_FILED"]);

function empty(
  outcome: MaintenanceResult["outcome"],
  phase: MaintenancePhase,
  notes: string[],
): MaintenanceResult {
  return {
    rulesVersion: RULES_VERSION,
    outcome,
    filingType: null,
    windowStart: null,
    ordinaryDeadline: null,
    adjustedOrdinaryDeadline: null,
    gracePeriodEnd: null,
    adjustedGracePeriodEnd: null,
    dateSource: "none",
    phase,
    leapDayClamped: false,
    calendarCovered: true,
    notes,
    responsibilityNote: RESPONSIBILITY_NOTE,
  };
}

function isDeadStatus(statusText: string | null): boolean {
  if (!statusText) return false;
  return /abandon|cancel|expired/i.test(statusText);
}

function resolveTrack(input: MaintenanceInput): {
  track: Track | "review";
  notes: string[];
} {
  const serial = input.serialNumber ?? "";
  const madridSerial = serial.startsWith("79");
  const basis = input.legalBasis;
  const notes: string[] = [];
  if (basis === "66a") {
    notes.push(
      "Section 71 is the US maintenance filing. International renewal is filed with WIPO and is not a USPTO Section 9 renewal.",
    );
    if (!madridSerial) {
      notes.push(
        "The basis is Section 66(a). The serial number does not start with 79. Confirm the basis on the official record.",
      );
    }
    return { track: "madrid", notes };
  }
  if (madridSerial && basis && basis !== "unknown") {
    return {
      track: "review",
      notes: [
        "The serial number starts with 79, which USPTO uses for Madrid filings, but the supplied basis is not Section 66(a).",
      ],
    };
  }
  if (madridSerial) {
    notes.push(
      "The serial number starts with 79, so this record is treated as Madrid Section 66(a). Section 71 is the US filing. International renewal through WIPO is not calculated.",
    );
    return { track: "madrid", notes };
  }
  if (basis === "1a" || basis === "1b" || basis === "44d" || basis === "44e") {
    return { track: "ordinary", notes };
  }
  return {
    track: "review",
    notes: [
      "The filing basis is missing or not one of the supported bases, so neither a Section 8 nor a Section 71 deadline was chosen.",
    ],
  };
}

function buildCycle(registrationDate: string, index: number, track: Track): Cycle {
  const startYears = index === 0 ? 5 : index * 10 - 1;
  const endYears = index === 0 ? 6 : index * 10;
  const window = addYears(registrationDate, startYears);
  const ordinary = addYears(registrationDate, endYears);
  const grace = addMonths(ordinary.iso, 6);
  const ordinaryAdjusted = adjustDeadline(ordinary.iso);
  const graceAdjusted = adjustDeadline(grace);
  const filingType =
    track === "madrid" ? "Section 71" : index === 0 ? "Section 8" : "Sections 8 and 9";
  return {
    index,
    filingType,
    windowStart: window.iso,
    ordinaryDeadline: ordinary.iso,
    adjustedOrdinaryDeadline: ordinaryAdjusted.adjusted,
    gracePeriodEnd: grace,
    adjustedGracePeriodEnd: graceAdjusted.adjusted,
    leapDayClamped: window.clamped || ordinary.clamped,
    calendarCovered: ordinaryAdjusted.covered && graceAdjusted.covered,
  };
}

function within(date: string, start: string, end: string | null): boolean {
  if (!end) return false;
  return compareIso(date, start) >= 0 && compareIso(date, end) <= 0;
}

function acceptanceCodes(track: Track): Set<MaintenanceEventCode> {
  return track === "madrid" ? MADRID_ACCEPTANCE : ORDINARY_ACCEPTANCE;
}

function filedCodes(track: Track): Set<MaintenanceEventCode> {
  return track === "madrid" ? MADRID_FILED : ORDINARY_FILED;
}

function cycleAccepted(
  cycle: Cycle,
  track: Track,
  input: MaintenanceInput,
): boolean {
  const codes = acceptanceCodes(track);
  const end = cycle.adjustedGracePeriodEnd ?? cycle.gracePeriodEnd;
  for (const event of input.events ?? []) {
    if (!codes.has(event.code)) continue;
    if (track === "ordinary" && cycle.index === 0 && event.code !== "SECTION_8_ACCEPTED") {
      continue;
    }
    if (
      track === "ordinary" &&
      cycle.index > 0 &&
      event.code !== "SECTION_8_AND_9_ACCEPTED"
    ) {
      continue;
    }
    if (within(event.date, cycle.windowStart, end)) return true;
  }
  const status = input.statusText ?? "";
  if (
    input.statusDate &&
    /renewed|accepted|granted/i.test(status) &&
    !/petition granted/i.test(status) &&
    within(input.statusDate, cycle.windowStart, end)
  ) {
    return true;
  }
  return false;
}

function cyclePending(cycle: Cycle, track: Track, input: MaintenanceInput): boolean {
  const end = cycle.adjustedGracePeriodEnd ?? cycle.gracePeriodEnd;
  for (const event of input.events ?? []) {
    if (!filedCodes(track).has(event.code)) continue;
    if (within(event.date, cycle.windowStart, end)) return true;
  }
  return false;
}

function fromCycle(
  cycle: Cycle,
  phase: MaintenancePhase,
  outcome: MaintenanceResult["outcome"],
  dateSource: MaintenanceResult["dateSource"],
  notes: string[],
): MaintenanceResult {
  if (phase === "grace") {
    notes.push(
      "The ordinary deadline has passed. A filing in the six-month grace period requires an additional fee.",
    );
  }
  if (phase === "pending_filing") {
    notes.push(
      "A maintenance filing is recorded, and acceptance is not. The next cycle was not assigned.",
    );
  }
  if (phase === "overdue_past_grace") {
    notes.push(
      "The grace period for this filing has passed and acceptance is not recorded. The following cycle was not assigned.",
    );
  }
  if (cycle.leapDayClamped) {
    notes.push(
      "The registration date is February 29. In a non-leap year the anniversary is clamped to February 28. Confirm that date on the TSDR Maintenance tab.",
    );
  }
  if (!cycle.calendarCovered) {
    notes.push(
      "The adjusted deadline is outside the maintained federal-holiday calendar, so it is not shown.",
    );
  }
  const review =
    outcome === "needs_official_review" ||
    cycle.leapDayClamped ||
    !cycle.calendarCovered ||
    phase === "overdue_past_grace";
  return {
    rulesVersion: RULES_VERSION,
    outcome: review ? "needs_official_review" : outcome,
    filingType: cycle.filingType,
    windowStart: cycle.windowStart,
    ordinaryDeadline: cycle.ordinaryDeadline,
    adjustedOrdinaryDeadline: cycle.calendarCovered
      ? cycle.adjustedOrdinaryDeadline
      : null,
    gracePeriodEnd: cycle.gracePeriodEnd,
    adjustedGracePeriodEnd: cycle.calendarCovered ? cycle.adjustedGracePeriodEnd : null,
    dateSource,
    phase: review && phase !== "overdue_past_grace" && phase !== "pending_filing" && phase !== "grace" && phase !== "window_open" && phase !== "not_yet_open"
      ? "needs_official_review"
      : phase,
    leapDayClamped: cycle.leapDayClamped,
    calendarCovered: cycle.calendarCovered,
    notes,
    responsibilityNote: RESPONSIBILITY_NOTE,
  };
}

function phaseFor(cycle: Cycle, asOf: string, pending: boolean): MaintenancePhase {
  if (pending) return "pending_filing";
  const ordinaryEnd = cycle.adjustedOrdinaryDeadline ?? cycle.ordinaryDeadline;
  const graceEnd = cycle.adjustedGracePeriodEnd ?? cycle.gracePeriodEnd;
  if (compareIso(asOf, cycle.windowStart) < 0) return "not_yet_open";
  if (compareIso(asOf, ordinaryEnd) <= 0) return "window_open";
  if (compareIso(asOf, graceEnd) <= 0) return "grace";
  return "overdue_past_grace";
}

function wipoNote(input: MaintenanceInput, notes: string[]): void {
  if (input.internationalRegistrationDate) {
    notes.push(
      `An international registration date of ${input.internationalRegistrationDate} was supplied. The WIPO renewal is not calculated and is not labeled as a USPTO Section 9 renewal.`,
    );
  }
}

export function calculateMaintenance(input: MaintenanceInput): MaintenanceResult {
  const notes: string[] = [];
  if (!input.registrationDate) {
    notes.push(
      "There is no US registration date, so no maintenance deadline was created.",
    );
    if (isDeadStatus(input.statusText)) {
      notes.push("The official status describes this record as not live.");
    }
    if ((input.serialNumber ?? "").startsWith("79") || input.legalBasis === "66a") {
      notes.push(
        "A Madrid record with no US registration date has no Section 71 deadline. International renewal through WIPO was not calculated.",
      );
    }
    return empty("no_maintenance", "not_applicable", notes);
  }

  if (isDeadStatus(input.statusText)) {
    notes.push(
      "The official status describes this registration as abandoned, cancelled, or expired. A later maintenance date was not calculated.",
    );
    return empty("needs_official_review", "needs_official_review", notes);
  }

  const resolved = resolveTrack(input);
  notes.push(...resolved.notes);
  if (resolved.track === "review") {
    return empty("needs_official_review", "needs_official_review", notes);
  }
  if (resolved.track === "madrid") wipoNote(input, notes);

  const cycles: Cycle[] = [];
  for (let index = 0; index < 8; index += 1) {
    cycles.push(buildCycle(input.registrationDate, index, resolved.track));
  }

  let latestAccepted = -1;
  for (let index = 0; index < cycles.length; index += 1) {
    if (cycleAccepted(cycles[index], resolved.track, input)) latestAccepted = index;
  }
  let chosen: Cycle | null = null;
  let pending = false;
  for (let index = latestAccepted + 1; index < cycles.length; index += 1) {
    chosen = cycles[index];
    pending = cyclePending(cycles[index], resolved.track, input);
    break;
  }
  if (!chosen) {
    notes.push("No upcoming cycle was found inside the calculated range.");
    return empty("needs_official_review", "needs_official_review", notes);
  }

  const phase = phaseFor(chosen, input.asOf, pending);
  let outcome: MaintenanceResult["outcome"] =
    phase === "overdue_past_grace" ? "needs_official_review" : "calculated";
  let dateSource: MaintenanceResult["dateSource"] = "calculated";

  const official = input.officialNextFiling;
  if (official?.ordinaryDeadline) {
    dateSource = "official";
    const conflict = official.ordinaryDeadline !== chosen.ordinaryDeadline;
    if (conflict) {
      notes.push(
        `The supplied official deadline ${official.ordinaryDeadline} does not match the calculated ordinary deadline ${chosen.ordinaryDeadline}. The official dates are shown. Confirm them on the TSDR Maintenance tab.`,
      );
      outcome = "needs_official_review";
    } else {
      outcome = "official";
      notes.push("The official next-filing dates match the calculated cycle.");
    }
    const shown = conflict
      ? {
          ...chosen,
          filingType: official.filingType,
          windowStart: official.windowStart ?? chosen.windowStart,
          ordinaryDeadline: official.ordinaryDeadline,
          gracePeriodEnd: official.gracePeriodEnd ?? chosen.gracePeriodEnd,
          adjustedOrdinaryDeadline: official.ordinaryDeadline,
          adjustedGracePeriodEnd: official.gracePeriodEnd,
          calendarCovered: true,
          leapDayClamped: false,
        }
      : chosen;
    return fromCycle(shown, phase, outcome, dateSource, notes);
  }

  if ((input.events ?? []).some((event) => event.code === "SECTION_15_ACCEPTED")) {
    notes.push("Section 15 is optional and does not satisfy Section 8, Section 9, or Section 71.");
  }
  if ((input.events ?? []).some((event) => event.code === "SECTION_9_ACCEPTED")) {
    notes.push(
      "A Section 9 event by itself does not show that the combined Section 8 and Section 9 filing was accepted.",
    );
  }

  return fromCycle(chosen, phase, outcome, dateSource, notes);
}
