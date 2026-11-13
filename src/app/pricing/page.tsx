import type { Metadata } from "next";
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
  "First report within 24 hours",
  "No setup fees, ever",
  "Cancel anytime",
  "Fast support response times",
];

const FAQS = [
  {
    question: "What's the difference between the two plans?",
    answer:
      "Both plans monitor the same channels and send the same weekly reports with immediate alerts. Watch hands you ready-to-use templates so you can act yourself. Watch + Enforce drafts the letter, finds the infringer's contact details, and submits it for you once you approve.",
  },
  {
    question: "How do volume discounts work?",
    answer:
      "Your rate drops automatically as you add marks to your account. The discounted rate applies to every mark on the account, not just the ones past the threshold.",
  },
  {
    question: "Can I upgrade from Watch to Watch + Enforce later?",
    answer:
      "Yes, at any time. Your monitoring history and mark data carry over, the upgrade takes effect immediately, and your next billing cycle reflects the new rate.",
  },
  {
    question: "Who actually sends the enforcement letters?",
    answer:
      "On Watch + Enforce, once you approve an action we handle the submission, whether that's a cease-and-desist letter, a marketplace brand-registry complaint, or a DMCA takedown. For matters that need a licensed attorney, we can refer you to our network of IP specialists.",
  },
  {
    question: "Is there a contract?",
    answer:
      "No contract on monthly plans, cancel or pause whenever you like. Higher-volume firm pricing is available once you reach a larger number of marks, and annual billing is available if you'd like to lock in a rate.",
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
            Two plans. One clear choice.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-dark">
            Start with monitoring and alerts. Add enforcement whenever
            you&apos;re ready, everything carries over. Volume discounts apply
            automatically as you grow.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="rounded-lg border border-brand-primary/20 bg-brand-white p-8">
            <h2 className="font-heading text-xl font-bold text-brand-dark">
              Watch
            </h2>
            <p className="mt-2 font-heading text-4xl font-bold text-brand-primary">
              $149
              <span className="text-base font-normal text-brand-dark/60">
                {" "}
                / mark / month
              </span>
            </p>
            <p className="mt-3 text-sm text-brand-dark">
              Full monitoring across every channel, with a weekly report and
              immediate alerts when something urgent turns up.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-brand-dark">
              <li>— Marketplace, social, and domain monitoring</li>
              <li>— Image and copyright content monitoring</li>
              <li>— Ready-to-use enforcement templates</li>
            </ul>
            <div className="mt-8">
              <Button href="/get-started/?plan=watch">Start with Watch →</Button>
            </div>
          </div>
          <div className="rounded-lg border border-brand-primary bg-brand-white p-8 shadow-lg">
            <h2 className="font-heading text-xl font-bold text-brand-dark">
              Watch + Enforce
            </h2>
            <p className="mt-2 font-heading text-4xl font-bold text-brand-primary">
              $199
              <span className="text-base font-normal text-brand-dark/60">
                {" "}
                / mark / month
              </span>
            </p>
            <p className="mt-3 text-sm text-brand-dark">
              Everything in Watch, plus we draft the enforcement letter, find
              the infringer&apos;s contact details, and submit it once you
              approve.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-brand-dark">
              <li>— Everything in Watch</li>
              <li>— Enforcement letter drafting</li>
              <li>— Takedown submission on your behalf</li>
              <li>— Priority support</li>
            </ul>
            <div className="mt-8">
              <Button href="/get-started/?plan=enforce">
                Start with Watch + Enforce →
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-brand-dark">
          {TRUST_POINTS.map((point) => (
            <span key={point}>✓ {point}</span>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Volume discounts, applied automatically
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          The more marks you enroll, the lower your per-mark rate, across your
          entire account.
        </p>
        <div className="mt-10">
          <VolumeDiscountTiers />
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Everything, side by side
        </h2>
        <div className="mt-10">
          <PlanCheckTable />
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
            Not sure which plan is right for you?
          </h2>
          <p className="mt-3 text-brand-cream">
            Talk to our team and we&apos;ll point you to the plan that fits,
            no upselling.
          </p>
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
