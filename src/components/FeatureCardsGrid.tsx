const FEATURES = [
  {
    title: "Weekly brand scan",
    description:
      "Every week we check marketplaces, social platforms, domains, and the open web for your brand, and roll it all into one clear report.",
  },
  {
    title: "Clear, actionable reports",
    description:
      "Every alert comes with a plain-English verdict — Act Now, Watch, or Ignore — plus a recommended next step. No legal jargon.",
  },
  {
    title: "Deadline tracking",
    description:
      "Section 8, Section 9, renewals, and every other maintenance deadline, tracked automatically with reminders well ahead of time.",
  },
  {
    title: "Domain monitoring",
    description:
      "Thousands of domain extensions watched for typosquats, brand-name registrations, and lookalike domains before they cause damage.",
  },
  {
    title: "Social media watch",
    description:
      "Impersonation accounts and unauthorized use of your brand name across the major social platforms, found and flagged.",
  },
  {
    title: "Lookalike website watch",
    description:
      "Copycat stores and fake sites using your brand name, found and checked before you decide what to do about them.",
  },
  {
    title: "Ready-to-use templates",
    description:
      "Cease-and-desist letters, DMCA notices, and platform takedown requests — pre-filled and ready to send for every type of infringement.",
  },
  {
    title: "We act on your behalf",
    description:
      "Don't want to handle it yourself? Approve the recommended action and we take care of the filings, notices, and takedowns for you.",
  },
];

export default function FeatureCardsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((feature) => (
        <div
          key={feature.title}
          className="rounded-lg border border-brand-primary/15 bg-brand-cream p-6"
        >
          <h3 className="font-heading text-lg font-bold text-brand-dark">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-brand-dark">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
