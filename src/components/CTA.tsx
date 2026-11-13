import Section from "./Section";
import Button from "./Button";

export default function CTA() {
  return (
    <Section>
      <div className="rounded-lg bg-brand-dark px-6 py-10 text-center sm:px-12">
        <h2 className="font-heading text-2xl font-bold text-brand-white sm:text-3xl">
          Ready to protect your brand?
        </h2>
        <p className="mt-3 text-brand-cream">
          Get started or book a demo to see how we can help.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button href="/get-started/">Get Started</Button>
          <Button href="/book-a-demo/" variant="secondary">
            Book a Demo
          </Button>
        </div>
      </div>
    </Section>
  );
}
