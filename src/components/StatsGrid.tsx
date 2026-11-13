const STATS = [
  { value: "4M+", label: "Active US trademarks that deserve better protection" },
  { value: "$351", label: "Average monthly savings per mark vs. attorney-led monitoring" },
  { value: "4", label: "Scan types: trademark, design, face misuse, and content" },
  { value: "Weekly", label: "A fresh scan of your brand, every single week" },
];

export default function StatsGrid() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-6">
      {STATS.map((stat) => (
        <div key={stat.label}>
          <p className="font-heading text-3xl font-bold text-brand-white">
            {stat.value}
          </p>
          <p className="mt-1 text-xs text-brand-cream/80">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
