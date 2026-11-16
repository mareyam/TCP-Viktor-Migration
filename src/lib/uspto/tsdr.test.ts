import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { escapeText } from "./redact";
import { createLookupClient, parseInfoXml, tsdrInfoUrl } from "./tsdr";

const SYNTHETIC = `<?xml version="1.0"?>
<!-- synthetic fixture, not a captured USPTO response -->
<TrademarkTransaction data-fixture="synthetic">
  <ApplicationNumber>78787878</ApplicationNumber>
  <MarkVerbalElementText>Example &lt;script&gt;alert(1)&lt;/script&gt;</MarkVerbalElementText>
  <MarkCurrentStatusExternalDescriptionText>Abandoned because no response was filed.</MarkCurrentStatusExternalDescriptionText>
  <MarkCurrentStatusDate>2007-09-25</MarkCurrentStatusDate>
  <ApplicationDate>2006-01-09</ApplicationDate>
  <FilingBasis>1(a)</FilingBasis>
  <GoodsServicesText>Synthetic goods for testing only.</GoodsServicesText>
  <ClassNumber>025</ClassNumber>
  <Owner><OrganizationName>First Owner</OrganizationName></Owner>
  <Owner><OrganizationName>Second Owner</OrganizationName></Owner>
  <Registrant><OrganizationName>Former Name</OrganizationName></Registrant>
  <Attorney><PersonFullName>Example Attorney</PersonFullName></Attorney>
  <Correspondent><OrganizationName>Example Correspondent</OrganizationName></Correspondent>
</TrademarkTransaction>`;

describe("TSDR adapter", () => {
  it("builds the documented serial and registration URLs", () => {
    assert.equal(
      tsdrInfoUrl("application", "78787878"),
      "https://tsdrapi.uspto.gov/ts/cd/casestatus/sn78787878/info.xml",
    );
    assert.equal(
      tsdrInfoUrl("registration", "2178784"),
      "https://tsdrapi.uspto.gov/ts/cd/casestatus/rn2178784/info.xml",
    );
  });

  it("parses a labelled synthetic record and separates owners from counsel", () => {
    const parsed = parseInfoXml(SYNTHETIC, "synthetic");
    assert.ok(parsed);
    assert.equal(parsed?.fixture, "synthetic");
    assert.equal(parsed?.parties.filter((party) => party.role === "owner").length, 2);
    assert.equal(parsed?.parties.find((party) => party.role === "attorney")?.name, "Example Attorney");
    assert.notEqual(
      parsed?.parties.find((party) => party.role === "registrant")?.name,
      parsed?.parties.find((party) => party.role === "owner")?.name,
    );
  });

  it("returns unavailable_key, missing, malformed, rate limit, and stale cache without an empty success", async () => {
    const client = createLookupClient({
      now: () => "2026-11-16T12:00:00.000Z",
      cacheTtlMs: 0,
      sleep: async () => undefined,
    });
    const noKey = await client.lookup({
      type: "application",
      normalized: "78787878",
      apiKey: null,
    });
    assert.equal(noKey.ok, false);
    if (!noKey.ok) assert.equal(noKey.error, "unavailable_key");

    let calls = 0;
    const fetchImpl = async (url: string) => {
      calls += 1;
      assert.match(url, /\/rn2178784\/info\.xml$/);
      assert.equal(url.includes("secret-key"), false);
      if (calls === 1) {
        return {
          status: 200,
          body: SYNTHETIC.replace("78787878", "74631225").replace(
            "</TrademarkTransaction>",
            "<RegistrationNumber>2178784</RegistrationNumber></TrademarkTransaction>",
          ),
        };
      }
      throw new Error("socket timeout secret-key");
    };
    const found = await client.lookup({
      type: "registration",
      normalized: "2178784",
      apiKey: "secret-key",
      fetchImpl,
    });
    assert.equal(found.ok, true);
    if (found.ok) {
      assert.equal(found.view.serialNumber, "74631225");
      assert.equal(found.view.registrationNumber, "2178784");
      assert.equal(found.view.source, "tsdr-api");
      assert.equal(found.view.fixtureLabel, null);
      assert.equal(found.view.maintenance.ordinaryDeadline, null);
      assert.match(found.view.officialUrl, /tsdr\.uspto\.gov/);
    }
    const stale = await client.lookup({
      type: "registration",
      normalized: "2178784",
      apiKey: "secret-key",
      fetchImpl,
    });
    assert.equal(stale.ok, false);
    if (!stale.ok) {
      assert.equal(stale.error, "timeout");
      assert.equal(stale.staleView?.stale, true);
      assert.equal(stale.detail.includes("secret-key"), false);
    }

    const missing = await client.lookup({
      type: "application",
      normalized: "00000001",
      apiKey: "secret-key",
      fetchImpl: async () => ({ status: 404, body: "" }),
    });
    assert.equal(missing.ok, false);
    if (!missing.ok) assert.equal(missing.error, "missing_record");

    const malformed = await client.lookup({
      type: "application",
      normalized: "78787878",
      apiKey: "secret-key",
      fetchImpl: async () => ({ status: 200, body: "<Trademark></Trademark>" }),
    });
    assert.equal(malformed.ok, false);
    if (!malformed.ok) assert.equal(malformed.error, "malformed");

    const limited = await client.lookup({
      type: "application",
      normalized: "78787878",
      apiKey: "secret-key",
      fetchImpl: async () => ({ status: 429, body: "slow down" }),
    });
    assert.equal(limited.ok, false);
    if (!limited.ok) assert.equal(limited.error, "rate_limited");
  });

  it("escapes provider text and keeps a partial record partial", () => {
    const escaped = escapeText("<script>alert(1)</script>");
    assert.equal(escaped.includes("<script>"), false);
    const parsed = parseInfoXml(
      `<root><ApplicationNumber>1234</ApplicationNumber><MarkCurrentStatusExternalDescriptionText>Pending</MarkCurrentStatusExternalDescriptionText><ApplicationDate>2026-01-01</ApplicationDate><FilingBasis>1(b)</FilingBasis></root>`,
      "synthetic",
    );
    assert.equal(parsed?.mark, null);
  });
});
