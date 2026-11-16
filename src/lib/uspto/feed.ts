import { createHash } from "node:crypto";
import { addDays, compareIso } from "./dates";
import { compareWordMarks, type MarkComparison } from "./matching";
import { launchGate } from "./benchmark";

export const MONITORING_DELAYED = "Monitoring delayed";
export const MONITORING_NOT_ENABLED = "Not enabled";

/**
 * Status codes copied from the Trademark Applications Daily XML documentation
 * table that was labeled "Table updated 06/24/2005" in the PDF checked on
 * 2026-11-16. Codes whose definition on that table is abandoned, cancelled,
 * or expired are excluded from active alerts. Codes absent from this list
 * are withheld, not treated as live and not treated as "no match".
 */
export const DEAD_STATUS_CODES = new Set([
  "401",
  "402",
  "600",
  "601",
  "602",
  "603",
  "604",
  "605",
  "606",
  "607",
  "608",
  "609",
  "614",
  "618",
  "626",
  "710",
  "711",
  "712",
  "713",
  "714",
  "716",
]);

/** Pending or published application codes read from that same 2005 table. */
export const LIVE_APPLICATION_STATUS_CODES = new Set([
  "630",
  "631",
  "632",
  "638",
  "640",
  "641",
  "644",
  "645",
  "661",
  "680",
  "681",
  "686",
  "688",
]);

export type FeedCase = {
  fixture: "synthetic";
  serial: string;
  mark: string;
  owner: string;
  filingDate: string;
  statusCode: string;
  actionKey: string;
  classes: string[];
  goods: string;
};

export type Checkpoint = {
  lastSuccessDate: string | null;
  baselineDate: string | null;
  failedDate: string | null;
  processedHashes: string[];
};

export type CandidateAlert = {
  tenantId: string;
  watchId: string;
  candidateSerial: string;
  comparison: MarkComparison;
  classification: "existing_application" | "new_filing";
  visibility: "internal_review";
  statusCode: string;
  filingDate: string;
  events: string[];
};

export type IngestResult = {
  checkpoint: Checkpoint;
  alerts: CandidateAlert[];
  duplicateFile: boolean;
  failed: boolean;
  failureReason: string | null;
  scanned: number;
  excludedDead: number;
  withheldUnknownStatus: number;
  publicMessage: string;
};

export function emptyCheckpoint(): Checkpoint {
  return {
    lastSuccessDate: null,
    baselineDate: null,
    failedDate: null,
    processedHashes: [],
  };
}

export function hashFeed(fileDate: string, body: string): string {
  return createHash("sha256").update(`${fileDate}\n${body}`).digest("hex");
}

export function publicMonitoringMessage(input: {
  enabled: boolean;
  checkpoint: Checkpoint;
  failed: boolean;
}): string {
  if (!input.enabled) return MONITORING_NOT_ENABLED;
  if (
    input.failed ||
    input.checkpoint.failedDate ||
    !input.checkpoint.lastSuccessDate
  ) {
    return MONITORING_DELAYED;
  }
  return `Checked source files through ${input.checkpoint.lastSuccessDate}. This is the coverage actually processed, not a determination that no similar applications exist.`;
}

function nextCheckpoint(
  checkpoint: Checkpoint,
  fileDate: string,
  ok: boolean,
): Checkpoint {
  if (!ok) {
    return { ...checkpoint, failedDate: checkpoint.failedDate ?? fileDate };
  }
  if (checkpoint.failedDate && compareIso(fileDate, checkpoint.failedDate) > 0) {
    return checkpoint;
  }
  if (
    checkpoint.lastSuccessDate &&
    compareIso(fileDate, checkpoint.lastSuccessDate) <= 0
  ) {
    return {
      ...checkpoint,
      failedDate:
        checkpoint.failedDate && compareIso(checkpoint.failedDate, fileDate) < 0
          ? checkpoint.failedDate
          : null,
    };
  }
  if (checkpoint.lastSuccessDate) {
    const expected = addDays(checkpoint.lastSuccessDate, 1);
    if (compareIso(fileDate, expected) > 0) {
      return { ...checkpoint, failedDate: expected };
    }
  }
  return {
    lastSuccessDate: fileDate,
    baselineDate: checkpoint.baselineDate ?? fileDate,
    failedDate: null,
    processedHashes: checkpoint.processedHashes,
  };
}

