# USPTO watch setup

The code in `src/lib/uspto/` is in this repository. It is not a running monitoring service. Lookup, reminders, application monitoring, and live email are off unless the environment variables below are the string `true`.

## Environment variable names

See `.env.example`. Do not commit values.

| Name | Purpose |
| --- | --- |
| `USPTO_LOOKUP_ENABLED` | Record lookup route and `/account/uspto-watch/`. Default off, which returns 404. |
| `USPTO_REMINDERS_ENABLED` | Lets the daily job consider reminders. Default off. |
| `USPTO_APPLICATION_MONITORING_ENABLED` | Lets ingestion run. Default off. Customer alerts stay in internal review until the launch gate in `src/lib/uspto/benchmark.ts` is met. |
| `USPTO_LIVE_EMAIL_ENABLED` | Must stay unset or not `true`. `liveEmailDeliver()` throws. The outbox state is `dry_run`. |
| `USPTO_TSDR_API_KEY` | Sent only as the `USPTO-API-KEY` header from server code. |
| `USPTO_ODP_API_KEY` | Sent only as the `x-api-key` header from server code. Not wired to a download yet, because no file has been fetched. |
| `USPTO_CRON_SECRET` | `Authorization: Bearer` value. Required once any flag above is true. |
| `DATABASE_URL` | Reserved. `getStore()` still refuses to connect. |
| `USPTO_LIVE_EMAIL_TEST_RECIPIENT` | Reserved. Unused while live email throws. |

No `NEXT_PUBLIC_` USPTO variable exists. Client components are tested so they do not mention the key names.

## What is still blocked

1. **TSDR key.** Create it at https://account.uspto.gov/api-manager/ with a USPTO.gov account. Put it in `USPTO_TSDR_API_KEY`. Do not paste it into chat. Then save a sanitized `info.xml` for serial `78787878` and registration `2178784`, and adjust `parseInfoXml` if the element names differ. Until that snapshot matches, live lookup is unverified.
2. **ODP key.** Sign in at https://data.uspto.gov/apikey with ID.me. Complete job title, organization name, organization type, and intended use, then activate the key if it was turned off after October 8, 2026. Put it in `USPTO_ODP_API_KEY`. Download one `TRTDXFAP` file, record its byte size and parse time, and only then map the real XML tags. The current XML parser rejects files that are not labelled `data-fixture="synthetic"`.
3. **Database.** Do not invent one. The smallest store is one Postgres database used only for the tables in `docs/uspto/schema.sql`. A free Postgres plan is enough to start if its storage cap holds the normalized rows. Do not store the daily zips in the database. This build does not include a driver and does not connect when `DATABASE_URL` is set. Cost was not measured: the daily zip size is unknown until the ODP key works.
4. **Sign-in.** `getServerTenantId()` in `src/lib/uspto/session.ts` always returns null. There is no customer account in this repo. The smallest addition is server-side sessions in that same Postgres, created by an operator for test users, with the session id in an HttpOnly cookie. Do not trust a tenant id from the browser. A third-party auth vendor was not added. The get-started Stripe checkout stays in test mode and is not a login.
5. **Scheduler.** `vercel.json` calls `GET /api/internal/uspto/daily/` at 12:00 UTC every day. The job treats “today” as an ISO date; deadline comparisons use calendar dates, not the server’s local zone. USPTO deadlines follow the federal calendar documented in `src/lib/uspto/holidays.ts`. Run the job after midnight US Eastern if you want the Eastern calendar date to have rolled over (12:00 UTC is 07:00 EST and 08:00 EDT). While every flag is off, the route returns `disabled` and does no work. When a flag is on, a missing or wrong `USPTO_CRON_SECRET` returns 401.
6. **Live email.** Leave it off. Dry-run rows use state `dry_run` and `receiptClaimed: false`.

## Migrations

`docs/uspto/schema.sql` is the proposed schema, including unique keys for one active watch per tenant and serial, one reminder per tenant, watch, obligation, deadline, and channel, and one alert per tenant, watch, and candidate serial. It has not been applied. The commented `drop table` lines at the bottom are the rollback. Turning the four feature flags off is the application rollback; the next request then 404s or the daily job returns `disabled`.

## Restart and catch-up

Feed state is the checkpoint in `src/lib/uspto/feed.ts`: last successful file date, baseline date, failed date, and processed file hashes. A failed record or a missing day does not move the success date forward. Process the failed or missing day, then the following days. Processing the same hash again does not create another alert.

## Source limits

- US word marks only. No logo comparison, no foreign registries, no opposition filing, no takedown.
- Maintenance dates are calculated unless a caller passes an official next-filing field. Customers still have to check TSDR.
- February 29 anniversaries and dates outside the 2020–2036 holiday calendar come back as “Needs official review.”
- Similar-name output is an internal review priority, not a probability of infringement.
- The engineering benchmark has implementer labels only. Human review labels are empty, so the launch gate fails closed.

## Operating cost

Not measured. USPTO documents describe the API and the bulk files as free, with the rate limits in `DATA-ACCESS.md`. Database and email cost depends on the services you approve later. No paid service was provisioned for this change. Stripe was not changed.

## Handoff

Tested on this branch with `npm test`, `npm run lint`, and `npm run build`. Commands and results are in the pull request. Nothing was deployed, and no migration was applied.

| Item | State |
| --- | --- |
| Wording audit and removal of the Section 8 / foreign-filing claims that were in the repo | Built and tested |
| Data-access note for TSDR and `TRTDXFAP` | Built. Live calls without a key returned 401. File size not measured. |
| Identifier checks, TSDR client, maintenance rules, dry-run reminders, word-mark matcher, synthetic feed checkpoint | Built and tested |
| Tenant isolation of the in-memory store, unauthenticated routes, cron secret, secret redaction | Built and tested |
| Public pages, sitemap, and nav advertising the feature | Not built, on purpose. Flags default off. `/account/uspto-watch/` 404s. |
| Durable database and applied migration | Built as `docs/uspto/schema.sql` only. Blocked: no database was approved, and the server refuses to connect. |
| Customer sign-in | Not built. `getServerTenantId()` returns null. |
| Live TSDR XML mapping | Blocked on `USPTO_TSDR_API_KEY` and a saved response. |
| Live daily-file ingestion | Blocked on `USPTO_ODP_API_KEY`. The parser rejects unlabelled XML. |
| Human-labeled match benchmark and customer-visible alerts | Not met. Alerts stay `internal_review`. |
| Live email | Not built. The send function throws. |
| WordPress site and Convex chatbot knowledge | Not changed. See `WORDING-AUDIT.md`. |
| Ten official-record field comparisons rendered by the app | Not done. The app cannot call TSDR. Three public TSDR pages were read by hand; see `VERIFICATION.md`. |

## Verification evidence that is not live access

- Synthetic fixtures are labelled `synthetic` or `data-fixture="synthetic"`.
- The JAVA maintenance dates in `deadlines.test.ts` are compared with the TSDR Maintenance tab read on 2026-11-16. That test does not call USPTO.
- `npm test` does not prove a production lookup, a production ingest, or that a customer received anything.
