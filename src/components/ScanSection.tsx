import Image from "next/image";
import PlatformBadges from "./PlatformBadges";

export default function ScanSection() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="overflow-hidden rounded-lg">
        <Image
          src="/images/brand_team-1024x683.png"
          alt="Team reviewing brand monitoring data"
          width={1024}
          height={683}
          className="w-full rounded-lg"
        />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          — Global Coverage
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark">
          Full coverage, so nothing slips through.
        </h2>
        <p className="mt-4 text-brand-dark">
          Every week we check domain registries, social platforms, marketplace
          listings, and the open web for anything that touches your brand,
          trademark, or copyrighted content.
        </p>
        <p className="mt-3 text-brand-dark">
          Most issues are caught and resolved before you&apos;d ever notice
          them yourself.
        </p>
        <div className="mt-6">
          <PlatformBadges />
        </div>
      </div>
    </div>
  );
}
