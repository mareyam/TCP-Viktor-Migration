# TCP: USPTO registry monitoring implementation prompt

Status: implementation instructions only. This document does not mean the feature is built.

Copy the prompt below into Claude Code while working in `mareyam/TCP-Viktor-Migration`.

## Prompt starts here

You are implementing a USPTO-only trademark monitoring feature for Trademark Copyright Protection (TCP).

### 1. Repository, scope and working rules

- Source of truth: GitHub `mareyam/TCP-Viktor-Migration`. Existing Next.js deployment: https://tcp-viktor-migration.vercel.app/.
- Read AGENTS.md, CLAUDE.md, package.json, existing source, authentication and deployment configuration first. Fetch the latest main. Check for concurrent changes by Viktor or another editor.
- Use a feature branch and PR, as the repository requires. The final approved result must reach main. Do not force-push or overwrite someone else's work. If checks or permissions prevent merging, identify the blocker instead of saying it is on main.
- Keep all new frontend code, backend code, database migrations/schema, scheduled-job definitions, matching rules, tests and operating documentation in this repository. Do not leave the working feature only on a laptop or in an untracked external builder.
- The current repo is a Next.js website with no documented database. Do not assume an authenticated customer dashboard already exists here. Inspect actual integrations first. Reuse existing TCP identity/backend services if accessible and suitable; otherwise propose the smallest persistent backend and authentication addition, including cost, for approval before provisioning.
- If the existing customer dashboard lives elsewhere, document how it will consume this feature. Do not silently create a second disconnected customer account system.
- Use Next.js server-side routes/actions for secret-bearing calls. Never expose USPTO keys in client code, NEXT_PUBLIC variables, logs, commits or screenshots.
- Never ask me to paste a key in chat. Use the platform's secure secret/environment settings.
- Preserve existing URLs, SEO, brand tokens, contrast/accessibility, chatbot, signup flow and Stripe TEST mode. No live charges.
- Do not alter the old WordPress site or external chatbot service without the required access and explicit approval. List those external edits separately if unavailable from this repo.
- Do not add paid vendors, change billing, switch domains or send customer emails without my approval.
- Implement in the phases below. Finish all feasible approved work; stop only at a real access, budget or approval blocker. Use feature flags so unfinished parts are not marketed as available.

### 2. What the feature must do

A signed-in customer can:
1. Enter a US application serial number or registration number, explicitly choosing the identifier type.
2. Retrieve the official record and inspect it before adding it to their watchlist.
3. See the mark name, owner(s), application serial number, registration number when present, official status and its date, filing and registration dates, legal basis, goods/services and classes.
4. See the next required US maintenance filing and its filing window, if reliably known.
5. Receive an in-app reminder six calendar months before that deadline.
6. Receive an in-app alert when newly available USPTO application data contains a potentially similar word mark, with a clear reason and official evidence.
7. Open the official USPTO record from every record and alert.
8. Pause/remove their watch without deleting another customer's watch.

Email delivery is optional until a sender is securely configured and I approve sending. Build a dry-run email outbox and preview first. Initial live email testing must use only a test address I approve.

This is a US word-mark watch, not worldwide registry coverage, logo/image comparison, legal advice, guaranteed infringement detection, opposition filing or an automatic takedown service.

### 3. Short-term wording fix

Audit tracked page content, metadata, structured data, FAQs and any tracked chatbot knowledge for claims such as:
- "240+ registries" or worldwide registry monitoring;
- existing renewal reminders, opposition monitoring or registration-number lookup;
- guaranteed prevention of infringement.

Replace only inaccurate capability claims with truthful wording about currently available online brand/content monitoring. Do not imply that this new feature is available before its data connection and acceptance tests pass.

After the USPTO feature is verified and enabled, wording may say:
"US trademark record tracking, maintenance reminders and potential similar-name application alerts."

Use "potential match", not "infringer", for an application. Do not confuse an application filing date, data-availability date and publication-for-opposition date.

If the chatbot is an external service, report the exact stale claim and which service/knowledge source needs updating. A repository text change alone does not prove the chatbot changed.

