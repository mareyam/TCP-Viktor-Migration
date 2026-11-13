import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import Button from "@/components/Button";
import CTA from "@/components/CTA";
import PricingCard from "@/components/PricingCard";
import FeatureTable from "@/components/FeatureTable";
import HowItWorksSteps from "@/components/HowItWorksSteps";
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
              Your 24/7 AI-Powered IP Guardian
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-brand-dark lg:mx-0">
              We scan marketplaces, social platforms, domains, and the open
              web for threats to your brand, then tell you exactly what to do
              and take action to stop it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button href="/get-started/">Protect My Brand</Button>
              <Button href="/how-it-works/" variant="secondary">
                See How It Works
              </Button>
            </div>
            <p className="mt-6 text-sm font-semibold text-brand-primary">
              2,000+ brands protected
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

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Plans
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <PricingCard
            name="Watch"
            price="$149 / mo per mark"
            description="Know the moment your brand is copied. Weekly reports plus immediate alerts for urgent issues."
            features={[
              "Marketplace, social, and domain monitoring",
              "Weekly report + urgent alerts",
              "Plain-English verdict on every alert",
            ]}
            ctaHref="/get-started/?plan=watch"
            ctaLabel="Start with Watch"
          />
          <PricingCard
            name="Watch + Enforce"
            price="$199 / mo per mark"
            description="Everything in Watch, plus we draft enforcement letters and submit takedowns once you approve."
            features={[
              "Everything in Watch",
              "Enforcement letter drafting",
              "Takedown submission",
              "Priority support",
            ]}
            ctaHref="/get-started/?plan=enforce"
            ctaLabel="Start with Watch + Enforce"
            highlighted
          />
          <PricingCard
            name="For Law Firms"
            price="Custom pricing"
            description="White-label monitoring for law firms and IP practices, with volume pricing for your portfolio."
            features={[
              "Multi-client dashboard",
              "Volume pricing",
              "White-label reporting",
            ]}
            ctaHref="/book-a-demo/"
            ctaLabel="Book a Demo"
          />
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          How We Compare
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-dark">
          The only platform that monitors, interprets, and enforces — so you
          never have to guess what an alert means or what to do next.
        </p>
        <div className="mt-10">
          <FeatureTable />
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          Here&apos;s How It Works
        </h2>
        <div className="mt-10">
          <HowItWorksSteps />
        </div>
      </Section>

      <Section>
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark">
          They Love How Effortless It Is
        </h2>
        <div className="mt-10">
          <Testimonials />
        </div>
      </Section>

      <Section>
        <TeamSection />
      </Section>

      <CTA />
    </>
  );
}
