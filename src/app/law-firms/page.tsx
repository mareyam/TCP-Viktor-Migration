import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";
import FAQList from "@/components/FAQList";
import RevenueCalculator from "@/components/RevenueCalculator";
import SampleReportTable from "@/components/SampleReportTable";

export const metadata: Metadata = pageMetadata({
  title: "Law Firms",
  description:
    "Offer trademark monitoring to your clients under your firm's name. TCP finds the matches and prepares the reports, you set the price and keep the margin.",
  path: "/law-firms/",
});

const GROWTH_REASONS = [
  {
    tag: "01 · Recurring Revenue",
    title: "Earn every month from marks you already filed.",
    description:
      "Most trademark work pays at filing and renewal. Monitoring turns your existing client list into a monthly service your firm bills for.",
  },
  {
    tag: "02 · New Billable Matters",
    title: "Every real threat becomes legal work for your firm.",
    description:
      "When a match needs action, the cease-and-desist letter, takedown, or dispute comes to you, billed at your usual rates.",
  },
  {
    tag: "03 · Client Relationship",
    title: "Stay in front of clients between filing and renewal.",
    description:
      "Regular reports under your firm's name keep you top of mind, so clients come back to you when they need help.",
  },
];

const WE_HANDLE = [
  "Client intake",
  "Ongoing online checks",
  "Flagging potential matches",
  "Evidence: URL, time, capture",
  "Branded client reports",
  "Draft notices on request",
];

const YOU_HANDLE = [
  "Review flagged matches",
  "Decide what to act on",
  "Bill for the work that follows",
];

const INCLUDED = [
  {
    title: "Online monitoring",
    description:
      "Checks marketplaces, websites, and social channels for uses of your client's mark. Channels are set for each client when you start.",
  },
  {
    title: "Evidence you can act on",
    description:
      "Every potential match comes with the source link, a timestamp, a capture where available, and why it was flagged.",
  },
  {
    title: "Reports under your brand",
    description:
      "Clear client reports presented under your firm's name, so the service is yours in your client's eyes.",
  },
  {
    title: "Draft notices",
    description:
      "Ask for a cease-and-desist letter or platform notice and get a draft built from the match record, ready for your review and signature.",
  },
  {
    title: "You stay in control",
    description:
      "Nothing goes to a client or a third party without your attorney's approval.",
  },
  {
    title: "Copyright add-on",
    description:
      "Copyright monitoring for clients' written and creative work is available and scoped separately.",
  },
];

const STEPS = [
  {
    title: "Choose your clients",
    description:
      "Pick the clients and marks to enroll, and set your price. We agree the channels to monitor.",
  },
  {
    title: "We monitor and report",
    description:
      "TCP checks the agreed channels and sends potential matches with the evidence, under your firm's name.",
  },
  {
    title: "You review and bill",
    description:
      "Your attorney decides what to act on. The legal work that follows is billed by your firm.",
  },
];

const FAQS = [
  {
    question: "How much can my firm earn?",
    answer:
      "You set the price you charge clients and keep the difference over your TCP cost. Your TCP cost is quoted during the demo, so you can run your own numbers in the calculator above.",
  },
  {
    question: "How much work is it for my team?",
    answer:
      "TCP handles intake, ongoing checks, and evidence gathering. Your team only reviews flagged matches and decides what action to take.",
  },
  {
    question: "Which channels and asset types are covered?",
    answer:
      "Marketplaces, websites, and social channels for word marks and logos by default, with copyright monitoring for written and creative work available as an add-on.",
  },
  {
    question: "Can reports go out under our firm's name?",
    answer:
      "Yes, every report is branded for your firm, not ours.",
  },
  {
    question: "Is there a minimum number of clients?",
    answer:
      "There's no required minimum to get started. Pricing and volume terms are confirmed during your demo based on your portfolio.",
  },
  {
    question: "Does it replace registry watching?",
    answer:
      "No, it complements it. Registry watching flags new filings; we monitor marketplaces, websites, and social channels for actual use of the mark.",
  },
  {
    question: "Who approves what goes to clients?",
    answer:
      "Your firm does. Nothing is sent to a client or a third party without your attorney's review and sign-off.",
  },
  {
    question: "Can reports carry our firm's branding?",
    answer:
      "Yes, every report is formatted with your firm's name and branding, not ours.",
  },
  {
    question: "What client information do you need?",
    answer:
      "Just the mark, the classes it covers, and the channels you'd like monitored. You don't need to share confidential client details to get a quote.",
  },
  {
    question: "How is client information handled?",
    answer:
      "Any client data you do share is kept confidential and used only to configure and run the monitoring for that client.",
  },
  {
    question: "What if a match is irrelevant or a page can't be checked?",
    answer:
      "You can dismiss irrelevant matches directly in the report. If a page can't be checked automatically, it's flagged for manual review instead of being silently dropped.",
  },
];

