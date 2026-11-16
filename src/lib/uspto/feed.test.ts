import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  emptyCheckpoint,
  hashFeed,
  ingestCases,
  parseSyntheticDailyXml,
  type FeedCase,
} from "./feed";
import { MemoryUsptoStore } from "./watch-store";

const FORBIDDEN = "No similar applications found";

function synthetic(overrides: Partial<FeedCase> = {}): FeedCase {
  return {
    fixture: "synthetic",
    serial: "99000001",
    mark: "Northstar",
    owner: "Synthetic Owner",
    filingDate: "2026-11-02",
    statusCode: "630",
    actionKey: "NA",
    classes: ["025"],
    goods: "Synthetic goods. Not a live filing.",
    ...overrides,
  };
}

const watch = {
  tenantId: "tenant-a",
  watchId: "w1",
  mark: "Northstar",
  classes: ["025"],
  paused: false,
};

describe("synthetic feed ingestion", () => {
  it("refuses an unlabelled file and does not call it a live result", () => {
    const parsed = parseSyntheticDailyXml(
      "<case-file><serial-number>1</serial-number></case-file>",
    );
    assert.equal(parsed.ok, false);
    if (!parsed.ok) assert.equal(parsed.error, "schema_unverified");
  });

  it("labels the first run as existing applications and does not duplicate a second pass", () => {
    const body = "synthetic-day-1";
    const first = ingestCases({
      fileDate: "2026-11-01",
      fileHash: hashFeed("2026-11-01", body),
      cases: [synthetic({ filingDate: "2026-10-01" })],
      checkpoint: emptyCheckpoint(),
      watches: [watch],
      enabled: true,
    });
    assert.equal(first.failed, false);
    assert.equal(first.alerts[0]?.classification, "existing_application");
    assert.equal(first.alerts[0]?.visibility, "internal_review");
    assert.equal(first.checkpoint.baselineDate, "2026-11-01");
    assert.doesNotMatch(first.publicMessage, new RegExp(FORBIDDEN));

    const duplicate = ingestCases({
      fileDate: "2026-11-01",
      fileHash: hashFeed("2026-11-01", body),
      cases: [synthetic({ filingDate: "2026-10-01" })],
      checkpoint: first.checkpoint,
      watches: [watch],
      enabled: true,
    });
    assert.equal(duplicate.duplicateFile, true);
    assert.equal(duplicate.alerts.length, 0);

    const store = new MemoryUsptoStore();
    const inserted = store.upsertAlerts(first.alerts);
    const again = store.upsertAlerts(first.alerts);
    assert.equal(inserted.created, 1);
    assert.equal(again.created, 0);
  });

  it("does not advance past a gap, a failed record, or an out-of-order later file", () => {
    const day1 = ingestCases({
      fileDate: "2026-11-01",
      fileHash: hashFeed("2026-11-01", "a"),
      cases: [synthetic()],
      checkpoint: emptyCheckpoint(),
      watches: [watch],
      enabled: true,
    });
    const skipped = ingestCases({
      fileDate: "2026-11-03",
      fileHash: hashFeed("2026-11-03", "c"),
      cases: [synthetic({ serial: "99000002", mark: "Northstor", filingDate: "2026-11-03" })],
      checkpoint: day1.checkpoint,
      watches: [watch],
      enabled: true,
    });
    assert.equal(skipped.failed, true);
    assert.equal(skipped.checkpoint.lastSuccessDate, "2026-11-01");
    assert.equal(skipped.checkpoint.failedDate, "2026-11-02");
    assert.equal(skipped.alerts.length, 0);
    assert.equal(skipped.publicMessage, "Monitoring delayed");

    const failed = ingestCases({
      fileDate: "2026-11-02",
      fileHash: hashFeed("2026-11-02", "boom"),
      cases: [synthetic({ serial: "99000003" })],
      checkpoint: day1.checkpoint,
      watches: [watch],
      enabled: true,
      failSerial: "99000003",
    });
    assert.equal(failed.failed, true);
    assert.equal(failed.checkpoint.lastSuccessDate, "2026-11-01");
    assert.equal(failed.alerts.length, 0);

    const catchUp = ingestCases({
      fileDate: "2026-11-02",
      fileHash: hashFeed("2026-11-02", "b"),
      cases: [synthetic({ serial: "99000004", mark: "Northstor", filingDate: "2026-11-02" })],
      checkpoint: day1.checkpoint,
      watches: [watch],
      enabled: true,
    });
    assert.equal(catchUp.failed, false);
    assert.equal(catchUp.checkpoint.lastSuccessDate, "2026-11-02");
    assert.equal(catchUp.alerts[0]?.classification, "new_filing");
  });

  it("excludes dead records, withholds unknown status codes, and skips a paused watch", () => {
    const result = ingestCases({
      fileDate: "2026-11-04",
      fileHash: hashFeed("2026-11-04", "d"),
      cases: [
        synthetic({ serial: "1", statusCode: "602", mark: "Northstar" }),
        synthetic({ serial: "2", statusCode: "999", mark: "Northstar" }),
        synthetic({ serial: "3", statusCode: "630", mark: "Northstar" }),
      ],
      checkpoint: emptyCheckpoint(),
      watches: [{ ...watch, paused: true }],
      enabled: true,
    });
    assert.equal(result.excludedDead, 1);
    assert.equal(result.withheldUnknownStatus, 1);
    assert.equal(result.alerts.length, 0);
    assert.notEqual(result.publicMessage, FORBIDDEN);
  });

  it("records a later status change without a second alert", () => {
    const store = new MemoryUsptoStore();
    const first = ingestCases({
      fileDate: "2026-11-01",
      fileHash: hashFeed("2026-11-01", "status"),
      cases: [synthetic()],
      checkpoint: emptyCheckpoint(),
      watches: [watch],
      enabled: true,
    });
    store.upsertAlerts(first.alerts);
    const corrected = ingestCases({
      fileDate: "2026-11-01",
      fileHash: hashFeed("2026-11-01", "status-corrected"),
      cases: [synthetic({ statusCode: "641" })],
      checkpoint: first.checkpoint,
      watches: [watch],
      enabled: true,
    });
    const update = store.upsertAlerts(corrected.alerts);
    assert.equal(update.created, 0);
    assert.equal(update.updated, 1);
    assert.equal(store.alertsFor("tenant-a").length, 1);
    assert.match(store.alertsFor("tenant-a")[0]?.events.join(" ") ?? "", /641/);
  });

  it("stays disabled without implying that no similar applications exist", () => {
    const result = ingestCases({
      fileDate: "2026-11-01",
      fileHash: "x",
      cases: [synthetic()],
      checkpoint: emptyCheckpoint(),
      watches: [watch],
      enabled: false,
    });
    assert.equal(result.publicMessage, "Not enabled");
    assert.equal(result.scanned, 0);
    assert.doesNotMatch(JSON.stringify(result), new RegExp(FORBIDDEN));
  });
});
