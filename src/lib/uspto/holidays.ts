import { addDays, daysInMonth, formatIso, parseIsoDate, weekday } from "./dates";

/**
 * Statutory federal holidays used for USPTO "next business day" adjustments,
 * from 5 U.S.C. § 6103, including the Washington-area Inauguration Day in
 * subsection (c) because the USPTO office is in Alexandria, Virginia.
 *
 * Juneteenth is included only from 2021 (Public Law 117-17).
 * When a fixed holiday falls on Saturday, the observed day is Friday.
 * When it falls on Sunday, the observed day is Monday.
 *
 * Extraordinary executive-order closures are not guessed. Add those dates to
 * EXTRA_CLOSURES. The maintained range is 2020–2036; outside it, callers must
 * not present an adjusted deadline as calculated.
 */

export const CALENDAR_START_YEAR = 2020;
export const CALENDAR_END_YEAR = 2036;

/** ISO dates the office is closed beyond the statute. Empty until maintained. */
export const EXTRA_CLOSURES: string[] = [];

/** ISO dates to remove from the generated statutory set. Empty until maintained. */
export const EXCLUDED_HOLIDAYS: string[] = [];

const cache = new Map<number, Set<string>>();

function nthWeekday(year: number, month: number, dow: number, n: number): string {
  const firstDow = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const day = 1 + ((dow - firstDow + 7) % 7) + (n - 1) * 7;
  return formatIso(year, month, day);
}

function lastWeekday(year: number, month: number, dow: number): string {
  const dim = daysInMonth(year, month);
  const lastDow = new Date(Date.UTC(year, month - 1, dim)).getUTCDay();
  const day = dim - ((lastDow - dow + 7) % 7);
  return formatIso(year, month, day);
}

function observed(iso: string): string {
  const dow = weekday(iso);
  if (dow === 6) return addDays(iso, -1);
  if (dow === 0) return addDays(iso, 1);
  return iso;
}

export function holidaysForYear(year: number): Set<string> {
  const cached = cache.get(year);
  if (cached) return cached;
  const fixed = [
    formatIso(year, 1, 1),
    formatIso(year, 7, 4),
    formatIso(year, 11, 11),
    formatIso(year, 12, 25),
  ];
  if (year >= 2021) fixed.push(formatIso(year, 6, 19));
  if (year >= 1965 && (year - 1965) % 4 === 0) {
    fixed.push(formatIso(year, 1, 20));
  }
  const dates = new Set<string>([
    ...fixed.map(observed),
    nthWeekday(year, 1, 1, 3),
    nthWeekday(year, 2, 1, 3),
    lastWeekday(year, 5, 1),
    nthWeekday(year, 9, 1, 1),
    nthWeekday(year, 10, 1, 2),
    nthWeekday(year, 11, 4, 4),
  ]);
  for (const extra of EXTRA_CLOSURES) {
    const parts = parseIsoDate(extra);
    if (parts?.y === year) dates.add(extra);
  }
  for (const excluded of EXCLUDED_HOLIDAYS) dates.delete(excluded);
  cache.set(year, dates);
  return dates;
}

export function calendarCovers(iso: string): boolean {
  const parts = parseIsoDate(iso);
  if (!parts) return false;
  return parts.y >= CALENDAR_START_YEAR && parts.y <= CALENDAR_END_YEAR;
}

export function isWeekend(iso: string): boolean {
  const dow = weekday(iso);
  return dow === 0 || dow === 6;
}

export function isFederalHoliday(iso: string): boolean {
  const parts = parseIsoDate(iso);
  if (!parts) return false;
  return holidaysForYear(parts.y).has(iso);
}

export type AdjustedDate = {
  nominal: string;
  adjusted: string | null;
  moved: boolean;
  covered: boolean;
};

export function adjustDeadline(iso: string): AdjustedDate {
  if (!calendarCovers(iso)) {
    return { nominal: iso, adjusted: null, moved: false, covered: false };
  }
  let cursor = iso;
  for (let guard = 0; guard < 14; guard += 1) {
    if (!isWeekend(cursor) && !isFederalHoliday(cursor)) {
      return {
        nominal: iso,
        adjusted: cursor,
        moved: cursor !== iso,
        covered: true,
      };
    }
    const next = addDays(cursor, 1);
    if (!calendarCovers(next)) {
      return { nominal: iso, adjusted: null, moved: false, covered: false };
    }
    cursor = next;
  }
  return { nominal: iso, adjusted: null, moved: false, covered: false };
}
