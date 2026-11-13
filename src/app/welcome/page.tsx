import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = pageMetadata({
  title: "Welcome",
  description: "You're all set. Here's what happens next.",
  path: "/welcome/",
});

const NEXT_STEPS = [
  {
    title: "We start scanning",
    description:
      "Your first scan across marketplaces, social platforms, and domains kicks off right away.",
  },
  {
    title: "Your first report",
    description:
      "You'll receive your first weekly report within 24 hours of signing up.",
  },
  {
    title: "You stay in control",
    description:
      "Every alert comes with a recommendation. Nothing gets sent on your behalf without your approval.",
  },
];

export default function WelcomePage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
          You&apos;re all set.
        </h1>
        <p className="mt-4 text-brand-dark">
          Thanks for signing up. Your account is being set up and monitoring
          will begin shortly.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-6">
        <h2 className="text-center font-heading text-2xl font-bold text-brand-dark">
          What happens next
        </h2>
        {NEXT_STEPS.map((step, index) => (
          <div
            key={step.title}
            className="flex gap-4 rounded-lg border border-brand-primary/15 bg-brand-cream p-6"
          >
            <span className="font-heading text-xl font-bold text-brand-primary">
              {index + 1}
            </span>
            <div>
              <h3 className="font-heading font-bold text-brand-dark">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-brand-dark">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/">Back to Home</Button>
      </div>
    </Section>
  );
}
