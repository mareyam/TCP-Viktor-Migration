"use client";

import { useState } from "react";

const ATTORNEY_RATE_PER_MARK_PER_MONTH = 500;
const TCP_RATE_PER_MARK_PER_MONTH = 149;

export default function SavingsCalculator() {
  const [marks, setMarks] = useState(3);

  const attorneyAnnual = marks * ATTORNEY_RATE_PER_MARK_PER_MONTH * 12;
  const tcpAnnual = marks * TCP_RATE_PER_MARK_PER_MONTH * 12;
  const savings = attorneyAnnual - tcpAnnual;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="rounded-lg border border-brand-primary/15 bg-brand-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark/60">
          Attorney monitoring vs. TCP
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-brand-dark">Number of trademarks</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMarks((m) => Math.max(1, m - 1))}
              className="h-8 w-8 rounded-md border border-brand-primary/30 text-brand-dark"
              aria-label="Decrease"
            >
              −
            </button>
            <span className="font-heading text-xl font-bold text-brand-dark">
              {marks}
            </span>
            <button
              type="button"
              onClick={() => setMarks((m) => Math.min(50, m + 1))}
              className="h-8 w-8 rounded-md border border-brand-primary/30 text-brand-dark"
              aria-label="Increase"
            >
              +
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-brand-primary/10 pt-4">
          <span className="text-sm text-brand-dark">
            Attorney monitoring
            <span className="block text-xs text-brand-dark/60">
              avg. ${ATTORNEY_RATE_PER_MARK_PER_MONTH}/mo per mark
            </span>
          </span>
          <span className="font-heading text-lg font-bold text-brand-dark">
            ${attorneyAnnual.toLocaleString()}/yr
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-brand-dark">
            TCP
            <span className="block text-xs text-brand-dark/60">
              enforcement included
            </span>
          </span>
          <span className="font-heading text-lg font-bold text-brand-dark">
            ${tcpAnnual.toLocaleString()}/yr
          </span>
        </div>
        <div className="mt-6 rounded-md bg-brand-primary py-6 text-center text-brand-white">
          <p className="font-heading text-3xl font-bold">
            ${savings.toLocaleString()}
          </p>
          <p className="text-xs">your estimated annual savings</p>
        </div>
      </div>
      <div>
        <h3 className="font-heading text-2xl font-bold text-brand-dark">
          Attorney fees don&apos;t scale.{" "}
          <span className="text-brand-primary italic">TCP does.</span>
        </h3>
        <p className="mt-4 text-brand-dark">
          Traditional attorney monitoring is billed per mark, per month, plus
          extra fees for every enforcement action. The bigger your portfolio
          gets, the more it costs.
        </p>
        <p className="mt-3 text-brand-dark">
          A TCP subscription covers monitoring, interpretation, and active
          enforcement, cease-and-desist letters, DMCA notices, and platform
          takedowns, at one flat monthly rate per mark.
        </p>
        <div className="mt-4 border-l-2 border-brand-primary pl-4 text-sm text-brand-dark">
          With an attorney, you pay for their time whether or not a threat
          exists. With TCP, one flat rate covers monitoring, interpretation,
          and enforcement every month.
        </div>
      </div>
    </div>
  );
}
