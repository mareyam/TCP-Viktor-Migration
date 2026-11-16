export const MATCH_RULE_VERSION = "word-mark-2026-11-16";

const COMMON_TOKENS = new Set([
  "the",
  "and",
  "company",
  "inc",
  "brand",
  "shop",
  "store",
  "online",
  "co",
  "llc",
]);

export type MatchPriority = "high" | "review";

export type MarkComparison = {
  matched: boolean;
  priority: MatchPriority | null;
  reasons: string[];
  ruleVersion: string;
  watchedOriginal: string;
  candidateOriginal: string;
  classNote: string;
};

export function normalizeMark(input: string): {
  original: string;
  folded: string;
  key: string;
  tokens: string[];
} {
  const original = input.normalize("NFC");
  const folded = original.normalize("NFKC").toLowerCase();
  const key = folded.replace(/[^\p{L}\p{N}]+/gu, "");
  const tokens = folded
    .split(/[^\p{L}\p{N}]+/u)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
  return { original, folded, key, tokens };
}

function soundex(word: string): string {
  const letters = word.toUpperCase().replace(/[^A-Z]/g, "");
  if (!letters) return "";
  const codes: Record<string, string> = {
    B: "1",
    F: "1",
    P: "1",
    V: "1",
    C: "2",
    G: "2",
    J: "2",
    K: "2",
    Q: "2",
    S: "2",
    X: "2",
    Z: "2",
    D: "3",
    T: "3",
    L: "4",
    M: "5",
    N: "5",
    R: "6",
  };
  let out = letters[0];
  let previous = codes[letters[0]] ?? "";
  for (let index = 1; index < letters.length && out.length < 4; index += 1) {
    const character = letters[index];
    if (character === "H" || character === "W") continue;
    const code = codes[character];
    if (!code) {
      previous = "";
      continue;
    }
    if (code !== previous) out += code;
    previous = code;
  }
  return out.padEnd(4, "0");
}

function editDistance(a: string, b: string, max: number): number | null {
  if (Math.abs(a.length - b.length) > max) return null;
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    let best = row[0];
    for (let j = 1; j <= b.length; j += 1) {
      const current = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + cost);
      previous = current;
      if (row[j] < best) best = row[j];
    }
    if (best > max) return null;
  }
  return row[b.length] <= max ? row[b.length] : null;
}

function editLimit(length: number): number | null {
  if (length <= 4) return null;
  if (length <= 7) return 1;
  return 2;
}

function tokenAddition(left: string[], right: string[]): boolean {
  const [shorter, longer] =
    left.length <= right.length ? [left, right] : [right, left];
  if (longer.length !== shorter.length + 1 || shorter.length === 0) return false;
  const pool = [...longer];
  for (const token of shorter) {
    const index = pool.indexOf(token);
    if (index < 0) return false;
    pool.splice(index, 1);
  }
  if (pool.length !== 1) return false;
  return shorter.some((token) => token.length >= 5 && !COMMON_TOKENS.has(token));
}

function classNote(watchedClasses: string[], candidateClasses: string[]): string {
  if (watchedClasses.length === 0 || candidateClasses.length === 0) {
    return "Goods or classes were not both supplied. Class is context only.";
  }
  const watched = new Set(watchedClasses.map((item) => item.padStart(3, "0")));
  const overlap = candidateClasses.some((item) => watched.has(item.padStart(3, "0")));
  if (overlap) {
    return "The same class appears on both records. That is context only and does not prove a conflict.";
  }
  return "The classes differ. Different classes do not rule out a review.";
}

export function compareWordMarks(input: {
  watched: string;
  candidate: string;
  watchedClasses?: string[];
  candidateClasses?: string[];
}): MarkComparison {
  const watched = normalizeMark(input.watched);
  const candidate = normalizeMark(input.candidate);
  const reasons: string[] = [];
  let priority: MatchPriority | null = null;
  const note = classNote(input.watchedClasses ?? [], input.candidateClasses ?? []);

  if (!watched.key || !candidate.key) {
    return {
      matched: false,
      priority: null,
      reasons: ["One of the marks has no letters or numbers to compare."],
      ruleVersion: MATCH_RULE_VERSION,
      watchedOriginal: watched.original,
      candidateOriginal: candidate.original,
      classNote: note,
    };
  }

  const short = watched.key.length <= 4 || candidate.key.length <= 4;
  const common =
    COMMON_TOKENS.has(watched.key) ||
    COMMON_TOKENS.has(candidate.key) ||
    (watched.tokens.length === 1 && COMMON_TOKENS.has(watched.tokens[0])) ||
    (candidate.tokens.length === 1 && COMMON_TOKENS.has(candidate.tokens[0]));

  if (watched.key === candidate.key) {
    priority = "high";
    reasons.push(
      "The word marks match after case, Unicode, punctuation, and spacing are folded. Original spelling is unchanged.",
    );
  } else if (!short && !common) {
    const limit = editLimit(Math.max(watched.key.length, candidate.key.length));
    const distance =
      limit === null ? null : editDistance(watched.key, candidate.key, limit);
    if (distance !== null && distance > 0) {
      priority = "review";
      reasons.push(
        `Edit distance is ${distance}, inside the length threshold of ${limit} for rule ${MATCH_RULE_VERSION}.`,
      );
    }
    const phoneticDistance = editDistance(watched.key, candidate.key, 2);
    if (
      watched.tokens.length === 1 &&
      candidate.tokens.length === 1 &&
      watched.tokens[0].length >= 5 &&
      candidate.tokens[0].length >= 5 &&
      soundex(watched.tokens[0]) === soundex(candidate.tokens[0]) &&
      phoneticDistance !== null &&
      phoneticDistance > 0
    ) {
      if (!priority) priority = "review";
      reasons.push(
        `Single-token phonetic code matches (${soundex(watched.tokens[0])}) and the edit distance is ${phoneticDistance}. This is a review candidate, not a probability.`,
      );
    }
    if (tokenAddition(watched.tokens, candidate.tokens)) {
      if (!priority) priority = "review";
      reasons.push(
        "One mark adds a single token to the other, and the shared token is at least five characters and is not on the common-word list.",
      );
    }
  }

  if (!priority) {
    reasons.push(
      short
        ? "Short marks match only when the folded word is exact."
        : common
          ? "A mark that is only a common word matches only when the folded word is exact."
          : "No exact, edit-distance, token, or limited phonetic rule matched.",
    );
  }

  return {
    matched: priority !== null,
    priority,
    reasons,
    ruleVersion: MATCH_RULE_VERSION,
    watchedOriginal: watched.original,
    candidateOriginal: candidate.original,
    classNote: note,
  };
}
