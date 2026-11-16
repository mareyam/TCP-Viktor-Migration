import { createHash } from "node:crypto";
import {
  calculateMaintenance,
  type LegalBasis,
  type MaintenanceResult,
} from "./deadlines";
import type { IdentifierType } from "./identifiers";
import { redactSecrets } from "./redact";

/**
 * Documented TSDR case-status URLs from the TSDR FAQ checked on 2026-11-16:
 * https://tsdrapi.uspto.gov/ts/cd/casestatus/sn78787878/info.xml
 * https://tsdrapi.uspto.gov/ts/cd/casestatus/rn2178784/content.zip
 * A GET of info.xml without USPTO-API-KEY returned 401 on that date.
 * The element names below are a synthetic parser contract. A live info.xml
 * body was not captured, so a response that lacks ApplicationNumber is
 * malformed rather than an empty success.
 */

export function tsdrInfoUrl(type: IdentifierType, normalized: string): string {
  const prefix = type === "application" ? "sn" : "rn";
  return `https://tsdrapi.uspto.gov/ts/cd/casestatus/${prefix}${normalized}/info.xml`;
}

export function officialRecordUrl(input: {
  serialNumber: string | null;
  registrationNumber: string | null;
}): string {
  if (input.serialNumber) {
    return `https://tsdr.uspto.gov/statusview/sn${input.serialNumber}`;
  }
  if (input.registrationNumber) {
    return `https://tsdr.uspto.gov/statusview/rn${input.registrationNumber}`;
  }
  return "https://tsdr.uspto.gov/";
}

export type RawOwner = { name: string; role: "owner" | "attorney" | "correspondent" | "registrant" };

export type RawRecord = {
  fixture: "synthetic" | "api";
  serialNumber: string | null;
  registrationNumber: string | null;
  mark: string | null;
  statusText: string | null;
  statusDate: string | null;
  filingDate: string | null;
  registrationDate: string | null;
  legalBasis: string | null;
  goodsServices: string[];
  classes: string[];
  parties: RawOwner[];
  internationalRegistrationDate: string | null;
};

export type RecordView = {
  mark: string | null;
  owners: string[];
  attorneys: string[];
  correspondents: string[];
  registrants: string[];
  serialNumber: string | null;
  registrationNumber: string | null;
  statusText: string | null;
  statusDate: string | null;
  filingDate: string | null;
  registrationDate: string | null;
  legalBasis: string | null;
  goodsServices: string[];
  classes: string[];
  lastFetched: string;
  officialUrl: string;
  maintenance: MaintenanceResult;
  stale: boolean;
  partial: boolean;
  source: "tsdr-api" | "synthetic-fixture";
  fixtureLabel: "synthetic" | null;
  rawHash: string;
};

export type LookupErrorCode =
  | "unavailable_key"
  | "timeout"
  | "rate_limited"
  | "missing_record"
  | "malformed"
  | "provider_error";

export type LookupResult =
  | { ok: true; view: RecordView; fromCache: boolean }
  | { ok: false; error: LookupErrorCode; staleView: RecordView | null; detail: string };

type CacheEntry = { storedAt: string; view: RecordView };

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

function localTexts(xml: string, localName: string): string[] {
  const pattern = new RegExp(
    `<(?:[\\w.-]+:)?${localName}\\b[^>]*>([\\s\\S]*?)</(?:[\\w.-]+:)?${localName}>`,
    "gi",
  );
  const values: string[] = [];
  for (const match of xml.matchAll(pattern)) {
    const text = match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text) values.push(text);
  }
  return values;
}

function blockTexts(xml: string, blockName: string, localName: string): string[] {
  const pattern = new RegExp(
    `<(?:[\\w.-]+:)?${blockName}\\b[^>]*>([\\s\\S]*?)</(?:[\\w.-]+:)?${blockName}>`,
    "gi",
  );
  const values: string[] = [];
  for (const match of xml.matchAll(pattern)) {
    values.push(...localTexts(match[1], localName));
  }
  return values;
}

