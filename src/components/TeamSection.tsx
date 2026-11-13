import Image from "next/image";

const TEAM = [
  { name: "Sarah Chen", image: "/images/headshot_sarah_chen-300x300.png" },
  { name: "Michael Torres", image: "/images/headshot_michael_torres-300x300.png" },
  { name: "Rachel Adams", image: "/images/headshot_rachel_adams-300x300.png" },
];

export default function TeamSection() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <Image
          src="/images/brand_team-1024x683.png"
          alt="The Trademark Copyright Protection team"
          width={1024}
          height={683}
          className="w-full rounded-lg"
        />
      </div>
      <div>
        <h3 className="font-heading text-2xl font-bold text-brand-dark">
          We built this because we couldn&apos;t find an affordable way to
          monitor our own IP.
        </h3>
        <p className="mt-4 text-brand-dark">
          TCP is built by a small team of business and technology
          professionals who wanted trademark and copyright protection that
          didn&apos;t cost a fortune.
        </p>
        <div className="mt-6 flex gap-6">
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
    </div>
  );
}