### 4. Official data access: verify before designing around it

Start with official documentation:
- https://www.uspto.gov/trademarks/apply/check-status-view-documents
- https://www.uspto.gov/trademarks/apply/check-status-view-documents/trademark-bulk-data
- https://www.uspto.gov/trademarks/maintain/keeping-your-registration-alive
- https://www.uspto.gov/trademarks/trademark-timelines/post-registration-timeline-madrid-protocol-based-registrations

Re-open these documents and follow their current API/data-feed links. Do not invent endpoints, rate limits, formats, authentication requirements or promises of freshness.

Prove two different capabilities:
A. Individual record lookup through an official USPTO source, such as TSDR.
B. Discovery of newly available applications using an official documented searchable source or bulk data feed.

An individual TSDR lookup does not by itself discover every new application. Do not use Google or SerpApi as a substitute and call that complete registry monitoring.

Produce a short discovery note with:
- source URL and documentation date checked;
- access/key requirements;
- response format and example sanitized response;
- coverage, delivery cadence, expected lag and actual rate limits;
- whether new applications or only later publications are included;
- bulk-file size, storage needs and a small processing-cost test;
- the checkpoint, initial-baseline and catch-up strategy.

If comprehensive new-application discovery cannot be verified or is too expensive, keep that phase disabled. Deliver lookup/reminders separately and explain the exact missing dependency. Do not replace it with a demo while labeling it live.

### 5. Reliable record lookup

- Validate identifier type and syntax using current official documentation, without rigid length assumptions that reject valid historical records.
- Resolve a registration number to the correct serial-number record. Never guess a record from a brand name.
- Normalize provider responses behind a typed server-side adapter.
- Preserve source values and normalized values, the fetched time, provider status and a sanitized source snapshot or hash for audit.
- Display multiple owners if the source has them. Distinguish registrant/owner from correspondent or attorney.
- Retain raw official status text rather than replacing it with only an oversimplified label.
- Handle pending, registered, abandoned, cancelled, expired, missing and partially populated records.
- A pending application has no registration renewal date. Never manufacture one.
- A provider timeout or missing field must not become "no trademark" or an empty successful result.
- Use caching, bounded retries with backoff, request limits and stale-data labels. Preserve the last good record if refresh fails.
- Display "Last fetched" separately from the official status date and "View official USPTO record".

### 6. Maintenance deadlines, not just a ten-year renewal date

Prefer an explicit official "Next maintenance filing required" field when the documented API exposes it. The TSDR Maintenance screen is a manual verification source, not proof that the API supplies the same field.

Where calculation is necessary, use a versioned rules module and official documentation:
- Ordinary US registrations generally require Section 8 maintenance between years 5 and 6.
- Combined Sections 8 and 9 maintenance/renewal generally applies between years 9 and 10, then each ten-year cycle.
- Madrid/Section 66(a) records have US Section 71 requirements. International renewal is through WIPO and uses a different date. Do not label it as a USPTO Section 9 renewal.
- Optional Section 15 filings are not mandatory maintenance.
- Handle actual filing/acceptance events, pending maintenance and accepted maintenance before assigning the next due action. Passing an anniversary alone does not prove compliance.
- Handle six-month grace periods separately from ordinary deadlines, including fee warnings.
- Verify weekend/federal-holiday adjustments from official rules. Preserve the nominal date and adjusted deadline, and use a maintained calendar.
- Use calendar-date arithmetic, including leap years and month-end rules, not "180 days = six months".
- For unsupported bases, old special cases, conflicting dates or missing events, show "Needs official review" and the official link, not a guessed deadline.

Show filing type, filing-window start, ordinary deadline, grace-period end if relevant, whether the date is official or calculated, and verification time. Show a concise note that customers remain responsible for checking official deadlines.

### 7. Reminder behavior

