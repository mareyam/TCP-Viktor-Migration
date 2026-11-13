const SUMMARY = [
  { count: 1, label: "Act Now" },
  { count: 2, label: "Watch" },
  { count: 4, label: "All Clear" },
];

const ALERTS = [
  {
    tone: "action",
    title: "New USPTO filing flagged",
    body: "A phonetically similar mark was filed in the same class. Opposition window is open.",
  },
  {
    tone: "watch",
    title: "Lookalike domain registered",
    body: "A typosquat domain was registered recently. No live site yet — we're watching it.",
  },
  {
    tone: "clear",
    title: "Unrelated filing, different class",
    body: "No conflict with your registration. No action needed.",
  },
];

const TONE_STYLES: Record<string, string> = {
  action: "border-brand-magenta bg-brand-magenta/5",
  watch: "border-brand-accent bg-brand-accent/5",
  clear: "border-brand-primary/20 bg-brand-cream",
};

export default function WeeklyReportMockup() {
  return (
    <div className="overflow-hidden rounded-lg border border-brand-primary/20 bg-brand-white shadow-sm">
      <div className="bg-brand-dark px-4 py-2 text-xs font-semibold text-brand-white">
        trademarkcopyrightprotection.com — Weekly Report
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          Weekly Brand Protection Report
        </p>
        <div className="mt-4 flex gap-8">
          {SUMMARY.map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-heading text-2xl font-bold text-brand-dark">
                {item.count}
              </p>
              <p className="text-xs text-brand-dark/70">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {ALERTS.map((alert) => (
            <div
              key={alert.title}
              className={`rounded-md border p-4 ${TONE_STYLES[alert.tone]}`}
            >
              <p className="text-sm font-semibold text-brand-dark">
                {alert.title}
              </p>
              <p className="mt-1 text-xs text-brand-dark">{alert.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
