const TIERS = [
  { range: "1–2 trademarks", price: "$149", badge: "Standard rate", enforcePrice: "$199 for Watch + Enforce" },
  { range: "3–9 trademarks", price: "$125", badge: "Save $24/mark/mo", enforcePrice: "$175 for Watch + Enforce" },
  { range: "10+ trademarks", price: "$115", badge: "Best value", enforcePrice: "$159 for Watch + Enforce" },
];

export default function VolumeDiscountTiers() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TIERS.map((tier) => (
        <div
          key={tier.range}
          className="rounded-lg border border-brand-primary/15 bg-brand-white p-6 text-center"
        >
          <p className="text-xs uppercase tracking-wide text-brand-dark/60">
            {tier.range}
          </p>
          <p className="mt-2 font-heading text-3xl font-bold text-brand-primary">
            {tier.price}
          </p>
          <p className="text-xs text-brand-dark/60">per mark / month</p>
          <span className="mt-3 inline-block rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-white">
            {tier.badge}
          </span>
          <p className="mt-2 text-xs text-brand-dark/60">{tier.enforcePrice}</p>
        </div>
      ))}
    </div>
  );
}
