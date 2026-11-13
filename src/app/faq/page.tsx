import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";
import FAQList from "@/components/FAQList";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description: "Answers to common questions about trademark monitoring and enforcement.",
  path: "/faq/",
});

const FAQS = [
  {
    question: "What is trademark monitoring?",
    answer:
      "It's the ongoing practice of watching marketplaces, social platforms, domains, and the broader web for uses of your brand that could infringe on your trademark or copyright, so you can act before the damage spreads.",
  },
  {
    question: "How much does trademark monitoring cost?",
    answer:
      "Plans start at $149 per mark, per month for monitoring and alerts, or $199 per mark, per month if you want us to also draft and submit enforcement on your behalf. Rates drop automatically as you add more marks.",
  },
  {
    question: "What sources do you monitor?",
    answer:
      "Major marketplaces, social platforms, domain registries, paid ad networks, and the open web, all checked on a regular schedule.",
  },
  {
    question: "How quickly do I get my first report?",
    answer: "Within 24 hours of signing up.",
  },
  {
    question: "What does enforcement actually include?",
    answer:
      "On our enforcement plan, we draft the cease-and-desist letter, DMCA notice, or takedown request, find the infringer's contact details, and submit it once you approve.",
  },
  {
    question: "Do I need a registered trademark to use the service?",
    answer:
      "No, we can monitor brand names and marks even before a registration is finalized.",
  },
  {
    question: "How is this different from an attorney-led watch service?",
    answer:
      "An attorney-led watch service typically flags new filings and leaves the interpretation and next steps to you, often at an hourly rate. We monitor far more channels, add a plain-English verdict to every alert, and can handle the enforcement itself.",
  },
  {
    question: "Do you work with law firms and IP attorneys?",
    answer:
      "Yes, we offer white-label monitoring for law firms, with volume pricing and reports delivered under your firm's brand.",
  },
  {
    question: "How do you decide what is actually a threat?",
    answer:
      "Every hit is scored for genuine conflict risk using a combination of automated analysis and review, then labeled Act Now, Watch, or All Clear.",
  },
  {
    question: "Can I cancel or change plans?",
    answer:
      "Yes, there's no contract on monthly plans. You can cancel, pause, or switch plans at any time.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Section>
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-dark">
            Still have a question after reading these? Reach out and we&apos;ll
            answer it directly.
          </p>
        </div>
        <div className="mt-10">
          <FAQList items={FAQS} />
        </div>
      </Section>

      <Section>
        <div className="rounded-lg bg-brand-dark px-6 py-12 text-center sm:px-12">
          <h2 className="font-heading text-2xl font-bold text-brand-white sm:text-3xl">
            Still have a question?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/contact/">Contact Us</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