export function ingestCases(input: {
  fileDate: string;
  fileHash: string;
  cases: FeedCase[];
  checkpoint: Checkpoint;
  watches: Array<{
    tenantId: string;
    watchId: string;
    mark: string;
    classes: string[];
    paused: boolean;
  }>;
  enabled: boolean;
  failSerial?: string;
}): IngestResult {
  const priorAlerts: CandidateAlert[] = [];
  if (!input.enabled) {
    return {
      checkpoint: input.checkpoint,
      alerts: priorAlerts,
      duplicateFile: false,
      failed: false,
      failureReason: null,
      scanned: 0,
      excludedDead: 0,
      withheldUnknownStatus: 0,
      publicMessage: publicMonitoringMessage({
        enabled: false,
        checkpoint: input.checkpoint,
        failed: false,
      }),
    };
  }
  if (input.checkpoint.processedHashes.includes(input.fileHash)) {
    return {
      checkpoint: input.checkpoint,
      alerts: [],
      duplicateFile: true,
      failed: false,
      failureReason: null,
      scanned: 0,
      excludedDead: 0,
      withheldUnknownStatus: 0,
      publicMessage: publicMonitoringMessage({
        enabled: true,
        checkpoint: input.checkpoint,
        failed: false,
      }),
    };
  }
  if (input.cases.some((item) => item.fixture !== "synthetic")) {
    return fail(input.checkpoint, "A case was not labelled synthetic.");
  }

  const establishingBaseline = input.checkpoint.baselineDate === null;
  const alerts: CandidateAlert[] = [];
  let excludedDead = 0;
  let withheldUnknownStatus = 0;
  const gateOpen = launchGate().met;

  try {
    for (const item of input.cases) {
      if (input.failSerial && item.serial === input.failSerial) {
        throw new Error(`synthetic processing failure for ${item.serial}`);
      }
      if (DEAD_STATUS_CODES.has(item.statusCode)) {
        excludedDead += 1;
        continue;
      }
      const live = LIVE_APPLICATION_STATUS_CODES.has(item.statusCode);
      if (!live) withheldUnknownStatus += 1;
      if (item.actionKey !== "NA") continue;
      for (const watch of input.watches) {
        if (watch.paused) continue;
        const comparison = compareWordMarks({
          watched: watch.mark,
          candidate: item.mark,
          watchedClasses: watch.classes,
          candidateClasses: item.classes,
        });
        if (!comparison.matched) continue;
        const existingFiling =
          establishingBaseline ||
          (input.checkpoint.baselineDate !== null &&
            compareIso(item.filingDate, input.checkpoint.baselineDate) <= 0);
        const classification = existingFiling ? "existing_application" : "new_filing";
        if (!live) {
          alerts.push({
            tenantId: watch.tenantId,
            watchId: watch.watchId,
            candidateSerial: item.serial,
            comparison,
            classification,
            visibility: "internal_review",
            statusCode: item.statusCode,
            filingDate: item.filingDate,
            events: [
              "Status code is outside the maintained 2005 live-application list. Withheld from customer alerts.",
            ],
          });
          continue;
        }
        if (classification === "existing_application") {
          alerts.push({
            tenantId: watch.tenantId,
            watchId: watch.watchId,
            candidateSerial: item.serial,
            comparison,
            classification,
            visibility: "internal_review",
            statusCode: item.statusCode,
            filingDate: item.filingDate,
            events: [
              "Seen while establishing the baseline, or filed on or before the baseline date. Labelled existing application.",
            ],
          });
          continue;
        }
        alerts.push({
          tenantId: watch.tenantId,
          watchId: watch.watchId,
          candidateSerial: item.serial,
          comparison,
          classification,
          visibility: "internal_review",
          statusCode: item.statusCode,
          filingDate: item.filingDate,
          events: [
            gateOpen
              ? "New filing candidate passed the launch gate and is still stored as internal review until a customer session exists."
              : "New filing candidate kept in internal review because the human-labeled launch target is not met.",
          ],
        });
      }
    }
  } catch (error) {
    const reason = error instanceof Error ? error.message : "processing failed";
    return fail(input.checkpoint, reason, input.fileDate);
  }

  const checkpoint = nextCheckpoint(input.checkpoint, input.fileDate, true);
  const overlap =
    input.checkpoint.lastSuccessDate !== null &&
    compareIso(input.fileDate, input.checkpoint.lastSuccessDate) <= 0;
  const accepted = checkpoint.lastSuccessDate === input.fileDate || overlap;
  if (!accepted) {
    return {
      checkpoint,
      alerts: [],
      duplicateFile: false,
      failed: true,
      failureReason:
        "The file date skips a missing day or a failed day. The checkpoint was not moved and no alerts were committed.",
      scanned: input.cases.length,
      excludedDead,
      withheldUnknownStatus,
      publicMessage: MONITORING_DELAYED,
    };
  }
  checkpoint.processedHashes = [...checkpoint.processedHashes, input.fileHash];
  return {
    checkpoint,
    alerts,
    duplicateFile: false,
    failed: false,
    failureReason: null,
    scanned: input.cases.length,
    excludedDead,
    withheldUnknownStatus,
    publicMessage: publicMonitoringMessage({
      enabled: true,
      checkpoint,
      failed: false,
    }),
  };
}

