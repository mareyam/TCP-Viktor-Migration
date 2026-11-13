import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with the Trademark Copyright Protection team.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 text-brand-dark">
          Questions about a plan, a specific threat, or how monitoring would
          work for your brand or firm? Send us a message and we&apos;ll get
          back to you.
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
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-brand-dark"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="mt-1 w-full rounded-md border border-brand-primary/20 bg-brand-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:outline-none"
          />
        </div>
        <Button href="#">Send Message</Button>
        <p className="text-xs text-brand-dark/60">
          This form is a placeholder for the migration foundation and isn&apos;t
          wired up yet.
        </p>
      </form>
    </Section>
  );
}
