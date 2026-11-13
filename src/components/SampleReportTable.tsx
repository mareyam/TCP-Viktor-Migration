const SUMMARY = [
  { label: "Total flags", value: 6 },
  { label: "High risk", value: 2 },
  { label: "Medium risk", value: 2 },
  { label: "Low risk", value: 2 },
  { label: "Open", value: 2 },
  { label: "Dismissed", value: 2 },
];

const FINDINGS = [
  {
    brand: "Verdae Outlet",
    product: "Verdae Hydrating Cream (unbranded copy)",
    risk: "High (90)",
    status: "C&D",
    verdict: "Identical word mark on a counterfeit listing, seller not authorized.",
  },
  {
    brand: "DealsHub24",
    product: "Verdae-style serum bundle",
    risk: "High (84)",
    status: "DMCA",
    verdict: "Product photos copied from the official site, mark used to divert search traffic.",
  },
  {
    brand: "VerdaeOfficial (unverified)",
    product: "Social storefront",
    risk: "Medium (58)",
    status: "Monitor",
    verdict: "Impersonation account using the brand logo as its profile image.",
  },
  {
    brand: "Verdai Naturals",
    product: "Verdai botanical oil",
    risk: "Medium (52)",
    status: "Monitor",
    verdict: "One-letter-different mark in the same product class.",
  },
  {
    brand: "Verdae Lighting Co.",
    product: "LED desk lamp",
    risk: "Low (20)",
    status: "Dismiss",
    verdict: "Same word, unrelated class, low likelihood of confusion.",
  },
  {
    brand: "Unknown reseller",
    product: "Verdae gift set (secondhand)",
    risk: "Low (15)",
    status: "Dismiss",
    verdict: "Genuine product resale, first-sale doctrine applies.",
  },
];

export default function SampleReportTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-brand-primary/15 bg-brand-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-brand-dark px-6 py-4 text-brand-white">
        <div>
          <p className="font-heading font-bold">Brand monitoring report</p>
          <p className="text-xs text-brand-cream/70">Verdae Botanicals (sample)</p>
        </div>
        <p className="text-xs text-brand-cream/70">Weekly · Sample Period</p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-brand-primary/10 sm:grid-cols-6">
        {SUMMARY.map((item) => (
          <div key={item.label} className="bg-brand-white p-4 text-center">
            <p className="font-heading text-xl font-bold text-brand-dark">
              {item.value}
            </p>
            <p className="text-xs text-brand-dark/60">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto p-6">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-brand-primary/15 text-xs uppercase text-brand-dark/60">
              <th className="py-2 pr-4">Source</th>
              <th className="py-2 pr-4">Product</th>
              <th className="py-2 pr-4">Risk</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {FINDINGS.map((row) => (
              <tr key={row.brand} className="border-b border-brand-primary/10">
                <td className="py-3 pr-4 font-medium text-brand-dark">
                  {row.brand}
                </td>
                <td className="py-3 pr-4 text-brand-dark">{row.product}</td>
                <td className="py-3 pr-4 text-brand-magenta">{row.risk}</td>
                <td className="py-3 pr-4 text-brand-dark">{row.status}</td>
                <td className="py-3 text-brand-dark">{row.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-6 pb-6 text-xs text-brand-dark/50">
        Sample report with fictional names. Flags are AI-assisted; your
        attorneys make the final legal call.
      </p>
    </div>
  );
}
