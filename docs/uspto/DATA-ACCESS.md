# USPTO data-access note

Checked: 2026-11-16.

This note records what was opened and what a request without a key returned. It does not mean record lookup or new-application monitoring is live.

An individual TSDR lookup does not discover every new application. Google and other search APIs were not used as a substitute.

## A. Individual record lookup (TSDR)

### Sources opened

- https://www.uspto.gov/trademarks/apply/check-status-view-documents — status and maintenance instructions. The page says to enter an application serial number or a registration number in TSDR, and to use the Maintenance button for the next filing deadline and document type under “Next maintenance filing required.”
- https://tsdr.uspto.gov/faqview — example API URLs and rate limits.
- https://www.uspto.gov/trademarks/apply/check-status-view-documents/trademark-bulk-data — says a TSDR API key is required for programmatic case status, documents, and images. Key manager: https://account.uspto.gov/api-manager/ . Support: APIhelp@uspto.gov.
- https://developer.uspto.gov/swagger/tsdr-api-v1 — returned `301` to `https://data.uspto.gov/home` on 2026-11-16. The FAQ still points at that swagger URL. No swagger body was available there.
- https://developer.uspto.gov/api-catalog/tsdr-data-api — rendered the Open Data Portal home, not a TSDR field list.

### Documented request

| Item | Value from the pages above |
| --- | --- |
| Case status by serial | `GET https://tsdrapi.uspto.gov/ts/cd/casestatus/sn{serial}/info.xml` (FAQ example `sn78787878`) |
| Case content by serial | `GET https://tsdrapi.uspto.gov/ts/cd/casestatus/sn{serial}/content` and `content.html` |
| Case content by registration | FAQ example `https://tsdrapi.uspto.gov/ts/cd/casestatus/rn2178784/content.zip` |
| Header | `USPTO-API-KEY: {key from the API Key Manager}` |
| Key | USPTO.gov account. The key is described as about 40 characters. It must stay server-side. |
| Format | FAQ asks for XML via `info.xml` and HTML via `content.html`. A live XML body was not downloaded. |
| Rate limit | FAQ: 60 requests per key per minute. PDF and ZIP downloads, including multi-case downloads, 4 requests per key per minute. HTTP 429 when exceeded. The user guide says these limits can change. |
| Coverage | TSDR is the electronic file for US applications, registrations, extensions of protection, and Madrid filings recorded through the USPTO. |
| Freshness | The status page says new documents may not appear in TSDR on the day they are filed. No tighter lag number was published on the pages checked. |

### What a request without a key did

`GET https://tsdrapi.uspto.gov/ts/cd/casestatus/sn78787878/info.xml` on 2026-11-16:

- Status: `401`
- Body (sanitized; the bracketed id is the gateway’s own request id from that response): `Beginning October 2, you’ll need to register for an API key to download bulk data from our TSDR APIs. Register for an API key at https://account.uspto.gov/api-manager/. Learn more about this new requirement at https://developer.uspto.gov/api-catalog. [request id omitted]`

No status XML was saved. The parser in `src/lib/uspto/tsdr.ts` therefore treats a body without `ApplicationNumber` as malformed. Its other element names are a synthetic contract until a real `info.xml` snapshot is stored with a capture date. Unit tests that use that contract are labelled synthetic. They are not proof of live access.

### Public TSDR pages used only to read examples

These HTML paths are what the public TSDR site returned. They are not the documented API, and one registration request returned `403` before a later `200`. They are manual comparison pages, not the product’s data source.

| URL | Result on 2026-11-16 |
| --- | --- |
| `https://tsdr.uspto.gov/statusview/sn78787878` | `200`. Mark MAC MEMPHIS ATHLETIC CAMPUS. Filing Jan. 09, 2006. Status abandoned for failure to respond. Status date Sep. 25, 2007. Owner MEMPHIS ATHLETIC CAMPUS FOUNDATION. No registration number in the parsed status fields. |
| `https://tsdr.uspto.gov/statusview/rn2178784` | `403` once, then `200`. Mark JAVA. Serial 74631225. Registration 2178784. Registration date Aug. 04, 1998. Owner Oracle America, Inc. Registrant Sun Microsystems, Inc. Status “The registration has been renewed.” Status date Dec. 31, 2017. Class 009. |
| `https://tsdr.uspto.gov/maintenanceview/sn74631225` | `200`. Sections 8 and 9. Earliest Aug. 04, 2027. Ordinary deadline Aug. 04, 2028. Grace-period end Feb. 05, 2029. Also showed §8 (10 year) accepted, §9 renewal granted, and §15 acknowledged. |
| `https://tsdr.uspto.gov/statusview/sn79000001` | `200`. Madrid (`Filed 66A: Yes`). Mark BOTASAN. Filing Nov. 02, 2003. No US registration number. Status abandoned because the international registration was restricted, renounced, or expired. Status date Nov. 02, 2013. Owner Dr. Andreas Walde. IR 0813025. Class 003. |
| `https://tsdr.uspto.gov/maintenanceview/sn79000001` | `200` with an empty maintenance body (423 bytes, no deadline text). |

Phone numbers, email addresses, and street addresses from those pages are not copied here.

The Maintenance screen is a manual check. Nothing opened on 2026-11-16 showed that `info.xml` contains “Next maintenance filing required.” The rules module calculates when that field is absent, and it prefers an explicit official next-filing object when a caller supplies one.

## B. Newly available applications

### Sources opened