export function parseInfoXml(xml: string, fixture: RawRecord["fixture"]): RawRecord | null {
  const serial = localTexts(xml, "ApplicationNumber")[0] ?? null;
  if (!serial) return null;
  const registration = localTexts(xml, "RegistrationNumber")[0] ?? null;
  const basis = localTexts(xml, "FilingBasis")[0] ?? null;
  return {
    fixture,
    serialNumber: serial.replace(/^0+/, "") || serial,
    registrationNumber: registration ? registration.replace(/^0+/, "") || null : null,
    mark: localTexts(xml, "MarkVerbalElementText")[0] ?? null,
    statusText: localTexts(xml, "MarkCurrentStatusExternalDescriptionText")[0] ?? null,
    statusDate: localTexts(xml, "MarkCurrentStatusDate")[0] ?? null,
    filingDate: localTexts(xml, "ApplicationDate")[0] ?? null,
    registrationDate: localTexts(xml, "RegistrationDate")[0] ?? null,
    legalBasis: basis,
    goodsServices: localTexts(xml, "GoodsServicesText"),
    classes: localTexts(xml, "ClassNumber"),
    parties: [
      ...blockTexts(xml, "Owner", "OrganizationName").map((name) => ({
        name,
        role: "owner" as const,
      })),
      ...blockTexts(xml, "Attorney", "PersonFullName").map((name) => ({
        name,
        role: "attorney" as const,
      })),
      ...blockTexts(xml, "Correspondent", "OrganizationName").map((name) => ({
        name,
        role: "correspondent" as const,
      })),
      ...blockTexts(xml, "Registrant", "OrganizationName").map((name) => ({
        name,
        role: "registrant" as const,
      })),
    ],
    internationalRegistrationDate: localTexts(xml, "InternationalRegistrationDate")[0] ?? null,
  };
}

function basisCode(value: string | null): LegalBasis | null {
  if (!value) return null;
  const compact = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (compact.includes("66a") || compact.includes("madrid")) return "66a";
  if (compact === "1a" || compact === "1b" || compact === "44d" || compact === "44e") {
    return compact;
  }
  return "unknown";
}

export function toRecordView(raw: RawRecord, fetchedAt: string, rawHash: string): RecordView {
  const registrationNumber =
    raw.registrationNumber && raw.registrationNumber !== "0" ? raw.registrationNumber : null;
  const maintenance = calculateMaintenance({
    registrationDate: raw.registrationDate,
    filingDate: raw.filingDate,
    legalBasis: basisCode(raw.legalBasis),
    serialNumber: raw.serialNumber,
    statusText: raw.statusText,
    statusDate: raw.statusDate,
    internationalRegistrationDate: raw.internationalRegistrationDate,
    events: [],
    asOf: fetchedAt.slice(0, 10),
  });
  return {
    mark: raw.mark,
    owners: raw.parties.filter((party) => party.role === "owner").map((party) => party.name),
    attorneys: raw.parties.filter((party) => party.role === "attorney").map((party) => party.name),
    correspondents: raw.parties
      .filter((party) => party.role === "correspondent")
      .map((party) => party.name),
    registrants: raw.parties
      .filter((party) => party.role === "registrant")
      .map((party) => party.name),
    serialNumber: raw.serialNumber,
    registrationNumber,
    statusText: raw.statusText,
    statusDate: raw.statusDate,
    filingDate: raw.filingDate,
    registrationDate: raw.registrationDate,
    legalBasis: raw.legalBasis,
    goodsServices: raw.goodsServices,
    classes: raw.classes,
    lastFetched: fetchedAt,
    officialUrl: officialRecordUrl({
      serialNumber: raw.serialNumber,
      registrationNumber,
    }),
    maintenance,
    stale: false,
    partial: !raw.mark || !raw.statusText,
    source: raw.fixture === "synthetic" ? "synthetic-fixture" : "tsdr-api",
    fixtureLabel: raw.fixture === "synthetic" ? "synthetic" : null,
    rawHash,
  };
}

export type FetchLike = (
  url: string,
  init: { headers: Record<string, string> },
) => Promise<{ status: number; body: string }>;

