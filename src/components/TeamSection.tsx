import Image from "next/image";

const TEAM = [
  { name: "Sarah Chen", image: "/images/headshot_sarah_chen-300x300.png" },
  { name: "Michael Torres", image: "/images/headshot_michael_torres-300x300.png" },
  { name: "Rachel Adams", image: "/images/headshot_rachel_adams-300x300.png" },
];

export default function TeamSection() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
        — Why We Built This
      </p>
      <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark">
        We couldn&apos;t find an affordable way to monitor our own trademarks
        — so we built one.
      </h2>
      <p className="mt-4 text-brand-dark">
        TCP comes from a small team of business and technology people who got
        tired of paying attorney-level fees for not much more than a raw
        spreadsheet of alerts. We built the monitoring, the AI interpretation,
        and the enforcement workflow ourselves, so protecting a trademark
        doesn&apos;t have to cost more than it&apos;s worth.
      </p>
      <div className="mt-8 flex justify-center gap-8">
        {TEAM.map((member) => (
          <div key={member.name} className="text-center">
            <Image
              src={member.image}
              alt={member.name}
              width={300}
              height={300}
              className="mx-auto h-16 w-16 rounded-full object-cover"
            />
            <p className="mt-2 text-xs font-semibold text-brand-dark">
              {member.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
