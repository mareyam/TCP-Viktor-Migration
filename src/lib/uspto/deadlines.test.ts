import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { addDays, addMonths } from "./dates";
import { calculateMaintenance } from "./deadlines";
import { adjustDeadline, isFederalHoliday } from "./holidays";

describe("calendar arithmetic", () => {
  it("clamps month ends and does not treat six months as 180 days", () => {
    assert.equal(addMonths("2026-01-31", 6), "2026-07-31");
    assert.equal(addMonths("2026-03-31", -6), "2025-09-30");
    assert.equal(addMonths("2026-08-31", 6), "2027-02-28");
    const sixMonthsBefore = addMonths("2026-03-31", -6);
    assert.equal(sixMonthsBefore, "2025-09-30");
    assert.notEqual(sixMonthsBefore, addDays("2026-03-31", -180));
  });

  it("moves a weekend deadline and a federal holiday to the next business day", () => {
    const saturday = adjustDeadline("2026-07-04");
    assert.equal(saturday.nominal, "2026-07-04");
    assert.equal(saturday.adjusted, "2026-07-06");
    assert.equal(isFederalHoliday("2026-07-03"), true);
    const observedIndependence = adjustDeadline("2026-07-03");
    assert.equal(observedIndependence.adjusted, "2026-07-06");
    assert.equal(isFederalHoliday("2025-01-20"), true);
    assert.equal(adjustDeadline("2025-01-20").adjusted, "2025-01-21");
    assert.equal(isFederalHoliday("2020-06-19"), false);
  });
});

