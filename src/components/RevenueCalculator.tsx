"use client";

import { useState } from "react";
import Link from "next/link";

export default function RevenueCalculator() {
  const [clients, setClients] = useState(30);
  const [pricePerClient, setPricePerClient] = useState(250);
  const [costPerClient, setCostPerClient] = useState(85);

  const monthlyProfit = clients * (pricePerClient - costPerClient);
  const annualProfit = monthlyProfit * 12;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — Run Your Numbers
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark">
          Your price. <span className="text-brand-primary italic">Your margin.</span>
        </h2>
        <p className="mt-4 text-brand-dark">
          Enter what you&apos;d charge clients each month and see what
          monitoring could add to your firm every year.
        </p>
        <div className="mt-6">
          <Button />
        </div>
      </div>

      <div className="rounded-lg border border-brand-primary/15 bg-brand-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          Revenue Calculator
        </p>
        <h3 className="mt-1 font-heading text-lg font-bold text-brand-dark">
          What could monitoring add to your firm?
        </h3>

        <div className="mt-5 space-y-4">
          <Field
            label="Clients enrolled"
            value={clients}
            onChange={setClients}
          />
          <Field
            label="Your monthly price per client"
            value={pricePerClient}
            onChange={setPricePerClient}
            prefix="$"
          />
          <Field
            label="Your TCP cost per client"
            value={costPerClient}
            onChange={setCostPerClient}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex items-center justify-between rounded-md bg-brand-cream p-5">
          <div>
            <p className="font-heading text-3xl font-bold text-brand-magenta">
              ${annualProfit.toLocaleString()}
            </p>
            <p className="text-xs text-brand-dark/70">your profit per year</p>
          </div>
          <div className="text-right">
            <p className="font-heading text-xl font-bold text-brand-dark">
              ${monthlyProfit.toLocaleString()}
            </p>
            <p className="text-xs text-brand-dark/70">per month</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-brand-dark/60">
          Example figures. Enter your own. Your actual TCP cost is confirmed
          in the demo. An estimate, not a forecast.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm text-brand-dark">{label}</label>
      <div className="flex items-center gap-1 rounded-md border border-brand-primary/20 px-3 py-1.5">
        {prefix && <span className="text-sm text-brand-dark/60">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-20 text-right text-sm text-brand-dark focus:outline-none"
        />
      </div>
    </div>
  );
}

function Button() {
  return (
    <Link
      href="/book-a-demo/"
      className="inline-flex items-center justify-center rounded-md bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-white hover:bg-brand-dark"
    >
      Book a Demo →
    </Link>
  );
}