export default function LawFirmsPage() {
  return (
    <>
      <div className="bg-brand-dark py-16 text-center text-brand-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-cream/70">
            For Trademark Attorneys &amp; IP Firms
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
            Add a recurring revenue line.
            <br />
            <span className="italic text-brand-cream">We do the monitoring.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-brand-cream/90">
            Offer trademark monitoring to your clients under your firm&apos;s
            name. TCP finds the potential matches and prepares the reports.
            You set the price and keep the margin.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/book-a-demo/" variant="secondary">
              Book a Demo →
            </Button>
            <Button href="/weekly-brand-protection/" variant="secondary">
              View a Sample Report
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <span>✓ No software to build</span>
            <span>✓ No new hires</span>
            <span>✓ Your firm&apos;s name on every report</span>
          </div>
        </div>
      </div>

      <Section>
        <RevenueCalculator />
      </Section>

      <div className="bg-brand-cream py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            — Why Firms Add It
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark">
            Three ways monitoring{" "}
            <span className="text-brand-primary italic">grows your practice.</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {GROWTH_REASONS.map((reason) => (
              <div
                key={reason.title}
                className="rounded-lg border border-brand-primary/15 bg-brand-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
                  {reason.tag}
                </p>
                <h3 className="mt-2 font-heading text-lg font-bold text-brand-dark">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm text-brand-dark">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/book-a-demo/">Book a Demo →</Button>
          </div>
        </div>
      </div>

      <Section>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — Who Does What
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-brand-dark">
          We do the monitoring.{" "}
          <span className="text-brand-primary italic">You make the legal calls.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          Your attorneys only step in where their judgment matters. Everything
          else is handled for you.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-brand-primary p-8 text-brand-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-cream/80">
              TCP Handles
            </p>
            <h3 className="mt-1 font-heading text-lg font-bold">
              All of the monitoring work
            </h3>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {WE_HANDLE.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-brand-primary/20 bg-brand-white p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
              Your Firm Handles
            </p>
            <h3 className="mt-1 font-heading text-lg font-bold text-brand-dark">
              Only the legal judgment
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark">
              {YOU_HANDLE.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <div className="bg-brand-dark py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            — What&apos;s Included
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-white">
            A complete monitoring service,{" "}
            <span className="italic text-brand-cream">ready for your clients.</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-brand-white/10 bg-brand-primary/20 p-6"
              >
                <h3 className="font-heading font-bold text-brand-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-brand-cream/90">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Section>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — Sample Report
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-brand-dark">
          The report your clients receive.{" "}
          <span className="text-brand-primary italic">
            Every threat, scored and sorted.
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          This is the format of a real TCP monitoring report, shown with
          fictional data, delivered weekly, monthly, or quarterly, as a report
          your firm can send straight to the client.
        </p>
        <div className="mt-10">
          <SampleReportTable />
        </div>
      </Section>

      <Section>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — How It Works
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-brand-dark">
          Up and running{" "}
          <span className="text-brand-primary italic">in three steps.</span>
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="rounded-lg border border-brand-primary/15 bg-brand-white p-6 text-center"
            >
              <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream font-heading font-bold text-brand-dark">
                {index + 1}
              </span>
              <h3 className="mt-3 font-heading font-bold text-brand-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-brand-dark">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/book-a-demo/">Book a Demo →</Button>
        </div>
      </Section>

      <Section>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — FAQ
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-brand-dark">
          Questions attorneys ask.
        </h2>
        <div className="mt-10">
          <FAQList items={FAQS} />
        </div>
      </Section>

      <div className="bg-brand-primary py-16 text-brand-white">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-cream/80">
              Book a Demo
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              See what monitoring{" "}
              <span className="italic text-brand-cream">could add to your firm.</span>
            </h2>
            <p className="mt-4 text-brand-cream/90">
              Four quick questions. We&apos;ll reply by email to set up a
              time, show you the service, and quote your pricing.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>✓ See the full workflow and sample reports</li>
              <li>✓ Get your firm&apos;s pricing</li>
              <li>✓ No client information needed</li>
            </ul>
          </div>
          <form className="rounded-lg bg-brand-white p-6 text-brand-dark">
            <p className="rounded-md bg-brand-cream px-3 py-2 text-xs text-brand-dark/70">
              Please don&apos;t include confidential client information at
              this stage.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="lf-name"
                  className="block text-xs font-semibold uppercase text-brand-dark"
                >
                  Name *
                </label>
                <input
                  id="lf-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-1 w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="lf-email"
                  className="block text-xs font-semibold uppercase text-brand-dark"
                >
                  Work Email *
                </label>
                <input
                  id="lf-email"
                  name="email"
                  type="email"
                  placeholder="you@yourfirm.com"
                  className="mt-1 w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="lf-firm"
                  className="block text-xs font-semibold uppercase text-brand-dark"
                >
                  Firm Name *
                </label>
                <input
                  id="lf-firm"
                  name="firm"
                  type="text"
                  placeholder="Your firm"
                  className="mt-1 w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-brand-dark">
                  Main Interest *
                </p>
                <div className="mt-2 space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="interest"
                      defaultChecked
                      className="accent-brand-primary"
                    />
                    Online trademark monitoring
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="interest"
                      className="accent-brand-primary"
                    />
                    Copyright monitoring
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="lf-current"
                  className="block text-xs font-semibold uppercase text-brand-dark"
                >
                  Current Monitoring Arrangement{" "}
                  <span className="font-normal normal-case text-brand-dark/60">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="lf-current"
                  name="current"
                  rows={3}
                  placeholder="For example: a registry watch through a provider, manual checks, or nothing in place yet"
                  className="mt-1 w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="w-full cursor-not-allowed rounded-md bg-brand-primary/40 px-5 py-3 text-sm font-semibold text-brand-white"
              >
                Request a law-firm demo
              </button>
              <p className="text-xs text-brand-dark/60">
                Demo booking isn&apos;t connected yet. This form is a
                placeholder for the migration foundation; submitting it
                doesn&apos;t send a request anywhere.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