describe("maintenance rules", () => {
  it("matches the JAVA registration maintenance tab read on 2026-11-16", () => {
    const result = calculateMaintenance({
      registrationDate: "1998-08-04",
      filingDate: "1995-02-07",
      legalBasis: "1b",
      serialNumber: "74631225",
      statusText: "The registration has been renewed.",
      statusDate: "2017-12-31",
      asOf: "2026-11-16",
    });
    assert.equal(result.filingType, "Sections 8 and 9");
    assert.equal(result.windowStart, "2027-08-04");
    assert.equal(result.ordinaryDeadline, "2028-08-04");
    assert.equal(result.adjustedOrdinaryDeadline, "2028-08-04");
    assert.equal(result.gracePeriodEnd, "2029-02-04");
    assert.equal(result.adjustedGracePeriodEnd, "2029-02-05");
    assert.equal(result.phase, "not_yet_open");
    assert.equal(result.outcome, "calculated");
    assert.equal(result.dateSource, "calculated");
  });

  it("does not manufacture a deadline for a pending or dead application", () => {
    const pending = calculateMaintenance({
      registrationDate: null,
      filingDate: "2026-01-15",
      legalBasis: "1b",
      serialNumber: "99000001",
      statusText: "New application awaiting examination",
      statusDate: "2026-01-15",
      asOf: "2026-11-16",
    });
    assert.equal(pending.outcome, "no_maintenance");
    assert.equal(pending.ordinaryDeadline, null);

    const abandoned = calculateMaintenance({
      registrationDate: null,
      filingDate: "2006-01-09",
      legalBasis: "1a",
      serialNumber: "78787878",
      statusText: "Abandoned because the applicant failed to respond or filed a late response to an Office action.",
      statusDate: "2007-09-25",
      asOf: "2026-11-16",
    });
    assert.equal(abandoned.outcome, "no_maintenance");
    assert.equal(abandoned.ordinaryDeadline, null);
  });

  it("uses Section 71 for Madrid and does not label a WIPO renewal as Section 9", () => {
    const deadMadrid = calculateMaintenance({
      registrationDate: null,
      filingDate: "2003-11-02",
      legalBasis: "66a",
      serialNumber: "79000001",
      statusText: "U.S. application abandoned because International Registration restricted, renounced, or expired.",
      statusDate: "2013-11-02",
      internationalRegistrationDate: "2003-11-02",
      asOf: "2026-11-16",
    });
    assert.equal(deadMadrid.outcome, "no_maintenance");
    assert.equal(deadMadrid.filingType, null);
    assert.match(deadMadrid.notes.join(" "), /WIPO/);

    const liveMadrid = calculateMaintenance({
      registrationDate: "2020-03-02",
      filingDate: "2019-01-04",
      legalBasis: "66a",
      serialNumber: "79111111",
      statusText: "Registered",
      statusDate: "2020-03-02",
      internationalRegistrationDate: "2018-06-01",
      asOf: "2024-01-01",
    });
    assert.equal(liveMadrid.filingType, "Section 71");
    assert.equal(liveMadrid.windowStart, "2025-03-02");
    assert.equal(liveMadrid.ordinaryDeadline, "2026-03-02");
    assert.doesNotMatch(liveMadrid.filingType ?? "", /Section 9/);
    assert.match(liveMadrid.notes.join(" "), /not a USPTO Section 9/);
  });

  it("keeps an accepted Section 8 distinct from a pending filing and from Section 15", () => {
    const accepted = calculateMaintenance({
      registrationDate: "2020-01-15",
      filingDate: "2019-01-15",
      legalBasis: "1a",
      serialNumber: "88111111",
      statusText: "Registered",
      statusDate: "2020-01-15",
      events: [{ code: "SECTION_8_ACCEPTED", date: "2025-06-01" }],
      asOf: "2027-01-01",
    });
    assert.equal(accepted.filingType, "Sections 8 and 9");
    assert.equal(accepted.ordinaryDeadline, "2030-01-15");
    assert.equal(accepted.phase, "not_yet_open");

    const pending = calculateMaintenance({
      registrationDate: "2020-01-15",
      filingDate: "2019-01-15",
      legalBasis: "44e",
      serialNumber: "88222222",
      statusText: "Registered",
      statusDate: "2020-01-15",
      events: [{ code: "SECTION_8_FILED", date: "2025-06-01" }],
      asOf: "2025-08-01",
    });
    assert.equal(pending.phase, "pending_filing");
    assert.equal(pending.filingType, "Section 8");
    assert.equal(pending.ordinaryDeadline, "2026-01-15");

    const onlySection15 = calculateMaintenance({
      registrationDate: "2020-01-15",
      filingDate: "2019-01-15",
      legalBasis: "1a",
      serialNumber: "88333333",
      statusText: "Registered",
      statusDate: "2020-01-15",
      events: [{ code: "SECTION_15_ACCEPTED", date: "2025-06-01" }],
      asOf: "2027-01-01",
    });
    assert.equal(onlySection15.filingType, "Section 8");
    assert.equal(onlySection15.phase, "overdue_past_grace");
    assert.equal(onlySection15.outcome, "needs_official_review");
  });

  it("does not skip ahead when an anniversary passed without an acceptance event", () => {
    const result = calculateMaintenance({
      registrationDate: "1998-08-04",
      filingDate: "1995-02-07",
      legalBasis: "1a",
      serialNumber: "74631225",
      statusText: "Registered",
      statusDate: "1998-08-04",
      asOf: "2026-11-16",
    });
    assert.equal(result.filingType, "Section 8");
    assert.equal(result.phase, "overdue_past_grace");
    assert.equal(result.outcome, "needs_official_review");
  });

  it("flags a leap-day anniversary, a holiday deadline, and a conflicting official date", () => {
    const leap = calculateMaintenance({
      registrationDate: "2020-02-29",
      filingDate: "2020-02-29",
      legalBasis: "1a",
      serialNumber: "88444444",
      statusText: "Registered",
      statusDate: "2020-02-29",
      asOf: "2024-01-01",
    });
    assert.equal(leap.leapDayClamped, true);
    assert.equal(leap.windowStart, "2025-02-28");
    assert.equal(leap.ordinaryDeadline, "2026-02-28");
    assert.equal(leap.outcome, "needs_official_review");

    const holiday = calculateMaintenance({
      registrationDate: "2020-07-04",
      filingDate: "2020-01-04",
      legalBasis: "1a",
      serialNumber: "88555555",
      statusText: "Registered",
      statusDate: "2020-07-04",
      asOf: "2024-01-01",
    });
    assert.equal(holiday.ordinaryDeadline, "2026-07-04");
    assert.equal(holiday.adjustedOrdinaryDeadline, "2026-07-06");

    const conflict = calculateMaintenance({
      registrationDate: "2020-01-15",
      filingDate: "2019-01-15",
      legalBasis: "1a",
      serialNumber: "88666666",
      statusText: "Registered",
      statusDate: "2020-01-15",
      asOf: "2024-01-01",
      officialNextFiling: {
        filingType: "Section 8",
        windowStart: "2025-01-15",
        ordinaryDeadline: "2026-01-20",
        gracePeriodEnd: "2026-07-20",
      },
    });
    assert.equal(conflict.outcome, "needs_official_review");
    assert.equal(conflict.dateSource, "official");
    assert.equal(conflict.ordinaryDeadline, "2026-01-20");
  });

  it("asks for official review when the basis is missing or a dead registration is supplied", () => {
    const unknown = calculateMaintenance({
      registrationDate: "2020-01-15",
      filingDate: "2019-01-15",
      legalBasis: "unknown",
      serialNumber: "88777777",
      statusText: "Registered",
      statusDate: "2020-01-15",
      asOf: "2024-01-01",
    });
    assert.equal(unknown.outcome, "needs_official_review");
    assert.equal(unknown.ordinaryDeadline, null);

    const cancelled = calculateMaintenance({
      registrationDate: "2010-05-01",
      filingDate: "2009-05-01",
      legalBasis: "1a",
      serialNumber: "77888888",
      statusText: "Cancelled - Section 8",
      statusDate: "2016-11-01",
      asOf: "2026-11-16",
    });
    assert.equal(cancelled.outcome, "needs_official_review");
    assert.equal(cancelled.ordinaryDeadline, null);
  });
});
