import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ProcessSteps from "@/components/ProcessSteps";
import FAQList from "@/components/FAQList";

export const metadata: Metadata = pageMetadata({
  title: "Brand Owners",
  description:
    "Everywhere counterfeiters and infringers target your brand, we're watching: marketplaces, social media, domains, and the open web.",
  path: "/brand-owners/",
});

const PROTECTION_AREAS = [
  {
    title: "Marketplaces",
    detail: "Amazon, Etsy, eBay, TikTok Shop, Temu, Walmart, and Alibaba.",
    cadence: "Weekly scan",
  },
  {
    title: "Social media",
    detail: "Instagram, TikTok, Facebook, X, YouTube, LinkedIn, and Pinterest.",
    cadence: "7 platforms",
  },
  {
    title: "Domains",
    detail:
      ".com, .net, .org, country codes, new extensions, and typosquats.",
    cadence: "1,000+ TLDs, daily",
  },
  {
    title: "Visual content",
    detail:
      "Product photos, brand logos, ad creatives, videos, and AI training data.",
    cadence: "Visual fingerprinting",
  },
  {
    title: "Paid advertising",
    detail:
      "Google Search, Google Shopping, Meta Ads, TikTok Ads, and brand keyword bidding.",
    cadence: "All major ad networks",
  },
];

const WANTS = [
  "Stop losing revenue to counterfeits",
  "Know your trademark is secure",
  "Have someone else deal with infringers",
  "See what's happening globally",
  "Catch fake social accounts early",
  "Only hear about what matters",
];

const STEPS = [
  {
    title: "We name the source",
    description: "Every threat is traced to exactly where it's coming from.",
  },
  {
    title: "We explain the risk",
    description:
      "A plain-English read on how serious it is and why it matters.",
  },
  {
    title: "We prepare the response",
    description: "The letter, takedown, or filing is drafted and ready.",
  },
  {
    title: "You approve, we execute",
    description: "One click and we handle the rest from there.",
  },
];

const FAQS = [
  {
    question: "How is this different from a trademark watch service?",
    answer:
      "A basic watch service tells you about new USPTO filings. We monitor marketplaces, social platforms, domains, visual content, and paid ads too, and we tell you what to do about each threat, not just that it exists.",
  },
  {
    question: "Do I need a lawyer to use this?",
    answer:
      "No. Most alerts can be handled with the templates we provide, or by approving the action and letting us submit it for you. For anything that needs a licensed attorney, we can connect you with one.",
  },
  {
    question: "What happens after I approve an action?",
    answer:
      "We send the letter, file the takedown, or submit the marketplace complaint, then follow up and keep you updated until the case is resolved.",
  },
];

export default function BrandOwnersPage() {
  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
            For Brand Owners · Trademark · Copyright · IP
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
            Your brand, watched everywhere it can be copied.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-dark">
            Counterfeiters and infringers don&apos;t stick to one channel, so
            neither do we. We cover marketplaces, social platforms, domains,
            and the open web, every single week.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/get-started/">Protect My Brand →</Button>
            <Button href="/pricing/" variant="secondary">
              See Pricing
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          What we protect you from
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          Every place infringers target your brand, checked on a schedule.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROTECTION_AREAS.map((area) => (
            <div
              key={area.title}
              className="rounded-lg border border-brand-primary/15 bg-brand-cream p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
                {area.cadence}
              </p>
              <h3 className="mt-2 font-heading text-lg font-bold text-brand-dark">
                {area.title}
              </h3>
              <p className="mt-2 text-sm text-brand-dark">{area.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          What brand owners actually want
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WANTS.map((want) => (
            <div
              key={want}
              className="rounded-lg border border-brand-primary/15 bg-brand-white p-6"
            >
              <p className="font-heading font-semibold text-brand-dark">
                {want}
              </p>
            </div>
          ))}
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
              — Your Weekly Report
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark">
              One report. Every threat, already sorted.
            </h2>
            <p className="mt-4 text-brand-dark">
              Each week you get a single report that names every threat,
              scores how serious it is, and tells you exactly what we&apos;d
              recommend doing next.
            </p>
            <div className="mt-8">
              <ProcessSteps steps={STEPS} />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Common questions
        </h2>
        <div className="mt-10">
          <FAQList items={FAQS} />
        </div>
      </Section>

      <Section>
        <div className="rounded-lg bg-brand-dark px-6 py-12 text-center sm:px-12">
          <h2 className="font-heading text-2xl font-bold text-brand-white sm:text-3xl">
            Start protecting your brand today
          </h2>
          <p className="mt-3 text-brand-cream">
            Plans start at $149/month per mark, with no setup fees.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/get-started/">Get Started →</Button>
            <Button href="/pricing/" variant="secondary">
              View Pricing
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
