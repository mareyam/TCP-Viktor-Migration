import Button from "./Button";

export default function CTA() {
  return (
    <div className="bg-brand-primary py-16 text-center text-brand-white">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-cream/80">
          — What Clients Say
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          Your brand is worth protecting. Start today.
        </h2>
        <p className="mt-2 font-heading text-xl italic text-brand-cream">
          Let us make that effortless.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-brand-cream/90">
          Join brand owners who&apos;ve replaced complexity and high attorney
          fees with clear, confident trademark and IP protection.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/get-started/" variant="secondary">
            Protect my brand →
          </Button>
          <Button href="/book-a-demo/" variant="secondary">
            Book a 30-min demo
          </Button>
        </div>
        <p className="mt-4 text-sm text-brand-cream/80">
          No setup fee · Cancel anytime · We act on your behalf
        </p>
      </div>
    </div>
  );
}