function fail(
  checkpoint: Checkpoint,
  reason: string,
  fileDate?: string,
): IngestResult {
  const next = fileDate
    ? nextCheckpoint(checkpoint, fileDate, false)
    : { ...checkpoint, failedDate: checkpoint.failedDate };
  return {
    checkpoint: next,
    alerts: [],
    duplicateFile: false,
    failed: true,
    failureReason: reason,
    scanned: 0,
    excludedDead: 0,
    withheldUnknownStatus: 0,
    publicMessage: MONITORING_DELAYED,
  };
}

export function parseSyntheticDailyXml(xml: string):
  | { ok: true; cases: FeedCase[] }
  | { ok: false; error: "schema_unverified" | "malformed" } {
  if (!xml.includes('data-fixture="synthetic"')) {
    return { ok: false, error: "schema_unverified" };
  }
  if (!xml.includes("<case-file-statement") || !xml.includes("<international-code-total-no")) {
    return { ok: false, error: "malformed" };
  }
  const blocks = xml.split("<case-file>").slice(1);
  if (blocks.length === 0) return { ok: false, error: "malformed" };
  const cases: FeedCase[] = [];
  for (const block of blocks) {
    const serial = text(block, "serial-number");
    const mark = text(block, "mark-text");
    const filing = text(block, "filing-date");
    const status = text(block, "status-code");
    const action = text(block, "action-key");
    const owner = text(block, "party-name") ?? "";
    const goods = text(block, "case-file-statement") ?? "";
    const classCode = text(block, "international-code-total-no") ?? "";
    if (!serial || !mark || !filing || !status || !action) {
      return { ok: false, error: "malformed" };
    }
    cases.push({
      fixture: "synthetic",
      serial,
      mark,
      owner,
      filingDate: filing,
      statusCode: status,
      actionKey: action,
      classes: classCode ? [classCode] : [],
      goods,
    });
  }
  return { ok: true, cases };
}

function text(block: string, tag: string): string | null {
  const match = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(block);
  if (!match) return null;
  return match[1].replace(/<[^>]+>/g, "").trim();
}
