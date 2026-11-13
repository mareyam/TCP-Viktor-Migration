type Row = {
  label: string;
  tcp: string;
  competitor: string;
};

const ROWS: Row[] = [
  {
    label: "Coverage breadth",
    tcp: "Marketplaces · Social · Domains",
    competitor: "USPTO + limited watch",
  },
  {
    label: "Actionable guidance",
    tcp: "Act Now · Watch · Ignore + templates",
    competitor: "Raw data only",
  },
  {
    label: "Active enforcement",
    tcp: "We act on your behalf",
    competitor: "None",
  },
  {
    label: "Value for money",
    tcp: "$149/mo — full service",
    competitor: "$169–500/mo, less features",
  },
];

export default function ComparisonBars() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wide">
        <span className="flex items-center gap-2 text-brand-primary">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-primary" /> TCP
        </span>
        <span className="flex items-center gap-2 text-brand-dark/60">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-dark/20" /> Top
          Competitors
        </span>
      </div>
      <div className="space-y-6">
        {ROWS.map((row) => (
          <div key={row.label}>
            <p className="mb-2 text-sm font-semibold text-brand-dark">
              {row.label}
            </p>
            <div className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-brand-white">
              {row.tcp}
            </div>
            <div className="mt-1.5 inline-block rounded-md bg-brand-dark/10 px-4 py-2 text-sm font-medium text-brand-dark/80">
              {row.competitor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
