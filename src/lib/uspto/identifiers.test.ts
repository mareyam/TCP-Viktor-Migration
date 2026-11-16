import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateIdentifier } from "./identifiers";

describe("identifier validation", () => {
  it("accepts the documented serial and registration examples", () => {
    const serial = validateIdentifier("application", "78787878");
    const registration = validateIdentifier("registration", "2178784");
    assert.equal(serial.ok && serial.normalized, "78787878");
    assert.equal(registration.ok && registration.normalized, "2178784");
  });

  it("keeps a shorter historical number and strips padding", () => {
    const historical = validateIdentifier("registration", "022406");
    assert.equal(historical.ok && historical.normalized, "22406");
  });

  it("strips spaces and hyphens without guessing the identifier type", () => {
    const parsed = validateIdentifier("application", " 79-000001 ");
    assert.equal(parsed.ok && parsed.type, "application");
    assert.equal(parsed.ok && parsed.normalized, "79000001");
    const missing = validateIdentifier("serial", "78787878");
    assert.equal(missing.ok, false);
  });

  it("rejects letters, empty values, and an undocumented length", () => {
    assert.equal(validateIdentifier("application", "78A787878").ok, false);
    assert.equal(validateIdentifier("registration", "   ").ok, false);
    assert.equal(validateIdentifier("registration", "0000").ok, false);
    assert.equal(validateIdentifier("application", "1234567890123").ok, false);
  });
});
