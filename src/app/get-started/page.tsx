import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = pageMetadata({
  title: "Get Started",
  description: "Start protecting your brand today. Pick a plan and tell us what to monitor.",
  path: "/get-started/",
});

const BRAND_TYPES = [
  "App or software product",
  "Business or retail brand",
  "Book or publication",
  "Music or audio brand",
  "Franchise",
  "Photography or visual work",
  "Online course",
  "Podcast",
];

export default function GetStartedPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
          Start protecting your brand today.
        </h1>
        <p className="mt-4 text-brand-dark">
          Tell us a bit about what you want monitored, and we&apos;ll set up
          your first scan.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <h2 className="text-center font-heading text-xl font-bold text-brand-dark">
          What are we protecting?
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {BRAND_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 rounded-md border border-brand-primary/20 bg-brand-white px-4 py-3 text-sm text-brand-dark"
            >
              <input type="radio" name="brand-type" className="accent-brand-primary" />
              {type}
            </label>
          ))}
        </div>
      </div>

      <form className="mx-auto mt-10 max-w-xl space-y-4">
        <div>
          <label
            htmlFor="brand-name"
            className="block text-sm font-semibold text-brand-dark"
          >
            Brand or trademark name
          </label>
          <input
            id="brand-name"
            name="brand-name"
            type="text"
            className="mt-1 w-full rounded-md border border-brand-primary/20 bg-brand-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-brand-dark"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full rounded-md border border-brand-primary/20 bg-brand-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:outline-none"
          />
        </div>
        <div>
          <p className="block text-sm font-semibold text-brand-dark">Plan</p>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2 text-sm text-brand-dark">
              <input type="radio" name="plan" defaultChecked className="accent-brand-primary" />
              Watch ($149/mo)
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-dark">
              <input type="radio" name="plan" className="accent-brand-primary" />
              Watch + Enforce ($199/mo)
            </label>
          </div>
        </div>
        <Button href="/welcome/">Continue to Checkout →</Button>
        <p className="text-xs text-brand-dark/60">
          This form is a placeholder for the migration foundation and
          isn&apos;t wired up to payment yet.
        </p>
      </form>
    </Section>
  );
}
