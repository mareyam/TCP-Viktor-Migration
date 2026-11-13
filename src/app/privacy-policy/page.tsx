import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Trademark Copyright Protection collects, uses, and protects your information.",
  path: "/privacy-policy/",
});

const SECTIONS = [
  {
    heading: "1. Information we collect",
    body: "We collect information you provide directly to us, such as your name, email address, billing details, and the trademarks or brand assets you ask us to monitor. We also collect information automatically when you use our site and service, including log data, device information, and usage patterns, along with cookies and analytics data where you've consented to them. In some cases we gather information about your brand from public sources, such as trademark registries, to deliver monitoring results.",
  },
  {
    heading: "2. How we use your information",
    body: "We use the information we collect to provide and improve the monitoring and enforcement service, communicate with you about your account and alerts, process payments, respond to support requests, and comply with legal obligations.",
  },
  {
    heading: "3. How we share information",
    body: "We do not sell your personal information. We may share information with service providers who help us operate the platform, such as payment processors and hosting providers, and with third parties when required by law or to protect our rights.",
  },
  {
    heading: "4. Google user data",
    body: "If we access Google user data as part of the service, we handle it in accordance with Google's API Services User Data Policy, including the Limited Use requirements, and only use it to provide the features you've requested.",
  },
  {
    heading: "5. How long we keep information",
    body: "We retain information for as long as your account is active and as needed to provide the service, comply with legal obligations, resolve disputes, and enforce our agreements.",
  },
  {
    heading: "6. Security",
    body: "We use reasonable administrative, technical, and physical safeguards to protect the information we hold, though no system can be guaranteed completely secure.",
  },
  {
    heading: "7. International transfers",
    body: "Your information may be processed in countries other than where you live. Where required, we take steps to ensure appropriate safeguards are in place for these transfers.",
  },
  {
    heading: "8. Your rights and choices",
    body: "Depending on where you live, you may have rights to access, correct, delete, or export your personal information, and to opt out of certain uses. You can exercise these rights by contacting us.",
  },
  {
    heading: "9. Children",
    body: "Our service is not directed to children, and we do not knowingly collect personal information from children.",
  },
  {
    heading: "10. Third-party links",
    body: "Our site and reports may link to third-party websites, including marketplaces and social platforms we monitor. We aren't responsible for the privacy practices of those third parties.",
  },
  {
    heading: "11. Changes to this policy",
    body: "We may update this policy from time to time. We'll post the updated version here and update the effective date.",
  },
  {
    heading: "12. Contact us",
    body: "If you have questions about this policy or how we handle your information, you can reach us through our contact page.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-brand-dark">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-brand-dark/70">
          This is a placeholder privacy policy for the migration foundation.
          Replace it with your reviewed, legally accurate policy before
          launch.
        </p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="font-heading text-xl font-bold text-brand-dark">
                {section.heading}
              </h2>
              <p className="mt-2 text-brand-dark">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