- Run a daily persistent scheduled job. Document scheduler authentication and timezone.
- Schedule the reminder six calendar months before the applicable ordinary deadline.
- If a mark is added inside that six-month window, produce one "Upcoming filing deadline" reminder promptly. If overdue, show an appropriate overdue/grace-period state, not a normal future reminder.
- Make reminder creation and delivery retry-safe with unique keys based on tenant, mark, filing obligation, deadline and channel.
- Recompute after official record updates. Cancel obsolete pending reminders without erasing the audit history.
- Test overlapping jobs, retries and partial delivery failures. Track pending/sent/failed states and delivery-provider identifiers where available.
- Never claim receipt merely because an email was queued or accepted by a provider.
- Dry-run is the default. No real customer email during development.

### 8. Similar-name application watch

First version: word marks only, daily checks when the official feed permits. Describe actual source lag rather than promising instant alerts.

- On initial setup, build a dated baseline and label older results "existing applications", not new filings.
- On later runs, process all new or changed source records since the last successful checkpoint, with overlap/deduplication. Handle late-arriving and corrected records.
- Download/index a feed centrally once, then match across customers. Do not download the whole feed for every customer.
- Preserve source file/version/hash, publication/delivery date if supplied, ingestion time and checkpoint. Do not advance the checkpoint past failed processing.
- Restrict active alerts to the documented relevant application states. Explain how dead/abandoned records are treated.
- Compare normalized word marks while preserving original spelling and Unicode.
- Include exact matches, punctuation/spacing variants, typo/edit-distance candidates, token changes and limited phonetic candidates.
- Short/common names need stricter thresholds. Do not strip generic terms blindly and create floods of false matches.
- Consider goods/services and classes as context. Same class does not prove conflict; different classes do not rule it out.
- No opaque AI-only matching. Start with a deterministic, versioned, explainable baseline. Any paid AI enrichment requires approval and a cost cap.
- Output an internal review priority, not a percentage probability of infringement.
- Each alert must show both marks, applicant/owner as provided, serial number, filing date, goods/services, classes, comparison reason, rule version, discovery time and official link.
- Deduplicate customer/watched-mark/candidate alerts across repeated runs. Record meaningful later status changes without spamming duplicates.
- Let users mark alerts relevant/dismissed without affecting other tenants.
- If the feed fails, display "Monitoring delayed". A failed or incomplete run must never say "No similar applications found".

### 9. Persistence, security and operations

Use durable storage for normalized records, tenant-scoped watchlists, obligations, reminders, candidates, match alerts, feed checkpoints, job runs and notification outbox. Include migrations, indexes and unique constraints.

Enforce authorization on the server. Validate that the authenticated customer owns each requested watch, reminder or alert; never trust a customer ID supplied by the browser. Test direct-ID access between two accounts.

Protect cron/admin routes, validate inputs, redact logs and implement watchlist deletion/retention. Keep shared public record data separate from private customer annotations.

Add an admin health view or report: last complete feed coverage, last successful lookup refresh, backlog, failures, scanned record count, matched count and delivery failures. Alert the operator in-app/logs when runs are stale. Avoid per-customer AI-agent cron runs when a deterministic scheduled task can do the work.

Feature flags should separately control lookup, reminders, application monitoring and live email.

### 10. Automated tests and verification evidence

Use three separate evidence layers:
1. Synthetic fixtures for deterministic edge cases. Label them synthetic.
2. Official-record snapshots captured on a stated date for adapter tests.
3. Live manual comparisons with USPTO. Never present fixture tests as proof of live access or real-world match accuracy.

Tests must include:
- Valid serial and registration identifiers, invalid input, missing record and wrong identifier type.
- Pending, active, dead, multiple-owner, name-change and Madrid records.
- Missing dates, provider outage, rate limiting, malformed response, stale cache and unavailable key.
- Section 8, Sections 8/9, Section 71, accepted/pending maintenance, grace periods, holiday/weekend and leap-day date cases.
- Six-month boundary, mark added late, overdue mark, paused watch, changed deadline, repeated jobs and notification failures.
- Exact/spacing/typo/phonetic candidate pairs, short/common-name negatives and goods/services context.
- Duplicate source file, out-of-order feed, corrected record, delayed ingestion, partial failure and restart catch-up.
- Tenant isolation, unauthenticated requests, protected scheduled route, escaped provider text and no secret in the browser bundle.
- Existing get-started/Stripe TEST and chatbot regression smoke tests, plus desktop/mobile contrast and keyboard usability if UI changes.

