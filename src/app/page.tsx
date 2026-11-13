import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";
import CTA from "@/components/CTA";
import PlansDark from "@/components/PlansDark";
import ComparisonBars from "@/components/ComparisonBars";
import FeatureCardsGrid from "@/components/FeatureCardsGrid";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import ScanSection from "@/components/ScanSection";
import Testimonials from "@/components/Testimonials";
import TeamSection from "@/components/TeamSection";

export const metadata: Metadata = pageMetadata({
  title: "Home",
  description:
    "Trademark and copyright monitoring with enforcement included, from $149/mo. Your 24/7 AI-powered IP guardian.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-magenta">
              Trademark · Copyright · IP Protection
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold text-brand-dark sm:text-5xl">
              Your 24/7 AI-Powered <span className="text-brand-primary italic">IP Guardian</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-brand-dark lg:mx-0">
              We scan marketplaces, social platforms, domains, and the open
              web — then tell you exactly what threatens your brand and take
              action to stop it. Not just alerts. Answers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button href="/get-started/">Protect My Brand →</Button>
              <Button href="/how-it-works/" variant="secondary">
                See How It Works
              </Button>
            </div>
            <p className="mt-6 text-sm font-semibold text-brand-primary">
              2,000+ brands protected
            </p>
            <p className="mt-1 text-sm italic text-brand-dark/70">
              We act on your behalf
            </p>
          </div>
          <div>
            <Image
              src="/images/home_hero-768x512.png"
              alt="Trademark Copyright Protection dashboard"
              width={768}
              height={512}
              className="w-full rounded-lg"
              priority
            />
          </div>
        </div>
      </Section>

      <PlansDark />

      <Section>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — How We Compare
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-brand-dark">
          More complete than the alternatives, at a fraction of the cost.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          The only platform that monitors, interprets, and enforces — so you
          never have to guess what an alert means or what to do next.
        </p>
        <div className="mt-10">
          <ComparisonBars />
        </div>
      </Section>

      <Section>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — Everything Included
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-brand-dark">
          One platform, complete protection.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          Every tool you need to monitor, manage, and enforce your trademark
          and IP rights, all in one place.
        </p>
        <div className="mt-10">
          <FeatureCardsGrid />
        </div>
      </Section>

      <Section>
        <ScanSection />
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
              See the threat. Choose your action.
            </h2>
            <p className="mt-4 text-brand-dark">
              Every alert comes with a clear choice and a recommended next
              step, so you can act in minutes instead of hours — or hand the
              work to us entirely.
            </p>
            <div className="mt-8">
              <HowItWorksSteps />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Trusted by brand owners who&apos;d rather not think about this
        </h2>
        <div className="mt-10">
          <Testimonials />
        </div>
      </Section>

      <TeamSection />

      <CTA />
    </>
  );
}