- https://www.uspto.gov/trademarks/apply/check-status-view-documents/trademark-bulk-data — points at the Open Data Portal and says the Bulk Data Storage System can be used. The ODP FAQ says BDSS (`bulkdata.uspto.gov`) has been retired and the files are in the ODP Bulk Data Directory.
- https://data.uspto.gov/support/faq — product id `TRTDXFAP`, title “Trademark Full Text XML Data (No Images) – Daily Applications”, file pattern `apcyymmdd.zip`, example file `apc250421.zip`.
- https://data.uspto.gov/apis/bulk-data/download — download endpoint and the 20-download limit.
- https://data.uspto.gov/apis/bulk-data/product — product metadata endpoint. The page says an API key is required.
- https://data.uspto.gov/apis/api-rate-limits — limits below.
- https://data.uspto.gov/apikey — from June 18, 2026 a USPTO.gov account is required. ID.me verification is required for an API key. From August 18, 2026 the profile needs job title, organization name, organization type, and intended use. Keys that missed those fields by October 8, 2026 were deactivated until the profile is completed and “Activate API Key” is clicked.
- https://www.uspto.gov/sites/default/files/products/applications-documentation.pdf — “TRADEMARK APPLICATIONS DAILY XML DTD ELEMENT DOCUMENTATION (V2.0)”. The text layer names `case-file-statement` and `international-code-total-no`. Most tag names did not survive the text extraction. Action key `NA` is “New Applications filed” and “will not appear in the OG”. Action key `TX` is a modification and also does not appear in the OG. The status-code table is labeled “Table updated 06/24/2005”.
- https://data.uspto.gov/bulkdata/datasets/trtdxfap — the fetch returned an empty document (the page is a scripted portal). No file size was shown.

### Documented request

| Item | Value |
| --- | --- |
| Product | `TRTDXFAP` |
| Metadata | `GET https://api.uspto.gov/api/v1/datasets/products/trtdxfap` or `.../TRTDXFAP` |
| File | `GET https://api.uspto.gov/api/v1/datasets/products/files/TRTDXFAP/apcyymmdd.zip` |
| Header | `x-api-key` |
| Redirect | Follow redirects. The signed redirect expires in about 5 seconds. |
| Format | ZIP of XML, described as full text without images. The live DTD version inside a 2026 file was not opened. The PDF on USPTO.gov is V2.0. |
| New applications | The V2.0 action-key list includes `NA` for new applications, not only Official Gazette publications. |
| Cadence | Daily files, one zip per day, named with the two-digit year (`apc250421.zip` is the FAQ’s example for 2025-04-21). |
| Lag | Not measured. Do not describe the feed as instant. TSDR itself says same-day documents can be missing. |
| Same-file limit | 20 downloads of the same file per API key per year, with an unquantified higher limit for XML files. The 21st request returns HTTP 429. |
| Burst | Up to 5 files per 10 seconds from one IP. Metadata calls: one in flight per key, and the published rate band is 4 to 15 requests per second depending on the call. Weekly metadata quota: 5 million calls, reset Sunday 00:00 UTC. |
| Parallel use | The rate-limit page says concurrent calls with the same key are blocked. |
| Cost of the feed | The portal describes the data as free. A key is still required. |

### What a request without a key did

On 2026-11-16 both of these returned `401` and `{"message":"Unauthorized"}`:

- `https://api.uspto.gov/api/v1/datasets/products/trtdxfap`
- `https://api.uspto.gov/api/v1/datasets/products/files/TRTDXFAP/apc250421.zip`

No zip was downloaded. File size, record count, and processing time were not measured. No storage or compute cost is stated from a sample.

### Checkpoint plan (implemented, not run against USPTO)

- Download each daily file once, centrally. Do not download it per customer.
- The first successful file date is the baseline. Matches in that run are labelled `existing_application`.
- Later runs alert on action key `NA` only when the filing date is after the baseline, the status code is in the maintained 2005 live-application list, and the word-mark rules match.
- Abandoned, cancelled, and expired codes from that 2005 table are excluded from alerts. Unknown codes are withheld with a reason. They are not reported as “no similar applications.”
- A failed file, a thrown record, or a gap does not move `lastSuccessDate` forward. The missing day has to be processed before a later day is committed.
- Re-sending the same file hash does not create another alert. A changed hash for an older day can update status on an existing alert.
- `USPTO_APPLICATION_MONITORING_ENABLED` defaults off. Customer-visible alerts also stay in `internal_review` because the human-labeled launch gate is not met (`src/lib/uspto/benchmark.ts`).

## Maintenance rules that were read

- https://www.uspto.gov/trademarks/maintain/keeping-your-registration-alive — Section 8 between years 5 and 6; Sections 8 and 9 between years 9 and 10 and every 10 years after that; Section 71 on the same US anniversary cycle for Madrid; WIPO renewal is separate and is not filed with the USPTO; Section 15 is optional; a Saturday, Sunday, or federal holiday deadline moves to the next business day; the grace period is six months and needs an extra fee.
- https://www.uspto.gov/trademarks/trademark-timelines/post-registration-timeline-madrid-protocol-based-registrations — Section 71 is counted from the US registration date. International renewal is counted from the international registration date.
- https://www.uspto.gov/trademarks/maintain — Section 71 windows restated, including the grace-period fee note.

The JAVA maintenance tab (registration date Aug. 04, 1998) shows ordinary deadline Aug. 04, 2028 and grace end Feb. 05, 2029. Feb. 04, 2029 is a Sunday, so the next business day is Feb. 05, 2029. The rules module reproduces those dates. That is a calculation check against one official maintenance screen, not a live API test.
