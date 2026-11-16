export type IdentifierType = "application" | "registration";

export type IdentifierResult =
  | {
      ok: true;
      type: IdentifierType;
      raw: string;
      normalized: string;
    }
  | { ok: false; error: string };

/**
 * The daily-application DTD checked on 2026-11-16 describes an 8-digit
 * zero-padded serial and a 7-digit zero-padded registration. Historical
 * numbers are shorter than that width, so this check does not require a
 * fixed length. It rejects empty values, non-digits, and values longer than
 * 12 digits because none of the USPTO pages checked describe a longer
 * identifier. It does not guess which kind of number the digits are.
 */
const MAX_DIGITS = 12;

export function validateIdentifier(
  type: string,
  raw: string,
): IdentifierResult {
  if (type !== "application" && type !== "registration") {
    return {
      ok: false,
      error:
        "Choose application or registration. The identifier type is not inferred.",
    };
  }
  if (typeof raw !== "string") {
    return { ok: false, error: "Enter the identifier." };
  }
  const compact = raw.trim().replace(/[\s-]/g, "");
  if (!/^\d+$/.test(compact)) {
    return {
      ok: false,
      error: "Use digits only. Letters are not a US application or registration number.",
    };
  }
  const normalized = compact.replace(/^0+/, "");
  if (!normalized) {
    return { ok: false, error: "Enter the identifier." };
  }
  if (normalized.length > MAX_DIGITS) {
    return {
      ok: false,
      error: `This is longer than ${MAX_DIGITS} digits, which is outside the identifier widths described in the USPTO documents checked for this build.`,
    };
  }
  return { ok: true, type, raw: raw.trim(), normalized };
}
