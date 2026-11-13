import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ProcessSteps from "@/components/ProcessSteps";
import FAQList from "@/components/FAQList";

export const metadata: Metadata = pageMetadata({
  title: "Law Firms",
  description:
    "White-label trademark monitoring for law firms and IP practices. You set the price and keep the margin, we do the monitoring work.",
  path: "/law-firms/",
});

const GROWTH_REASONS = [
  {
    title: "Recurring revenue from marks you already filed",
    description:
      "Offer ongoing monitoring to existing clients and earn a monthly fee for work you're not doing yourself.",
  },
  {
    title: "Real threats become billable legal work",
    description:
      "When monitoring surfaces a genuine conflict, it's a natural opening for the legal work your firm already does.",
  },
  {
    title: "Stay visible between filing and renewal",
    description:
      "A weekly report keeps your name in front of clients long after the initial filing is done.",
  },
];

const WE_DO = [
  "Monitor marketplaces, social platforms, and domains",
  "Score every hit for genuine conflict risk",
  "Prepare evidence packages you can act on",
  "Draft notices ready for your review",
  "Deliver reports under your firm's brand",
];

const YOU_DO = [
  "Review flagged conflicts",
  "Make the legal judgment calls",
  "Decide what action to take",
  "Bill your clients for the work",
];

const STEPS = [
  {
    title: "Choose your clients",
    description: "Pick which client marks you want enrolled in monitoring.",
  },
  {
    title: "We monitor and report",
    description:
      "We run the weekly scans and deliver reports under your firm's brand.",
  },
  {
    title: "You review and bill",
    description:
      "You make the legal calls on flagged conflicts and bill accordingly.",
  },
];

const FAQS = [
  {
    question: "Can reports go out under our firm's name?",
    answer:
      "Yes, reports are white-labeled so your clients see your firm's brand, not ours.",
  },
  {
    question: "What do we actually have to do?",
    answer:
      "We handle the monitoring, scoring, and evidence gathering. Your team reviews flagged conflicts and makes the legal calls, which is where your billable work comes in.",
  },
  {
    question: "How is pricing structured for firms?",
    answer:
      "Volume pricing applies once you pass a minimum number of enrolled marks, and you set your own client-facing price. Book a demo and we'll build a plan around your portfolio.",
  },
];

export default function LawFirmsPage() {
  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
            For Law Firms
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
            Add a recurring revenue line. We do the monitoring.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-dark">
            Your price. Your margin. Our work. White-label trademark
            monitoring for law firms and IP practices, built to run in the
            background of your existing client relationships.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/book-a-demo/">Book a Demo →</Button>
            <Button href="/contact/" variant="secondary">
              Talk to Us
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Three ways monitoring grows your practice
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {GROWTH_REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-lg border border-brand-primary/15 bg-brand-cream p-6"
            >
              <h3 className="font-heading text-lg font-bold text-brand-dark">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-brand-dark">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          We do the monitoring. You make the legal calls.
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="rounded-lg border border-brand-primary/20 bg-brand-white p-8">
            <h3 className="font-heading text-lg font-bold text-brand-primary">
              All of the monitoring work
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark">
              {WE_DO.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-brand-primary/20 bg-brand-white p-8">
            <h3 className="font-heading text-lg font-bold text-brand-magenta">
              Only the legal judgment
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark">
              {YOU_DO.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/weekly-report-mockup-tcp.png"
            alt="Weekly brand protection report"
            width={960}
            height={720}
            className="w-full rounded-lg border border-brand-primary/10"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
              — For Your Clients
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark">
              Every threat, scored and sorted, under your firm&apos;s name.
            </h2>
            <p className="mt-4 text-brand-dark">
              Clients get a weekly report with every flagged issue already
              scored and explained. Your team only needs to weigh in on the
              ones that genuinely need legal judgment.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Up and running in three steps
        </h2>
        <div className="mt-10">
          <ProcessSteps steps={STEPS} />
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Questions attorneys ask
        </h2>
        <div className="mt-10">
          <FAQList items={FAQS} />
        </div>
      </Section>

      <Section>
        <div className="rounded-lg bg-brand-dark px-6 py-12 text-center sm:px-12">
          <h2 className="font-heading text-2xl font-bold text-brand-white sm:text-3xl">
            See what monitoring could add to your firm
          </h2>
          <p className="mt-3 text-brand-cream">
            Book a 30-minute call and we&apos;ll build a plan around your
            portfolio.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/book-a-demo/">Book a Demo →</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
