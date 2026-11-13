import { Fragment } from "react";

type Row = {
  label: string;
  watch: boolean | string;
  enforce: boolean | string;
};

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "Monitoring — what we watch every week",
    rows: [
      { label: "Lookalike websites & fake stores", watch: true, enforce: true },
      { label: "Amazon, Etsy, eBay, TikTok Shop, Temu", watch: true, enforce: true },
      { label: "Instagram, TikTok, Facebook, X, YouTube", watch: true, enforce: true },
      { label: "1,000+ domain extensions — daily", watch: true, enforce: true },
      { label: "Image & copyright content monitoring", watch: true, enforce: true },
      { label: "Google & Meta paid ad monitoring", watch: true, enforce: true },
    ],
  },
  {
    title: "Reporting — what you receive",
    rows: [
      { label: "Weekly threat report with plain-English verdicts", watch: true, enforce: true },
      { label: "Immediate alerts for urgent threats", watch: true, enforce: true },
      { label: "Ready-to-use enforcement templates", watch: true, enforce: true },
    ],
  },
  {
    title: "Enforcement — what we do for you",
    rows: [
      { label: "We draft the enforcement letter", watch: false, enforce: true },
      { label: "We find the infringer's contact information", watch: false, enforce: true },
      { label: "We submit on your behalf, with your approval", watch: false, enforce: true },
    ],
  },
  {
    title: "Service & speed",
    rows: [
      { label: "Support response time", watch: "24 hours", enforce: "4 hours" },
      { label: "First report delivered", watch: "Within 24 hours", enforce: "Within 24 hours" },
    ],
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-brand-dark">{value}</span>;
  }
  return value ? (
    <span className="text-brand-primary" aria-label="Included">
      ✓
    </span>
  ) : (
    <span className="text-brand-dark/30" aria-label="Not included">
      —
    </span>
  );
}

export default function PlanCheckTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-brand-primary/20 text-left">
            <th className="py-3 pr-4 font-heading text-brand-dark">Feature</th>
            <th className="py-3 px-4 text-center font-heading text-brand-dark">
              Watch
              <span className="block text-xs font-normal text-brand-dark/60">
                $149/mo
              </span>
            </th>
            <th className="py-3 px-4 text-center font-heading text-brand-primary">
              Watch + Enforce
              <span className="block text-xs font-normal text-brand-dark/60">
                $199/mo
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {GROUPS.map((group) => (
            <Fragment key={group.title}>
              <tr className="bg-brand-cream">
                <td colSpan={3} className="py-2 pr-4 font-semibold text-brand-dark">
                  {group.title}
                </td>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label} className="border-b border-brand-primary/10">
                  <td className="py-3 pr-4 text-brand-dark">{row.label}</td>
                  <td className="py-3 px-4 text-center">
                    <Cell value={row.watch} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Cell value={row.enforce} />
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
