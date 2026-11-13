import Button from "./Button";

type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaHref: string;
  ctaLabel: string;
  highlighted?: boolean;
};

export default function PricingCard({
  name,
  price,
  description,
  features,
  ctaHref,
  ctaLabel,
  highlighted,
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col rounded-lg border p-8 ${
        highlighted
          ? "border-brand-primary bg-brand-white shadow-lg"
          : "border-brand-primary/20 bg-brand-white"
      }`}
    >
      <h3 className="font-heading text-xl font-bold text-brand-dark">{name}</h3>
      <p className="mt-2 text-3xl font-bold text-brand-primary">{price}</p>
      <p className="mt-3 text-sm text-brand-dark">{description}</p>
      <ul className="mt-6 flex-1 space-y-2 text-sm text-brand-dark">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span aria-hidden className="text-brand-primary">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button href={ctaHref}>{ctaLabel}</Button>
      </div>
    </div>
  );
}
