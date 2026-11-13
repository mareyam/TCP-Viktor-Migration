"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type PlanId = "watch" | "enforce";
type ScanType = "trademark" | "design" | "face" | "content";

const PLANS: Record<
  PlanId,
  { name: string; price: string; features: string[] }
> = {
  watch: {
    name: "Watch",
    price: "$149",
    features: [
      "Online monitoring across marketplaces, social and domains",
      "Weekly threat report in plain English",
      "Immediate alerts for urgent threats",
      "Image & copyright content monitoring",
      "Ready-to-use enforcement templates",
    ],
  },
  enforce: {
    name: "Watch + Enforce",
    price: "$199",
    features: [
      "Everything in Watch",
      "We draft the enforcement letter",
      "We find the infringer's contact information",
      "We submit on your behalf, with your approval",
      "Priority support",
    ],
  },
};

const SCAN_OPTIONS: { id: ScanType; title: string; description: string }[] = [
  {
    id: "trademark",
    title: "Trademark & brand monitoring",
    description:
      "Our main service: we watch marketplaces, social media and websites for your brand name and logo.",
  },
  {
    id: "design",
    title: "Who is copying my design",
    description:
      "Shops, copycat listings, lookalike websites and social pages selling your design.",
  },
  {
    id: "face",
    title: "Who is using my face",
    description: "Fake accounts and ads using photos of your face.",
  },
  {
    id: "content",
    title: "Who is using my brand and content",
    description:
      "Copycat apps, fake marketplace listings, pirated books, leaked courses, copied music, podcasts and more.",
  },
];