export function createLookupClient(options?: {
  fetchImpl?: FetchLike;
  sleep?: (ms: number) => Promise<void>;
  now?: () => string;
  cacheTtlMs?: number;
}) {
  const cache = new Map<string, CacheEntry>();
  const sleep = options?.sleep ?? (async () => undefined);
  const now = options?.now ?? (() => new Date().toISOString());
  const ttl = options?.cacheTtlMs ?? CACHE_TTL_MS;

  async function lookup(input: {
    type: IdentifierType;
    normalized: string;
    apiKey: string | null;
    fetchImpl?: FetchLike;
  }): Promise<LookupResult> {
    const cacheKey = `${input.type}:${input.normalized}`;
    const cached = cache.get(cacheKey) ?? null;
    if (!input.apiKey) {
      return {
        ok: false,
        error: "unavailable_key",
        staleView: cached ? { ...cached.view, stale: true } : null,
        detail: "USPTO_TSDR_API_KEY is not set.",
      };
    }
    if (cached && Date.parse(now()) - Date.parse(cached.storedAt) < ttl) {
      return { ok: true, view: { ...cached.view, stale: false }, fromCache: true };
    }
    const url = tsdrInfoUrl(input.type, input.normalized);
    const fetchImpl = input.fetchImpl ?? options?.fetchImpl;
    if (!fetchImpl) {
      return {
        ok: false,
        error: "provider_error",
        staleView: cached ? { ...cached.view, stale: true } : null,
        detail: "No fetch implementation was provided.",
      };
    }
    let response: { status: number; body: string } | null = null;
    let lastDetail = "USPTO did not return a record.";
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        response = await fetchImpl(url, {
          headers: { "USPTO-API-KEY": input.apiKey },
        });
      } catch (error) {
        lastDetail = redactSecrets(
          error instanceof Error ? error.message : "timeout",
          [input.apiKey],
        );
        response = null;
      }
      if (response && response.status !== 429 && response.status < 500) break;
      if (response?.status === 429 && attempt === 2) break;
      await sleep(50 * attempt);
    }
    if (!response) {
      return {
        ok: false,
        error: "timeout",
        staleView: cached ? { ...cached.view, stale: true } : null,
        detail: lastDetail,
      };
    }
    if (response.status === 401 || response.status === 403) {
      return {
        ok: false,
        error: "unavailable_key",
        staleView: cached ? { ...cached.view, stale: true } : null,
        detail: "USPTO refused the request. The API key was not logged.",
      };
    }
    if (response.status === 404) {
      return {
        ok: false,
        error: "missing_record",
        staleView: null,
        detail: "USPTO returned 404 for this identifier and identifier type.",
      };
    }
    if (response.status === 429) {
      return {
        ok: false,
        error: "rate_limited",
        staleView: cached ? { ...cached.view, stale: true } : null,
        detail: "USPTO returned 429.",
      };
    }
    if (response.status >= 500 || response.status >= 400) {
      return {
        ok: false,
        error: "provider_error",
        staleView: cached ? { ...cached.view, stale: true } : null,
        detail: `USPTO returned ${response.status}.`,
      };
    }
    const parsed = parseInfoXml(response.body, "api");
    if (!parsed) {
      return {
        ok: false,
        error: "malformed",
        staleView: cached ? { ...cached.view, stale: true } : null,
        detail: "The response did not include ApplicationNumber. It was not treated as an empty record.",
      };
    }
    if (input.type === "application" && parsed.serialNumber !== input.normalized) {
      return {
        ok: false,
        error: "malformed",
        staleView: cached ? { ...cached.view, stale: true } : null,
        detail: "The application lookup did not return that serial number.",
      };
    }
    if (input.type === "registration" && parsed.registrationNumber !== input.normalized) {
      return {
        ok: false,
        error: "malformed",
        staleView: cached ? { ...cached.view, stale: true } : null,
        detail: "The registration lookup did not return that registration number.",
      };
    }
    const rawHash = createHash("sha256").update(response.body).digest("hex");
    const view = toRecordView(parsed, now(), rawHash);
    cache.set(cacheKey, { storedAt: now(), view });
    return { ok: true, view, fromCache: false };
  }

  return { lookup };
}
