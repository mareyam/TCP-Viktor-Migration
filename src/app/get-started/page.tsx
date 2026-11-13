import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import GetStartedForm from "@/components/GetStartedForm";

export const metadata: Metadata = pageMetadata({
  title: "Get Started",
  description: "Start protecting your brand today. Pick a plan and tell us what to monitor.",
  path: "/get-started/",
});

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

      <Suspense fallback={null}>
        <GetStartedForm />
      </Suspense>
    </Section>
  );
}
