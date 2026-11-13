import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ProcessSteps from "@/components/ProcessSteps";
import FAQList from "@/components/FAQList";
import SavingsCalculator from "@/components/SavingsCalculator";

export const metadata: Metadata = pageMetadata({
  title: "Brand Owners",
  description:
    "Your brand is being copied right now. Here's how we find it across every channel and shut it down before it costs you.",
  path: "/brand-owners/",
});

const COPY_METHODS = [
  {
    title: "Trademark conflicts",
    detail:
      "Someone files a mark that looks or sounds like yours. You typically have a short opposition window to act, and missing it can mean losing your recourse entirely.",
    tags: "Lookalike filings · fake stores · copycats",
  },
  {
    title: "Counterfeits & listing hijacks",
    detail:
      "Fake products sold under your brand name, your product photos lifted into counterfeit listings, and third-party sellers piggybacking on your listings with inferior goods.",
    tags: "Amazon · Etsy · eBay · TikTok Shop · Temu",
  },
  {
    title: "Fake accounts & impersonation",
    detail:
      "Social accounts using your name and logo to run scams, sell counterfeits, or deceive your customers, often for months before anyone notices.",
    tags: "Instagram · TikTok · Facebook · X · YouTube",
  },
  {
    title: "Stolen content & domain squatting",
    detail:
      "Your images, copy, and brand assets reused without permission on competitor sites and in AI training sets, plus your brand name registered as a domain before you need it.",
    tags: "1,000+ domains · open web · AI datasets",
  },
];

const COVERAGE = [
  { title: "Websites", detail: "Fake stores, copycat sites, lookalike domains", cadence: "Weekly scan" },
  { title: "Marketplaces", detail: "Amazon, Etsy, eBay, TikTok Shop, Temu, Walmart", cadence: "7 platforms" },
  { title: "Social media", detail: "Instagram, TikTok, Facebook, X, YouTube", cadence: "7 platforms" },
  { title: "Domains", detail: ".com, .net, .org, country codes, typosquats", cadence: "1,000+ TLDs, daily" },
  { title: "Images & content", detail: "Product photos, logos, ad creatives, video", cadence: "Visual fingerprinting" },
  { title: "Paid ads", detail: "Google Search, Google Shopping, Meta, TikTok", cadence: "All major ad networks" },
];

const OUTCOMES = [
  {
    title: "Stop losing revenue to counterfeits",
    detail:
      "Every fake product sold under your name is money you'll never recover. We find and flag counterfeit listings every week, across every major marketplace.",
  },
  {
    title: "Know your trademark is secure",
    detail:
      "Trademark maintenance has strict deadlines. We track every one and alert you months in advance, no surprises.",
  },
  {
    title: "Have someone else deal with infringers",
    detail:
      "Sending letters and filing takedowns isn't why you started a business. Approve our recommendation and we handle every step.",
  },
  {
    title: "See what's happening globally",
    detail:
      "Competitors file lookalike marks abroad, squatters register your name in foreign domains. We cover all of it.",
  },
  {
    title: "Catch fake social accounts early",
    detail:
      "Impersonation accounts can run for months before you notice. Early detection makes all the difference.",
  },
  {
    title: "Only hear about what matters",
    detail:
      "Not every similar domain is a real threat. We separate genuine risks from noise so you only deal with what counts.",
  },
];

const STEPS = [
  {
    title: "We name the source",
    description:
      "Every alert specifies exactly where it was found, not a vague description.",
  },
  {
    title: "We explain the risk",
    description:
      "A plain-English read on whether it's serious, worth watching, or safe to ignore.",
  },
  {
    title: "We prepare the response",
    description: "The filing, letter, or takedown notice, drafted and ready.",
  },
  {
    title: "You approve, we execute",
    description:
      "One click to approve. We submit, follow up, and confirm resolution.",
  },
];

