const TIERS = [
  { range: "1–2 trademarks", price: "$149", note: "Standard rate" },
  { range: "3–9 trademarks", price: "$125", note: "Volume discount" },
  { range: "10+ trademarks", price: "$115", note: "Firm-level rate" },
];

export default function VolumeDiscountTiers() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TIERS.map((tier) => (
        <div
          key={tier.range}
          className="rounded-lg border border-brand-primary/15 bg-brand-white p-6 text-center"
        >
          <p className="text-sm font-semibold text-brand-dark">{tier.range}</p>
          <p className="mt-2 font-heading text-3xl font-bold text-brand-primary">
            {tier.price}
          </p>
          <p className="text-xs text-brand-dark/60">per mark, per month</p>
          <p className="mt-2 text-xs font-semibold text-brand-magenta">
            {tier.note}
          </p>
        </div>
      ))}
    </div>
  );
}
