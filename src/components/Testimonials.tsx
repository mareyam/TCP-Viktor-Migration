const TESTIMONIALS = [
  {
    quote:
      "Placeholder testimonial — replace with the real customer quote from the current site.",
    author: "DTC Apparel Founder · 8 marks",
  },
  {
    quote:
      "Placeholder testimonial — replace with the real customer quote from the current site.",
    author: "Founder, Consumer Electronics · 12 marks",
  },
  {
    quote:
      "Placeholder testimonial — replace with the real customer quote from the current site.",
    author: "VP Brand, E-commerce Co.",
  },
];

export default function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <blockquote
          key={t.author}
          className="rounded-lg border border-brand-primary/20 bg-brand-white p-6"
        >
          <p className="text-sm italic text-brand-dark">&ldquo;{t.quote}&rdquo;</p>
          <footer className="mt-4 text-xs font-semibold text-brand-primary">
            {t.author}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