const FAQS = [
  {
    question: "Do I need a registered trademark to use TCP?",
    answer:
      "No, we can monitor a brand name or mark even before registration is complete.",
  },
  {
    question: "What does \"we act on your behalf\" mean exactly?",
    answer:
      "Once you approve a recommended action, we send the letter, submit the takedown, or file the complaint ourselves, and follow up until it's resolved.",
  },
  {
    question: "How is this different from Amazon Brand Registry?",
    answer:
      "Brand Registry only covers Amazon. We monitor marketplaces, social platforms, domains, paid ads, and the open web, all in one place, with a recommendation on every alert.",
  },
];

export default function BrandOwnersPage() {
  return (
    <>
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-primary">
              For Brand Owners · Trademark · Copyright · IP
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
              Your brand is being{" "}
              <span className="text-brand-primary italic">copied right now.</span>
            </h1>
            <p className="mt-2 font-heading text-2xl font-bold text-brand-dark">
              Here&apos;s how we stop it.
            </p>
            <p className="mt-4 text-brand-dark">
              Fake accounts, counterfeit listings, lookalike trademarks, stolen
              content. We monitor every place your brand lives, and shut
              threats down before they become expensive problems.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/get-started/">Protect My Brand →</Button>
              <Button href="/weekly-brand-protection/" variant="secondary">
                See a Sample Report
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium text-brand-dark">
              <span>✓ We act on your behalf</span>
              <span>✓ Plain English, always</span>
            </div>
          </div>
          <Image
            src="/images/home_hero-768x512.png"
            alt="Brand protection dashboard"
            width={768}
            height={512}
            className="w-full rounded-lg"
          />
        </div>
      </Section>

      <div className="bg-brand-dark py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            — What We Protect You From
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-white">
            Four ways your brand gets copied.{" "}
            <span className="italic text-brand-cream">We stop all of them.</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COPY_METHODS.map((method) => (
              <div
                key={method.title}
                className="rounded-lg border border-brand-white/10 bg-brand-primary/20 p-6"
              >
                <h3 className="font-heading text-lg font-bold text-brand-white">
                  {method.title}
                </h3>
                <p className="mt-2 text-sm text-brand-cream/90">
                  {method.detail}
                </p>
                <p className="mt-4 border-t border-brand-white/10 pt-3 text-xs text-brand-cream/70">
                  {method.tags}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-brand-primary py-10 text-brand-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide">
            — Every Place We Monitor, Every Week
          </p>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {COVERAGE.map((item) => (
              <div key={item.title}>
                <p className="font-heading font-bold">{item.title}</p>
                <p className="mt-1 text-xs text-brand-cream/80">
                  {item.detail}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase">
                  {item.cadence}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Section>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — What Brand Owners Actually Want
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-brand-dark">
          Not more alerts.{" "}
          <span className="text-brand-primary italic">Real outcomes.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          Built around what brand owners tell us they actually need, not a
          feature checklist.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((outcome) => (
            <div key={outcome.title}>
              <h3 className="font-heading font-bold text-brand-dark">
                {outcome.title}
              </h3>
              <p className="mt-2 text-sm text-brand-dark">{outcome.detail}</p>
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
              One report, every threat, every action ready to go.
            </h2>
            <p className="mt-4 text-brand-dark">
              Every item names exactly where it was found, what it means for
              your brand, and what we recommend. No guesswork, no legal
              jargon.
            </p>
            <div className="mt-8">
              <ProcessSteps steps={STEPS} />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — The Cost Comparison
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-brand-dark">
          Calculate your estimated savings.
        </h2>
        <div className="mt-10">
          <SavingsCalculator />
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Everything you need to know
        </h2>
        <div className="mt-10">
          <FAQList items={FAQS} />
        </div>
      </Section>

      <Section>
        <div className="rounded-lg bg-brand-dark px-6 py-12 text-center sm:px-12">
          <h2 className="font-heading text-2xl font-bold text-brand-white sm:text-3xl">
            Start today
          </h2>
          <p className="mt-3 text-brand-cream">
            Plans start at $149/month per mark. Save 20% with annual billing.
            Cancel anytime.
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
