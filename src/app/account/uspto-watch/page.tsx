import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { usptoFlags } from "@/lib/uspto/flags";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  if (!usptoFlags().lookup) {
    return {
      ...pageMetadata({
        title: "Page",
        description: "This page is not available.",
        path: "/account/uspto-watch/",
      }),
      robots: { index: false, follow: false },
    };
  }
  return {
    ...pageMetadata({
      title: "US trademark watch",
      description: "Private page for a signed-in US trademark record watch.",
      path: "/account/uspto-watch/",
    }),
    robots: { index: false, follow: false },
  };
}

export default function UsptoWatchPage() {
  if (!usptoFlags().lookup) notFound();

  return (
    <Section>
      <h1 className="font-heading text-3xl font-bold text-brand-dark">
        US trademark watch
      </h1>
      <p className="mt-4 max-w-2xl text-brand-dark">
        Record lookup is switched on, and customer sign-in is not configured
        in this site. No watchlist is shown and no USPTO record is requested
        from this page.
      </p>
    </Section>
  );
}
