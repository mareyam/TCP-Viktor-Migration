import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ProcessSteps from "@/components/ProcessSteps";
import FAQList from "@/components/FAQList";

export const metadata: Metadata = pageMetadata({
  title: "How It Works",
  description:
    "From weekly scans to a plain-English verdict on every alert, here's exactly how Trademark Copyright Protection works.",
  path: "/how-it-works/",
});

const STEPS = [
  {
    title: "Tell us your brand",
    description:
      "Add your trademarks, logos, and the channels where your brand shows up.",
  },
  {
    title: "We scan every week",
    description:
      "Marketplaces, social platforms, domains, and the open web, checked on a weekly cycle.",
  },
  {
    title: "Every alert gets a verdict",
    description:
      "Each hit is scored for genuine conflict risk and labeled in plain English.",
  },
  {
    title: "Your report lands",
    description:
      "One report, every threat already sorted, delivered on a predictable schedule.",
  },
];

const VERDICTS = [
  {
    label: "Act Now",
    description:
      "A real threat with a deadline attached. Something needs a response soon.",
  },
  {
    label: "Watch",
    description:
      "Something's there, but it's not urgent yet. We'll keep an eye on it.",
  },
  {
    label: "All Clear",
    description: "We checked it and it's fine. No action needed.",
  },
];

const SOURCES = [
  { title: "Websites", cadence: "Weekly scan" },
  { title: "Marketplaces", cadence: "7 platforms" },
  { title: "Social & ads", cadence: "9 platforms" },
  { title: "Domains & content", cadence: "Daily domain scan" },
];

const FAQS = [
  {
    question: "How often do you scan?",
    answer:
      "Most channels are scanned weekly, and domains are checked daily. Urgent threats trigger an immediate alert outside the normal schedule.",
  },
  {
    question: "What happens after I approve an action?",
    answer:
      "We send the letter, submit the takedown, or file the complaint, then follow up on it until the case is resolved.",
  },
  {
    question: "Can I change what's monitored?",
    answer:
      "Yes, you can add or remove marks and channels at any time from your account.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            — The Process
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
            You&apos;re covered.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-dark">
            From the moment you add a trademark, here&apos;s exactly what
            happens behind the scenes.
          </p>
        </div>
        <div className="mt-10">
          <ProcessSteps steps={STEPS} />
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          The verdict system
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          Every alert gets one of three plain-English verdicts, so you always
          know where you stand.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {VERDICTS.map((verdict) => (
            <div
              key={verdict.label}
              className="rounded-lg border border-brand-primary/15 bg-brand-cream p-6 text-center"
            >
              <p className="font-heading text-lg font-bold text-brand-primary">
                {verdict.label}
              </p>
              <p className="mt-2 text-sm text-brand-dark">
                {verdict.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Every source we monitor
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SOURCES.map((source) => (
            <div
              key={source.title}
              className="rounded-lg border border-brand-primary/15 bg-brand-white p-6 text-center"
            >
              <p className="font-heading text-lg font-bold text-brand-dark">
                {source.title}
              </p>
              <p className="mt-1 text-xs text-brand-primary">
                {source.cadence}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          FAQ
        </h2>
        <div className="mt-10">
          <FAQList items={FAQS} />
        </div>
      </Section>

      <Section>
        <div className="rounded-lg bg-brand-dark px-6 py-12 text-center sm:px-12">
          <h2 className="font-heading text-2xl font-bold text-brand-white sm:text-3xl">
            Ready when you are
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/get-started/">Get Started →</Button>
            <Button href="/book-a-demo/" variant="secondary">
              Book a Demo
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
