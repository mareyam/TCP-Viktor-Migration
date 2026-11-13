import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";
import PlanCheckTable from "@/components/PlanCheckTable";
import VolumeDiscountTiers from "@/components/VolumeDiscountTiers";
import FAQList from "@/components/FAQList";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Two plans, one clear choice: Watch monitoring from $149/mo, or Watch + Enforce with active enforcement from $199/mo.",
  path: "/pricing/",
});

const TRUST_POINTS = [
  "First report in 24 hours",
  "No setup fees, ever",
  "Cancel anytime",
  "2-hour response guarantee",
  "SOC 2 compliant",
];

const FAQS = [
  {
    question: "What's the real difference between the two plans?",
    answer:
      "Both plans include identical monitoring across every channel and weekly reports with immediate alerts. The difference is what happens next. With Watch, we give you the templates and you take the next step yourself. With Watch + Enforce, we draft the actual letter, find the infringer's contact details, and submit it on your behalf once you approve.",
  },
  {
    question: "How do the volume discounts work?",
    answer:
      "Your rate drops automatically as you add marks to your account. The discounted rate applies across your entire account, not just the marks past the threshold.",
  },
  {
    question: "Can I upgrade from Watch to Watch + Enforce later?",
    answer:
      "Yes, at any time. Your monitoring history and mark data carry over, the upgrade takes effect immediately, and your next billing cycle reflects the new rate.",
  },
  {
    question: "What does \"we submit on your behalf\" actually mean?",
    answer:
      "Once you approve an action, we send the letter, submit the takedown, or file the complaint ourselves, then follow up until it's resolved.",
  },
  {
    question: "Is there a minimum commitment or contract?",
    answer:
      "No contract on monthly plans. Cancel or pause any time. Higher-volume firm pricing is available once you reach a larger number of marks, and annual billing is available if you'd like to lock in a rate.",
  },
  {
    question: "What if I'm not satisfied?",
    answer:
      "We offer a satisfaction guarantee on your first month. If your first report doesn't deliver clear value, let us know and we'll make it right.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            — Plans &amp; Pricing
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
            Two plans. <span className="text-brand-primary italic">One clear choice.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-dark">
            Start with monitoring and alerts. Add enforcement whenever
            you&apos;re ready. Volume discounts apply automatically as you
            grow.
          </p>

          <div className="mt-6 inline-flex rounded-md border border-brand-primary/20 p-1">
            <span className="rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-brand-white">
              For brand owners
            </span>
            <Link
              href="/law-firms/"
              className="rounded-md px-4 py-2 text-sm font-semibold text-brand-dark"
            >
              For law firms
            </Link>
          </div>

          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-lg border border-brand-primary/15 bg-brand-cream p-4 text-left">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-brand-white">
              i
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-dark">
                Not sure which plan? Start with Watch.
              </p>
              <p className="mt-1 text-sm text-brand-dark">
                Watch gives you complete monitoring and immediate alerts.
                Upgrade to Watch + Enforce any time, everything carries over,
                no setup needed.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="rounded-lg border border-brand-primary/20 bg-brand-white p-8">
            <h2 className="font-heading text-xl font-bold text-brand-dark">
              Watch
            </h2>
            <p className="mt-2 text-sm text-brand-dark">
              We monitor every channel and send you a weekly report plus
              immediate alerts the moment something urgent appears.
            </p>
            <p className="mt-6 font-heading text-4xl font-bold text-brand-dark">
              $149
            </p>
            <p className="text-xs text-brand-dark/60">per trademark, per month</p>
            <div className="mt-6">
              <Button href="/get-started/?plan=watch" variant="secondary">
                Get started →
              </Button>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-brand-dark/60">
              What&apos;s included
            </p>
            <ul className="mt-3 space-y-2 text-sm text-brand-dark">
              <li>✓ Immediate alerts for urgent threats, same day</li>
              <li>✓ Amazon, Etsy, eBay, TikTok Shop, Temu</li>
              <li>✓ Instagram, TikTok, Facebook, X, YouTube</li>
              <li>✓ 1,000+ domain extensions, daily scan</li>
              <li>✓ Image &amp; copyright content monitoring</li>
              <li>✓ Ready-to-use enforcement templates</li>
            </ul>
          </div>
          <div className="rounded-lg border border-brand-primary bg-brand-white p-8 shadow-lg">
            <h2 className="font-heading text-xl font-bold text-brand-dark">
              Watch + Enforce
            </h2>
            <p className="mt-2 text-sm text-brand-dark">
              Everything in Watch, plus we draft the enforcement letter and
              find the contact information for any violation you want to act
              on.
            </p>
            <p className="mt-6 font-heading text-4xl font-bold text-brand-primary">
              $199
            </p>
            <p className="text-xs text-brand-dark/60">per trademark, per month</p>
            <div className="mt-6">
              <Button href="/get-started/?plan=enforce">Get started →</Button>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-brand-dark/60">
              Everything in Watch, plus
            </p>
            <ul className="mt-3 space-y-2 text-sm text-brand-dark">
              <li>
                ✓ We draft the enforcement letter, C&amp;D, DMCA notice, or
                takedown, written and ready to send
              </li>
              <li>
                ✓ We find the contact information: legal contact, registrar
                details, platform enforcement channel, handed to you
              </li>
              <li>✓ We submit on your behalf, you approve, we send it</li>
              <li>✓ Follow-up tracking until each case is resolved</li>
              <li>✓ Priority support, response within 4 hours</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-2xl font-bold text-brand-dark">
          More trademarks? <span className="text-brand-primary italic">Better price.</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-brand-dark">
          Volume discounts apply automatically to both plans based on how
          many marks you enroll.
        </p>
        <div className="mt-8">
          <VolumeDiscountTiers />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-brand-dark/70">
          {TRUST_POINTS.map((point, i) => (
            <span key={point}>
              {point}
              {i < TRUST_POINTS.length - 1 && <span className="ml-6">·</span>}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          What each plan <span className="text-brand-primary italic">includes.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          Everything side by side, no surprises.
        </p>
        <div className="mt-10">
          <PlanCheckTable />
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Common questions about <span className="text-brand-primary italic">pricing.</span>
        </h2>
        <div className="mt-10">
          <FAQList items={FAQS} />
        </div>
      </Section>

      <div className="bg-brand-dark py-16 text-center text-brand-white">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Not sure which plan{" "}
            <span className="italic text-brand-cream">is right for you?</span>
          </h2>
          <p className="mt-3 text-brand-cream">
            Talk to our team. We&apos;ll look at your situation and tell you
            exactly what makes sense, honestly, without upselling.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact/" variant="secondary">
              Talk to our team →
            </Button>
            <Button href="/weekly-brand-protection/" variant="secondary">
              See a sample report first
            </Button>
          </div>
          <p className="mt-4 text-sm text-brand-cream/70">
            We respond within 2 hours · No commitment required
          </p>
        </div>
      </div>
    </>
  );
}
