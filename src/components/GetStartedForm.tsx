"use client";

import { useSearchParams } from "next/navigation";

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

export default function GetStartedForm() {
  const searchParams = useSearchParams();
  const requestedPlan = searchParams.get("plan");
  const isEnforce = requestedPlan === "enforce";

  return (
    <>
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
              <input
                type="radio"
                name="plan"
                value="watch"
                defaultChecked={!isEnforce}
                className="accent-brand-primary"
              />
              Watch ($149/mo)
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-dark">
              <input
                type="radio"
                name="plan"
                value="enforce"
                defaultChecked={isEnforce}
                className="accent-brand-primary"
              />
              Watch + Enforce ($199/mo)
            </label>
          </div>
        </div>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-md bg-brand-primary/40 px-5 py-3 text-sm font-semibold text-brand-white"
        >
          Continue to Checkout →
        </button>
        <p className="text-xs text-brand-dark/60">
          Checkout isn&apos;t connected yet. This form is a placeholder for
          the migration foundation; no payment provider is wired up, so this
          button doesn&apos;t submit anywhere.
        </p>
      </form>
    </>
  );
}