Create a human-labeled candidate benchmark with at least 30 pairs covering positives, borderline cases and hard negatives. Keep tuning and holdout examples separate. Record reviewer labels and disagreement. Calculate precision/recall against these human review labels, not "true legal infringement".

Use a provisional launch target of at least 80% precision and 80% recall on the labeled holdout review set, with exact counts, exclusions and dataset size reported. These are engineering targets, not legal guarantees; a small benchmark is not proof of nationwide coverage. If missed, keep alerts in review/beta mode and show the failing examples.

### 11. How I will personally check correctness

Create a verification table containing at least ten real official records covering the supported cases. If a category cannot be found, mark it unverified rather than inventing one.

For every sample:
- Record identifier/type, checked time and official source URL.
- Open USPTO TSDR independently. Compare mark, owner(s), status/date, registration date, goods/services and classes.
- Open the Maintenance tab and compare filing type and next deadline. For calculated fields, show the exact inputs/rule and official reference.
- For a candidate alert, independently open the candidate record, verify that its serial number, mark and filing date are real, and inspect its source-feed entry and comparison reason.
- Mark each field PASS/FAIL/UNVERIFIED. Explain changes caused by snapshots taken at different times.

For date/reminder tests, use a controlled clock and dry-run outbox. Show that just before the trigger there is no reminder, on the trigger there is exactly one, and another run does not create a duplicate. Do not wait six months or send real customer mail.

For matching, inject a clearly labeled synthetic feed to prove pipeline behavior. Separately verify a real feed ingestion. Never call injected candidates "real new filings".

"The page loads" is not a pass. Correctness means the values match official records, the date rules pass tests, the data coverage is known, and an interrupted job can recover without losing records or repeating alerts.

### 12. Delivery and definition of done

Deliver in this order:
A. Truthful wording and a documented data-access proof.
B. Lookup, secure watchlists and official-source evidence.
C. Deadline logic and dry-run reminders.
D. Verified new-application ingestion, matching and in-app alerts.
E. Live email only after my separate approval.

Before merge:
- Run the repo-required build/lint, type checks and new unit/integration tests. Record exact commands/results.
- Review the diff for unrelated edits, secrets, customer data and fake production fixtures.
- Document setup, secure environment variable names, scheduler configuration, data migrations, restart/catch-up, rollback, source limitations and estimated operating costs from actual sample measurements.
- Give an explicit table: Built and tested / Built but blocked / Not built. State which environment and commit were tested.
- Open a PR to main. Review and pass checks; merge through the normal repository workflow when authorized. Never bypass protections.
- Verify the remote main commit contains the intended files, not just a local branch. Verify deployment status separately; merged code is not proof that backend migrations, schedules or live integrations are configured.
- Keep new registry claims and customer-facing alerts disabled until live acceptance checks pass.

Return the commit/PR links, test evidence, unresolved limitations and the exact remaining setup steps. Do not describe a mock, screenshot, passing build or simulated alert as a fully working monitoring service.

## Prompt ends here

## Plain-language owner checklist

The finished feature should answer three questions:
1. What does USPTO officially say about my trademark?
2. What required filing is next, and when should I act?
3. Has the official application data gained a potentially similar name worth reviewing?

To check it:
1. Pick real records from USPTO, not just names generated by the app.
2. Compare the displayed owner, status and dates with TSDR.
3. Compare the deadline with TSDR's Maintenance tab.
4. Move the test clock to six months before the deadline and check exactly one dry-run reminder.
5. Open every sampled match's official record and inspect why it was flagged.
6. Run the same feed twice and confirm no duplicate alerts.
7. Simulate USPTO downtime: expect a delay warning, not a clean "no matches".
8. Sign in as another test customer and confirm private watchlists cannot be accessed.

Important: a similar name is a review candidate, not proof of infringement. An official data source can also have delivery lag; the app must disclose what period it actually checked.
