import { Fragment } from "react";

type Row = {
  feature: string;
  tcp: string;
  topTools: string;
  attorney: string;
  budget: string;
};

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "Monitoring coverage",
    rows: [
      { feature: "Online brand monitoring", tcp: "Weekly", topTools: "Limited", attorney: "—", budget: "—" },
      { feature: "Copyright infringement detection", tcp: "Included", topTools: "—", attorney: "Varies", budget: "—" },
      { feature: "Domain & typosquat monitoring", tcp: "1,000+ TLDs", topTools: "Add-on", attorney: "Extra cost", budget: "—" },
      { feature: "Social media brand monitoring", tcp: "Included", topTools: "—", attorney: "—", budget: "—" },
      { feature: "Marketplace listing monitoring", tcp: "Included", topTools: "—", attorney: "Varies", budget: "—" },
      { feature: "AI-generated content & deepfake detection", tcp: "Included", topTools: "—", attorney: "—", budget: "—" },
    ],
  },
  {
    title: "Interpretation & guidance",
    rows: [
      { feature: "Plain-English verdict on every alert", tcp: "Included", topTools: "—", attorney: "Raw data (billed hourly)", budget: "—" },
      { feature: "Conflict risk scoring (AI-powered)", tcp: "Included", topTools: "—", attorney: "Manual", budget: "—" },
      { feature: "Recommended action for each alert", tcp: "Included", topTools: "—", attorney: "—", budget: "—" },
      { feature: "Your approval before anything is sent", tcp: "Included", topTools: "Basic", attorney: "—", budget: "—" },
    ],
  },
  {
    title: "Enforcement & action",
    rows: [
      { feature: "Active enforcement on your behalf", tcp: "Included", topTools: "—", attorney: "Included (expensive)", budget: "—" },
      { feature: "Pre-filled enforcement templates", tcp: "Included", topTools: "—", attorney: "—", budget: "—" },
      { feature: "Platform takedown filing (Amazon, Meta, etc.)", tcp: "Included", topTools: "—", attorney: "Extra cost", budget: "—" },
      { feature: "DMCA notices", tcp: "Included", topTools: "—", attorney: "—", budget: "—" },
      { feature: "Cease & desist letter generation", tcp: "Included", topTools: "—", attorney: "—", budget: "—" },
    ],
  },
  {
    title: "Portfolio management",
    rows: [
      { feature: "Multi-mark portfolio dashboard", tcp: "Included", topTools: "Limited", attorney: "—", budget: "Basic" },
      { feature: "Copyright asset register", tcp: "Included", topTools: "—", attorney: "Manual", budget: "—" },
    ],
  },
];

const PRICE_ROW = {
  feature: "Monthly price per mark",
  tcp: "$149",
  topTools: "$169+ (limited)",
  attorney: "$300–500",
  budget: "$8–14",
};

export default function FeatureTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-brand-primary/20 text-left">
            <th className="py-3 pr-4 font-heading text-brand-dark">Feature</th>
            <th className="py-3 px-4 font-heading text-brand-primary">TCP</th>
            <th className="py-3 px-4 font-heading text-brand-dark">Top TM tools</th>
            <th className="py-3 px-4 font-heading text-brand-dark">Attorney service</th>
            <th className="py-3 px-4 font-heading text-brand-dark">Budget tools</th>
          </tr>
        </thead>
        <tbody>
          {GROUPS.map((group) => (
            <Fragment key={group.title}>
              <tr className="bg-brand-cream">
                <td colSpan={5} className="py-2 pr-4 font-semibold text-brand-dark">
                  {group.title}
                </td>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.feature} className="border-b border-brand-primary/10">
                  <td className="py-3 pr-4 text-brand-dark">{row.feature}</td>
                  <td className="py-3 px-4 font-semibold text-brand-primary">{row.tcp}</td>
                  <td className="py-3 px-4 text-brand-dark">{row.topTools}</td>
                  <td className="py-3 px-4 text-brand-dark">{row.attorney}</td>
                  <td className="py-3 px-4 text-brand-dark">{row.budget}</td>
                </tr>
              ))}
            </Fragment>
          ))}
          <tr className="border-t-2 border-brand-primary/30 font-bold">
            <td className="py-3 pr-4 text-brand-dark">{PRICE_ROW.feature}</td>
            <td className="py-3 px-4 text-brand-primary">{PRICE_ROW.tcp}</td>
            <td className="py-3 px-4 text-brand-dark">{PRICE_ROW.topTools}</td>
            <td className="py-3 px-4 text-brand-dark">{PRICE_ROW.attorney}</td>
            <td className="py-3 px-4 text-brand-dark">{PRICE_ROW.budget}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
