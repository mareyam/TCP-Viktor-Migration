# Wording audit

Checked: 2026-11-16, against the source in this repository. The new USPTO feature is not described on the public site.

## Changed

| Location | Previous claim | Replacement |
| --- | --- | --- |
| `src/components/FeatureCardsGrid.tsx` | “Section 8, Section 9, renewals, and every other maintenance deadline, tracked automatically with reminders well ahead of time.” | Weekly-report wording about online listings, domains, and social accounts. |
| `src/app/brand-owners/page.tsx` | “Trademark maintenance has strict deadlines. We track every one and alert you months in advance.” | The weekly report lists online uses of the brand. |
| `src/app/brand-owners/page.tsx` | “Competitors file lookalike marks abroad, squatters register your name in foreign domains. We cover all of it.” | Marketplaces, social platforms, domains, and the open web. |
| `src/content/posts/what-is-trademark-monitoring-and-why-does-it-matter.mdx` description | Scanning “across registries, domains, social media, and marketplaces.” | Domains, social media, and marketplaces. The post body is still the migration placeholder. |

## Searched and not found

- The phrase “240+” does not appear in `src/` or `docs/` except this audit and the implementation prompt’s instruction to remove it.
- No page says the new US record watch, maintenance reminders, or similar-name application alerts are available.
- No JSON-LD / structured-data block was found under `src/`.

## Reviewed and left as they are

| Location | Why it stayed |
| --- | --- |
| `src/app/law-firms/page.tsx` FAQ “Does it replace registry watching?” | The answer says no. Registry watching flags new filings; TCP monitors marketplaces, websites, and social channels. |
| `src/app/faq/page.tsx` comparison with an attorney-led watch | Describes the attorney service, then says TCP monitors more online channels. |
| `src/app/brand-owners/page.tsx` “Global platform monitoring” | The same card lists marketplaces, social networks, and domains, not foreign trademark registries. |
| `src/app/privacy-policy/page.tsx` mention of public sources “such as trademark registries” | This is a privacy disclosure of a possible source, not a product claim. It was not narrowed without a legal review. |
| `src/components/ComparisonBars.tsx` “USPTO + limited watch” | Label for a competitor column. |
| Enforcement lines that say “infringer” | They describe the existing online enforcement plan. They were not rewritten into the new application-alert wording. Application alerts, when they exist, must say “potential match.” |

## Chatbot

The site loads an external widget from `https://confident-mastiff-102.convex.site/chat/widget.js?v=3` in `src/app/layout.tsx`. The widget file fetched on 2026-11-16 does not contain “240” or “Section 8”. Its comment says the same script is also injected on the WordPress site by a WPCode snippet, and that Convex generates it from a file that is not in this repository.

No chatbot knowledge base is stored here. A text change in this repo does not change chatbot answers. The WordPress site and the Convex service were not edited. If that knowledge base still says “240+ registries,” renewal reminders, opposition monitoring, or registration-number lookup, the update has to be made in the Convex/WordPress source that feeds the widget.
