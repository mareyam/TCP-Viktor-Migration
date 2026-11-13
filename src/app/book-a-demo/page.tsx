import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = pageMetadata({
  title: "Book a Demo",
  description:
    "Book a 30-minute demo to see how trademark monitoring and enforcement would work for your brand or firm.",
  path: "/book-a-demo/",
});

export default function BookADemoPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
          Book a Demo
        </h1>
        <p className="mt-4 text-brand-dark">
          See how monitoring and enforcement would work for your brand or
          firm. We&apos;ll walk through a real report and answer your
          questions.
        </p>
      </div>

      <form className="mx-auto mt-10 max-w-xl space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-brand-dark"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 w-full rounded-md border border-brand-primary/20 bg-brand-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-brand-dark"
          >
            Work Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full rounded-md border border-brand-primary/20 bg-brand-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-brand-dark"
          >
            Company or Firm
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="mt-1 w-full rounded-md border border-brand-primary/20 bg-brand-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="marks"
            className="block text-sm font-semibold text-brand-dark"
          >
            Number of trademarks
          </label>
          <input
            id="marks"
            name="marks"
            type="text"
            className="mt-1 w-full rounded-md border border-brand-primary/20 bg-brand-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:outline-none"
          />
        </div>
        <Button href="#">Request a Demo</Button>
        <p className="text-xs text-brand-dark/60">
          This form is a placeholder for the migration foundation and isn&apos;t
          wired up yet.
        </p>
      </form>
    </Section>
  );
}
