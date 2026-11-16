export type DateParts = { y: number; m: number; d: number };

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function formatIso(year: number, month: number, day: number): string {
  const y = String(year).padStart(4, "0");
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseIsoDate(iso: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (m < 1 || m > 12) return null;
  if (d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

export function addMonths(iso: string, months: number): string {
  const parts = parseIsoDate(iso);
  if (!parts) throw new Error(`Invalid ISO date: ${iso}`);
  let monthIndex = parts.m - 1 + months;
  const year = parts.y + Math.floor(monthIndex / 12);
  monthIndex = ((monthIndex % 12) + 12) % 12;
  const month = monthIndex + 1;
  const day = Math.min(parts.d, daysInMonth(year, month));
  return formatIso(year, month, day);
}

export function addYears(
  iso: string,
  years: number,
): { iso: string; clamped: boolean } {
  const parts = parseIsoDate(iso);
  if (!parts) throw new Error(`Invalid ISO date: ${iso}`);
  const year = parts.y + years;
  const dim = daysInMonth(year, parts.m);
  const day = Math.min(parts.d, dim);
  return { iso: formatIso(year, parts.m, day), clamped: day !== parts.d };
}

export function addDays(iso: string, days: number): string {
  const parts = parseIsoDate(iso);
  if (!parts) throw new Error(`Invalid ISO date: ${iso}`);
  const date = new Date(Date.UTC(parts.y, parts.m - 1, parts.d));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** 0 = Sunday … 6 = Saturday, evaluated in UTC so the calendar date does not shift. */
export function weekday(iso: string): number {
  const parts = parseIsoDate(iso);
  if (!parts) throw new Error(`Invalid ISO date: ${iso}`);
  return new Date(Date.UTC(parts.y, parts.m - 1, parts.d)).getUTCDay();
}

export function compareIso(a: string, b: string): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}
