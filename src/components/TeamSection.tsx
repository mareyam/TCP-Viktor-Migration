import Image from "next/image";
import StatsGrid from "./StatsGrid";

const TEAM = [
  { name: "Sarah Chen", image: "/images/headshot_sarah_chen-300x300.png" },
  { name: "Michael Torres", image: "/images/headshot_michael_torres-300x300.png" },
  { name: "Rachel Adams", image: "/images/headshot_rachel_adams-300x300.png" },
];

export default function TeamSection() {
  return (
    <div className="bg-brand-dark py-16 text-brand-white">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Image
            src="/images/brand_team-1024x683.png"
            alt="The Trademark Copyright Protection team"
            width={1024}
            height={683}
            className="w-full rounded-lg"
          />
          <div className="mt-6 flex gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="mx-auto h-14 w-14 rounded-full object-cover"
                />
                <p className="mt-2 text-xs font-semibold text-brand-cream">
                  {member.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
            — Your Weekly Report
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold">
            We built this because we couldn&apos;t find an affordable way to
            monitor our own IP.
          </h2>
          <p className="mt-4 text-brand-cream/90">
            We&apos;re business and technology people who spent years unable
            to afford trademark and copyright monitoring — attorneys were
            charging hundreds of dollars a month per mark, for little more
            than a raw spreadsheet of alerts we still had to chase down
            ourselves.
          </p>
          <p className="mt-3 text-brand-cream/90">
            We knew how to build the monitoring technology, how AI could
            handle the interpretation, and how enforcement decisions could be
            systematized — so we built it ourselves, to make real IP
            protection affordable for everyone.
          </p>
          <StatsGrid />
        </div>
      </div>
    </div>
  );
}
