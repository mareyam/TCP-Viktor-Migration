import Button from "./Button";

type Plan = {
  eyebrow: string;
  title: string;
  description: string;
  price?: string;
  priceNote?: string;
  ctaHref: string;
  ctaLabel: string;
  ctaVariant?: "primary" | "secondary";
};

const PLANS: Plan[] = [
  {
    eyebrow: "Watch",
    title: "Know the moment your brand is copied.",
    description:
      "We monitor marketplaces, social media, domains, and the open web, and send a weekly report plus immediate alerts for anything urgent.",
    price: "$149",
    priceNote: "/ month per mark",
    ctaHref: "/get-started/?plan=watch",
    ctaLabel: "Start with Watch →",
    ctaVariant: "secondary",
  },
  {
    eyebrow: "Watch + Enforce",
    title: "We find it and help shut it down.",
    description:
      "Everything in Watch, plus we draft the enforcement letter, find the infringer's contact details, and submit takedowns once you approve.",
    price: "$199",
    priceNote: "/ month per mark",
    ctaHref: "/get-started/?plan=enforce",
    ctaLabel: "Start with Watch + Enforce →",
    ctaVariant: "secondary",
  },
  {
    eyebrow: "For Law Firms",
    title: "Managing trademarks for many clients?",
    description:
      "White-label monitoring for law firms and IP practices, with volume pricing built around your portfolio.",
    ctaHref: "/book-a-demo/",
    ctaLabel: "Book a Demo →",
    ctaVariant: "primary",
  },
];

export default function PlansDark() {
  return (
    <div className="bg-brand-dark py-16 text-brand-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {PLANS.map((plan) => (
          <div key={plan.eyebrow}>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
              — {plan.eyebrow}
            </p>
            <h3 className="mt-3 font-heading text-2xl font-bold">
              {plan.title}
            </h3>
            <p className="mt-3 text-sm text-brand-cream/90">
              {plan.description}
            </p>
            {plan.price && (
              <p className="mt-6 font-heading text-4xl font-bold">
                {plan.price}
                <span className="ml-1 text-sm font-normal text-brand-cream/80">
                  {plan.priceNote}
                </span>
              </p>
            )}
            <div className="mt-6">
              <Button href={plan.ctaHref} variant={plan.ctaVariant}>
                {plan.ctaLabel}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
