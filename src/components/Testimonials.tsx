const TESTIMONIALS = [
  {
    quote:
      "Placeholder testimonial — replace with the real customer quote from the current site.",
    initials: "SK",
    name: "Sarah K.",
    role: "DTC Apparel Founder · 8 marks",
  },
  {
    quote:
      "Placeholder testimonial — replace with the real customer quote from the current site.",
    initials: "ML",
    name: "Marcus L.",
    role: "Founder, Consumer Electronics · 12 marks",
  },
  {
    quote:
      "Placeholder testimonial — replace with the real customer quote from the current site.",
    initials: "JR",
    name: "Jamie R.",
    role: "VP Brand, E-commerce Co.",
  },
];

function Stars() {
  return (
    <div className="mb-3 flex gap-0.5 text-brand-magenta" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <blockquote
          key={t.name}
          className="rounded-lg border border-brand-primary/20 bg-brand-white p-6"
        >
          <Stars />
          <p className="text-sm italic text-brand-dark">&ldquo;{t.quote}&rdquo;</p>
          <footer className="mt-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-brand-white">
              {t.initials}
            </span>
            <span>
              <span className="block text-xs font-semibold text-brand-dark">
                {t.name}
              </span>
              <span className="block text-xs text-brand-dark/60">
                {t.role}
              </span>
            </span>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
