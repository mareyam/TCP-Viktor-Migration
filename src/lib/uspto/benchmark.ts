import { compareWordMarks, type MatchPriority } from "./matching";

export type BenchmarkSplit = "tuning" | "holdout";
export type ExpectedPriority = MatchPriority | "none";

/**
 * Implementer-written behavior labels for the deterministic matcher.
 * humanReviewLabel is null until a separate person reviews the pair.
 * These labels are not legal determinations of infringement.
 */
export type BenchmarkPair = {
  id: string;
  split: BenchmarkSplit;
  watched: string;
  candidate: string;
  watchedClasses: string[];
  candidateClasses: string[];
  expectedPriority: ExpectedPriority;
  humanReviewLabel: null;
  disagreement: null;
};

export const BENCHMARK_PAIRS: BenchmarkPair[] = [
  { id: "h01", split: "holdout", watched: "Acme", candidate: "ACME", watchedClasses: ["025"], candidateClasses: ["025"], expectedPriority: "high", humanReviewLabel: null, disagreement: null },
  { id: "h02", split: "holdout", watched: "Café", candidate: "Cafe\u0301", watchedClasses: ["030"], candidateClasses: ["030"], expectedPriority: "high", humanReviewLabel: null, disagreement: null },
  { id: "h03", split: "holdout", watched: "Bluebird", candidate: "Blue Bird", watchedClasses: ["009"], candidateClasses: ["018"], expectedPriority: "high", humanReviewLabel: null, disagreement: null },
  { id: "h04", split: "holdout", watched: "Northstar", candidate: "Northstor", watchedClasses: ["025"], candidateClasses: ["025"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "h05", split: "holdout", watched: "IBM", candidate: "IBN", watchedClasses: ["009"], candidateClasses: ["009"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "h06", split: "holdout", watched: "Nike", candidate: "Noke", watchedClasses: ["025"], candidateClasses: ["025"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "h07", split: "holdout", watched: "Blue", candidate: "Blue Store", watchedClasses: ["035"], candidateClasses: ["035"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "h08", split: "holdout", watched: "Steven", candidate: "Stephen", watchedClasses: [], candidateClasses: ["025"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "h09", split: "holdout", watched: "Walnut", candidate: "Pecan", watchedClasses: ["029"], candidateClasses: ["029"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "h10", split: "holdout", watched: "Red River", candidate: "Blue River", watchedClasses: ["033"], candidateClasses: ["033"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "h11", split: "holdout", watched: "Brighton", candidate: "Brigton", watchedClasses: ["012"], candidateClasses: ["012"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "h12", split: "holdout", watched: "Microsoft", candidate: "Microchip", watchedClasses: ["009"], candidateClasses: ["009"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "h13", split: "holdout", watched: "QQ", candidate: "QQ", watchedClasses: ["009"], candidateClasses: ["041"], expectedPriority: "high", humanReviewLabel: null, disagreement: null },
  { id: "h14", split: "holdout", watched: "QQ", candidate: "QU", watchedClasses: ["009"], candidateClasses: ["009"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "h15", split: "holdout", watched: "Canyon", candidate: "Canon", watchedClasses: ["009"], candidateClasses: ["009"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "t01", split: "tuning", watched: "Northstar", candidate: "NORTHSTAR", watchedClasses: ["025"], candidateClasses: ["018"], expectedPriority: "high", humanReviewLabel: null, disagreement: null },
  { id: "t02", split: "tuning", watched: "Bluebird", candidate: "Blue-Bird", watchedClasses: ["025"], candidateClasses: ["025"], expectedPriority: "high", humanReviewLabel: null, disagreement: null },
  { id: "t03", split: "tuning", watched: "Trademark", candidate: "Trademakr", watchedClasses: ["045"], candidateClasses: ["045"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "t04", split: "tuning", watched: "Bluebird", candidate: "Blubird", watchedClasses: ["025"], candidateClasses: ["025"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "t05", split: "tuning", watched: "Acme", candidate: "Akme", watchedClasses: ["025"], candidateClasses: ["025"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "t06", split: "tuning", watched: "Silverline", candidate: "Silverline Goods", watchedClasses: ["020"], candidateClasses: ["020"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "t07", split: "tuning", watched: "Store", candidate: "Stores", watchedClasses: ["035"], candidateClasses: ["035"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "t08", split: "tuning", watched: "Global Store", candidate: "Store", watchedClasses: ["035"], candidateClasses: ["035"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "t09", split: "tuning", watched: "Bluebird", candidate: "Blue", watchedClasses: ["025"], candidateClasses: ["025"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "t10", split: "tuning", watched: "Cat", candidate: "Cats", watchedClasses: ["031"], candidateClasses: ["031"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "t11", split: "tuning", watched: "Apple", candidate: "Orange", watchedClasses: ["009"], candidateClasses: ["009"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "t12", split: "tuning", watched: "Inc", candidate: "Ink", watchedClasses: ["016"], candidateClasses: ["016"], expectedPriority: "none", humanReviewLabel: null, disagreement: null },
  { id: "t13", split: "tuning", watched: "Red River", candidate: "RedRiver", watchedClasses: ["033"], candidateClasses: ["032"], expectedPriority: "high", humanReviewLabel: null, disagreement: null },
  { id: "t14", split: "tuning", watched: "Red River", candidate: "Red Rivers", watchedClasses: ["033"], candidateClasses: ["033"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "t15", split: "tuning", watched: "Catarina", candidate: "Katarina", watchedClasses: ["014"], candidateClasses: ["014"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "t16", split: "tuning", watched: "Northstar Outfitters", candidate: "Northstar", watchedClasses: ["025"], candidateClasses: ["035"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
  { id: "t17", split: "tuning", watched: "Company", candidate: "Company", watchedClasses: [], candidateClasses: [], expectedPriority: "high", humanReviewLabel: null, disagreement: null },
  { id: "t18", split: "tuning", watched: "Harborlight", candidate: "Harborligh", watchedClasses: ["011"], candidateClasses: ["011"], expectedPriority: "review", humanReviewLabel: null, disagreement: null },
];

export type Score = {
  truePositive: number;
  falsePositive: number;
  falseNegative: number;
  trueNegative: number;
  precision: number | null;
  recall: number | null;
  labeled: number;
};

export function scoreBenchmark(split?: BenchmarkSplit): Score & {
  mismatches: string[];
} {
  const rows = split
    ? BENCHMARK_PAIRS.filter((pair) => pair.split === split)
    : BENCHMARK_PAIRS;
  let truePositive = 0;
  let falsePositive = 0;
  let falseNegative = 0;
  let trueNegative = 0;
  const mismatches: string[] = [];
  for (const pair of rows) {
    const result = compareWordMarks({
      watched: pair.watched,
      candidate: pair.candidate,
      watchedClasses: pair.watchedClasses,
      candidateClasses: pair.candidateClasses,
    });
    const expected = pair.expectedPriority === "none" ? null : pair.expectedPriority;
    const relevant = expected !== null;
    const predicted = result.matched;
    if (result.priority !== expected) mismatches.push(pair.id);
    if (relevant && predicted) truePositive += 1;
    else if (!relevant && predicted) falsePositive += 1;
    else if (relevant && !predicted) falseNegative += 1;
    else trueNegative += 1;
  }
  const precision =
    truePositive + falsePositive === 0
      ? null
      : truePositive / (truePositive + falsePositive);
  const recall =
    truePositive + falseNegative === 0
      ? null
      : truePositive / (truePositive + falseNegative);
  return {
    truePositive,
    falsePositive,
    falseNegative,
    trueNegative,
    precision,
    recall,
    labeled: rows.length,
    mismatches,
  };
}

export function launchGate(): {
  met: boolean;
  reason: string;
  humanLabeled: number;
  engineering: Score;
} {
  const humanLabeled = BENCHMARK_PAIRS.filter((pair) => pair.humanReviewLabel !== null)
    .length;
  const engineering = scoreBenchmark("holdout");
  if (humanLabeled === 0) {
    return {
      met: false,
      reason:
        "No separate human review labels are recorded. Engineering agreement with implementer labels is not the 80 percent launch target.",
      humanLabeled,
      engineering,
    };
  }
  const met =
    engineering.precision !== null &&
    engineering.recall !== null &&
    engineering.precision >= 0.8 &&
    engineering.recall >= 0.8 &&
    humanLabeled >= 30;
  return {
    met,
    reason: met
      ? "Holdout human-label precision and recall meet the engineering target."
      : "Human-labeled holdout precision or recall is below 80 percent, or fewer than 30 pairs are labeled.",
    humanLabeled,
    engineering,
  };
}
