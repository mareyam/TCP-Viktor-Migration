import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BENCHMARK_PAIRS, launchGate, scoreBenchmark } from "./benchmark";
import { compareWordMarks, normalizeMark } from "./matching";

describe("word-mark comparison", () => {
  it("keeps original spelling and folds case, punctuation, spacing, and Unicode", () => {
    const folded = normalizeMark("Café");
    const combining = normalizeMark("Cafe\u0301");
    assert.equal(folded.original, "Café");
    assert.equal(folded.key, combining.key);
    const spaced = compareWordMarks({ watched: "Blue Bird", candidate: "Blue-Bird" });
    assert.equal(spaced.priority, "high");
    assert.match(spaced.reasons.join(" "), /Original spelling/);
  });

  it("rejects short and common-word near misses and keeps class as context", () => {
    assert.equal(compareWordMarks({ watched: "Nike", candidate: "Noke" }).matched, false);
    assert.equal(compareWordMarks({ watched: "Store", candidate: "Stores" }).matched, false);
    const differentClass = compareWordMarks({
      watched: "Acme",
      candidate: "Acme",
      watchedClasses: ["025"],
      candidateClasses: ["009"],
    });
    assert.equal(differentClass.priority, "high");
    assert.match(differentClass.classNote, /do not rule out/);
    const sameClass = compareWordMarks({
      watched: "Walnut",
      candidate: "Pecan",
      watchedClasses: ["029"],
      candidateClasses: ["029"],
    });
    assert.equal(sameClass.matched, false);
    assert.match(sameClass.classNote, /does not prove a conflict/);
  });

  it("scores the engineering benchmark and keeps the launch gate closed", () => {
    assert.ok(BENCHMARK_PAIRS.length >= 30);
    const tuning = BENCHMARK_PAIRS.filter((pair) => pair.split === "tuning");
    const holdout = BENCHMARK_PAIRS.filter((pair) => pair.split === "holdout");
    assert.ok(holdout.length >= 10);
    const ids = new Set(BENCHMARK_PAIRS.map((pair) => pair.id));
    assert.equal(ids.size, BENCHMARK_PAIRS.length);
    assert.equal(tuning.length + holdout.length, BENCHMARK_PAIRS.length);
    const score = scoreBenchmark();
    assert.deepEqual(score.mismatches, []);
    assert.equal(score.precision, 1);
    assert.equal(score.recall, 1);
    const gate = launchGate();
    assert.equal(gate.humanLabeled, 0);
    assert.equal(gate.met, false);
    assert.match(gate.reason, /human review/);
  });
});