export default function GetStartedForm() {
  const searchParams = useSearchParams();
  const requestedPlan = searchParams.get("plan") === "enforce" ? "enforce" : "watch";

  const [plan, setPlan] = useState<PlanId>(requestedPlan);
  const [scanType, setScanType] = useState<ScanType>("trademark");
  const selectedPlan = PLANS[plan];

  return (
    <div className="mt-10">
      <div className="mb-10 mt-8 flex flex-wrap gap-6 text-xs font-medium text-brand-cream/80">
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-white">
            1
          </span>
          Your details
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-cream/40">
            2
          </span>
          Secure payment
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-cream/40">
            3
          </span>
          Monitoring begins
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-lg border border-brand-primary/15 bg-brand-white p-6 sm:p-8">
          {/* Step 1: plan */}
          <FieldGroup step={1} title="Choose your plan">
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(PLANS) as PlanId[]).map((id) => (
                <label
                  key={id}
                  className={`cursor-pointer rounded-md border p-4 text-sm ${
                    plan === id
                      ? "border-brand-primary bg-brand-cream"
                      : "border-brand-primary/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={id}
                    checked={plan === id}
                    onChange={() => setPlan(id)}
                    className="sr-only"
                  />
                  <span className="block font-semibold text-brand-dark">
                    {PLANS[id].name}
                  </span>
                  <span className="text-xs text-brand-dark/60">
                    {PLANS[id].price} per trademark / month
                  </span>
                </label>
              ))}
            </div>
          </FieldGroup>

          {/* Step 2: what to scan */}
          <FieldGroup
            step={2}
            title="What should we scan first? *"
            note="Pick one option and fill in the boxes. We start right after your payment, and the results appear in your dashboard."
          >
            <div className="space-y-3">
              {SCAN_OPTIONS.map((option) => (
                <div
                  key={option.id}
                  className={`rounded-md border p-4 ${
                    scanType === option.id
                      ? "border-brand-primary"
                      : "border-brand-primary/20"
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="radio"
                      name="scan-type"
                      checked={scanType === option.id}
                      onChange={() => setScanType(option.id)}
                      className="mt-1 accent-brand-primary"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-brand-dark">
                        {option.title}
                      </span>
                      <span className="block text-xs text-brand-dark/60">
                        {option.description}
                      </span>
                    </span>
                  </label>

                  {scanType === option.id && (
                    <div className="mt-4 border-t border-brand-primary/10 pt-4">
                      <ScanDetailFields type={option.id} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FieldGroup>

          {/* Step 3: contact details */}
          <FieldGroup step={3} title="Your details">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField id="first-name" label="First name *" placeholder="Jane" />
              <TextField id="last-name" label="Last name *" placeholder="Smith" />
              <TextField
                id="email"
                label="Email *"
                type="email"
                placeholder="jane@yourbrand.com"
              />
              <TextField
                id="phone"
                label="Phone (optional)"
                type="tel"
                placeholder="+1 555 123 4567"
              />
            </div>
          </FieldGroup>

          <label className="mt-6 flex items-start gap-2 text-xs text-brand-dark">
            <input type="checkbox" className="mt-0.5 accent-brand-primary" />
            <span>
              I agree to the{" "}
              <Link href="/privacy-policy/" className="underline">
                Privacy Policy
              </Link>{" "}
              and understand Trademark Copyright Protection is not a law firm
              and does not give legal advice.
            </span>
          </label>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center rounded-md bg-brand-primary/40 px-5 py-3 text-sm font-semibold text-brand-white"
          >
            Continue to secure payment →
          </button>
          <p className="mt-2 text-center text-xs text-brand-dark/60">
            Checkout isn&apos;t connected yet. Payment would be processed
            securely by Stripe on the next step once that integration is
            added; this button doesn&apos;t submit anywhere right now.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-brand-primary/15 bg-brand-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
              Your Plan
            </p>
            <p className="mt-1 font-heading text-lg font-bold text-brand-dark">
              {selectedPlan.name}
            </p>
            <p className="mt-1 font-heading text-3xl font-bold text-brand-dark">
              {selectedPlan.price}
              <span className="text-sm font-normal text-brand-dark/60">
                {" "}
                per trademark / month
              </span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark">
              {selectedPlan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-md bg-brand-cream p-3 text-xs text-brand-dark/70">
              Checkout starts your subscription for your first trademark.
              Adding more? Volume pricing applies from 3 trademarks, and
              we&apos;ll confirm it with you by email.
            </p>
          </div>

          <div className="rounded-lg border border-brand-primary/15 bg-brand-white p-6 text-sm text-brand-dark">
            <p className="font-semibold">Secure checkout</p>
            <p className="text-xs text-brand-dark/60">
              Payments would be processed by Stripe once connected.
            </p>
            <p className="mt-3 font-semibold">Cancel anytime</p>
            <p className="text-xs text-brand-dark/60">
              Monthly billing, no contract. Cancelling takes effect at your
              next billing date.
            </p>
            <p className="mt-3 font-semibold">First-month guarantee</p>
            <p className="text-xs text-brand-dark/60">
              If your first month&apos;s report doesn&apos;t deliver clear
              value, we&apos;ll refund your payment in full.
            </p>
            <p className="mt-3 font-semibold">Upgrade anytime</p>
            <p className="text-xs text-brand-dark/60">
              Move from Watch to Watch + Enforce whenever you&apos;re ready.
            </p>
          </div>

          <p className="text-center text-xs text-brand-dark">
            Law firm?{" "}
            <Link href="/law-firms/" className="font-semibold underline">
              Book a law-firm demo →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FieldGroup({
  step,
  title,
  note,
  children,
}: {
  step: number;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="flex items-center gap-2 font-heading text-base font-bold text-brand-dark">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark text-xs text-white">
          {step}
        </span>
        {title}
      </h2>
      {note && <p className="mt-1 text-xs text-brand-dark/60">{note}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function TextField({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase text-brand-dark"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
      />
    </div>
  );
}

function ScanDetailFields({ type }: { type: ScanType }) {
  if (type === "trademark") {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="business-name" label="Business name *" placeholder="Your company" />
          <TextField id="website" label="Website (optional)" placeholder="https://yourbrand.com" />
          <TextField id="brand-name" label="Brand / trademark name *" placeholder="e.g. ACME" />
          <div>
            <label className="block text-xs font-semibold uppercase text-brand-dark">
              How many trademarks? *
            </label>
            <select className="mt-1 w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none">
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-brand-dark">
            What should we protect? *
          </p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-brand-dark">
            <label className="flex items-center gap-2">
              <input type="radio" name="protect-type" className="accent-brand-primary" />
              Words (name or slogan)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="protect-type" className="accent-brand-primary" />
              Logo
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="protect-type" className="accent-brand-primary" />
              Both words and logo
            </label>
          </div>
        </div>
        <TextField
          id="uspto-number"
          label="USPTO serial or registration number (optional, we can look it up)"
          placeholder="e.g. 97123456"
        />
        <div>
          <p className="text-xs font-semibold uppercase text-brand-dark">
            Where do you sell or promote? (select all that apply)
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-brand-dark sm:grid-cols-3">
            {[
              "Own website",
              "Amazon",
              "Etsy",
              "eBay",
              "Walmart",
              "Shopify store",
              "TikTok Shop",
              "Temu",
              "Instagram",
              "TikTok",
              "Facebook",
              "YouTube",
              "Other",
            ].map((channel) => (
              <label key={channel} className="flex items-center gap-2">
                <input type="checkbox" className="accent-brand-primary" />
                {channel}
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "design") {
    return (
      <div className="space-y-4">
        <UploadBox label="Click or drop a photo here" hint="JPG, PNG or WEBP, max 8 MB" />
        <div>
          <p className="text-xs font-semibold uppercase text-brand-dark">
            What to search
          </p>
          <label className="mt-2 flex items-center gap-2 text-sm text-brand-dark">
            <input type="checkbox" defaultChecked className="accent-brand-primary" />
            Photo search
          </label>
          <div className="mt-2 space-y-2 pl-6 text-sm text-brand-dark">
            <label className="flex items-center gap-2">
              <input type="radio" name="design-search" defaultChecked className="accent-brand-primary" />
              Same or similar design (copies, lookalikes and shops selling it)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="design-search" className="accent-brand-primary" />
              Exact same photo (pages that use this exact image)
            </label>
          </div>
          <label className="mt-2 flex items-center gap-2 text-sm text-brand-dark">
            <input type="checkbox" className="accent-brand-primary" />
            All websites, not only shops (for logos, artwork, book covers, app screenshots)
          </label>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-brand-dark">
            Brand name search
          </p>
          <div className="mt-2 grid gap-2">
            <input
              type="text"
              placeholder="Brand name (leave empty to use the brand name above)"
              className="rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
            />
            <input
              type="text"
              placeholder="Your real website (optional)"
              className="rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
            />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-brand-dark">
            {[
              "Shops on Google Shopping",
              "Amazon",
              "eBay",
              "Social media pages selling it",
              "Fake lookalike websites",
              "Facebook & Instagram ads",
            ].map((channel) => (
              <label key={channel} className="flex items-center gap-2">
                <input type="checkbox" className="accent-brand-primary" />
                {channel}
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "face") {
    return (
      <div className="space-y-4">
        <UploadBox
          label="Click or drop your face photo here"
          hint="A clear photo, face looking at the camera, max 8 MB"
        />
        <div>
          <p className="text-xs font-semibold uppercase text-brand-dark">
            Your channels
          </p>
          <label className="mt-2 flex items-center gap-2 text-sm text-brand-dark">
            <input type="checkbox" className="accent-brand-primary" />
            I have no social media accounts
          </label>
          <textarea
            rows={3}
            placeholder={"One per line, for example:\n@yourname\ninstagram.com/yourname\ntiktok.com/@yourname"}
            className="mt-2 w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
          />
        </div>
      </div>
    );
  }

  return <ContentCategoryFields />;
}

type ContentCategory =
  | "app"
  | "business"
  | "author"
  | "musician"
  | "franchise"
  | "photographer"
  | "course"
  | "podcaster";

const CONTENT_CATEGORIES: { id: ContentCategory; label: string }[] = [
  { id: "app", label: "App / software founder" },
  { id: "business", label: "Small business" },
  { id: "author", label: "Author / publisher" },
  { id: "musician", label: "Musician / artist" },
  { id: "franchise", label: "Franchise owner" },
  { id: "photographer", label: "Photographer / stock artist" },
  { id: "course", label: "Course creator / coach" },
  { id: "podcaster", label: "Podcaster" },
];

const CONTENT_FIELDS: Record<
  ContentCategory,
  { heading: string; checks: string[] }
> = {
  app: {
    heading: "About your app",
    checks: [
      "Copycat apps on Google Play",
      "Copycat apps on the Apple App Store",
      "Look-alike websites (domain squatting)",
    ],
  },
  business: {
    heading: "About your business",
    checks: [
      "Copycat listings on marketplaces",
      "Look-alike websites (domain squatting)",
      "Unauthorized use of your branding",
    ],
  },
  author: {
    heading: "About your book",
    checks: [
      "Pirated copies or PDFs",
      "Unauthorized reprints or translations",
      "Look-alike author/publisher pages",
    ],
  },
  musician: {
    heading: "About your music",
    checks: [
      "Unauthorized uploads of your tracks",
      "Unofficial channels using your name",
      "Merch using your name or art without permission",
    ],
  },
  franchise: {
    heading: "About your franchise",
    checks: [
      "Unauthorized use of your franchise name",
      "Look-alike websites (domain squatting)",
      "Unlicensed locations using your brand",
    ],
  },
  photographer: {
    heading: "Your photo",
    checks: [
      "Unauthorized reuse on other sites",
      "Stock sites selling your work without a license",
      "Use in ads without permission",
    ],
  },
  course: {
    heading: "About your course",
    checks: [
      "Leaked or pirated course content",
      "Unauthorized resale on other platforms",
      "Look-alike pages using your course name",
    ],
  },
  podcaster: {
    heading: "About your podcast",
    checks: [
      "Unauthorized re-uploads of episodes",
      "Look-alike channels using your show name",
      "Unlicensed clips used in ads",
    ],
  },
};

function ContentCategoryFields() {
  const [category, setCategory] = useState<ContentCategory>("app");
  const fields = CONTENT_FIELDS[category];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CONTENT_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              category === c.id
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-brand-primary/30 text-brand-dark"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-brand-dark">
          {fields.heading}
        </p>
        <div className="mt-2 space-y-2">
          <input
            type="text"
            placeholder="Name, e.g. your product, company, or title"
            className="w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Your company or publisher name (optional)"
            className="w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Your website (optional)"
            className="w-full rounded-md border border-brand-primary/20 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
          />
        </div>
        <p className="mt-3 text-xs font-semibold uppercase text-brand-dark">
          What to check
        </p>
        <div className="mt-2 space-y-1 text-sm text-brand-dark">
          {fields.checks.map((check) => (
            <label key={check} className="flex items-center gap-2">
              <input type="checkbox" className="accent-brand-primary" />
              {check}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function UploadBox({ label, hint }: { label: string; hint: string }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-brand-primary/30 bg-brand-cream px-6 py-10 text-center">
      <input type="file" accept="image/*" className="sr-only" />
      <span className="text-sm font-semibold text-brand-dark">{label}</span>
      <span className="mt-1 text-xs text-brand-dark/60">{hint}</span>
    </label>
  );
}
