import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = pageMetadata({
  title: "Weekly Brand Protection",
  description:
    "A sample weekly brand protection report, showing how threats are found, scored, and sorted.",
  path: "/weekly-brand-protection/",
});

const CHANNELS = [
  "Website",
  "Domain",
  "Shopify",
  "Amazon",
  "Etsy",
  "TikTok Shop",
  "Instagram",
  "TikTok",
  "Facebook",
  "YouTube",
  "Google Ads",
  "Meta Ads",
  "1,000+ Domains",
  "Open Web",
];

const ACT_NOW = [
  {
    channel: "Website",
    title: "Lookalike store",
    detail: "A near-identical name selling similar products to yours.",
  },
  {
    channel: "Instagram",
    title: "Fake account",
    detail: "An account using your brand name and photos, not run by you.",
  },
  {
    channel: "Amazon",
    title: "Counterfeits at scale",
    detail: "Listings using your name and photos for products that aren't yours.",
  },
  {
    channel: "Domain",
    title: "Fake store, live",
    detail: "A site impersonating your brand and accepting real payments.",
  },
];

const WATCH = [
  {
    channel: "Domain",
    title: "Parked typosquat",
    detail: "A lookalike domain is registered but not active yet.",
  },
  {
    channel: "Etsy",
    title: "Passing-off risk",
    detail: "A listing trades on your name with a thin disclaimer.",
  },
];

const ALL_CLEAR = [
  {
    channel: "Website",
    title: "Different industry",
    detail: "Similar name, no actual conflict with your brand.",
  },
  {
    channel: "Instagram",
    title: "Genuine fan account",
    detail: "A supportive account, not an impersonation.",
  },
];

export default function WeeklyBrandProtectionPage() {
  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            — Sample Report
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
            Weekly Brand Protection
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-dark">
            A sample of what a real weekly report looks like: every channel
            checked, every threat already sorted into what needs your
            attention and what doesn&apos;t.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-2xl font-bold text-brand-dark">
          Every channel, checked this week
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {CHANNELS.map((channel) => (
            <span
              key={channel}
              className="rounded-full border border-brand-primary/20 bg-brand-cream px-4 py-2 text-xs font-medium text-brand-dark"
            >
              {channel}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-heading text-2xl font-bold text-brand-magenta">
          Needs your attention now
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ACT_NOW.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-brand-magenta bg-brand-magenta/5 p-5"
            >
              <p className="text-xs font-semibold uppercase text-brand-magenta">
                {item.channel}
              </p>
              <p className="mt-1 font-semibold text-brand-dark">{item.title}</p>
              <p className="mt-1 text-sm text-brand-dark">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-heading text-2xl font-bold text-brand-accent">
          Keeping a close eye
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {WATCH.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-brand-accent bg-brand-accent/5 p-5"
            >
              <p className="text-xs font-semibold uppercase text-brand-accent">
                {item.channel}
              </p>
              <p className="mt-1 font-semibold text-brand-dark">{item.title}</p>
              <p className="mt-1 text-sm text-brand-dark">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-heading text-2xl font-bold text-brand-primary">
          Relax, these are fine
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ALL_CLEAR.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-brand-primary/20 bg-brand-cream p-5"
            >
              <p className="text-xs font-semibold uppercase text-brand-primary">
                {item.channel}
              </p>
              <p className="mt-1 font-semibold text-brand-dark">{item.title}</p>
              <p className="mt-1 text-sm text-brand-dark">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-lg bg-brand-dark px-6 py-12 text-center sm:px-12">
          <h2 className="font-heading text-2xl font-bold text-brand-white sm:text-3xl">
            Get a report like this for your brand
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/get-started/">Get Started →</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
