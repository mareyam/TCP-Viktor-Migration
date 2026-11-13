import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/metadata";
import GetStartedForm from "@/components/GetStartedForm";

export const metadata: Metadata = pageMetadata({
  title: "Get Started",
  description: "Start protecting your brand today. Pick a plan and tell us what to monitor.",
  path: "/get-started/",
});

export default function GetStartedPage() {
  return (
    <div className="bg-brand-dark py-16 text-brand-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-cream/70">
          — Get Started
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Start protecting your brand{" "}
          <span className="italic text-brand-cream">today.</span>
        </h1>
        <p className="mt-4 max-w-xl text-brand-cream/90">
          Tell us what to monitor, then complete secure checkout. It takes
          about two minutes.
        </p>

        <Suspense fallback={null}>
          <GetStartedForm />
        </Suspense>
      </div>
    </div>
  );
}
