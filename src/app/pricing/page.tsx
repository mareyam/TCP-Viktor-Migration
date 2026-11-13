import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description: "Pricing page for Trademark Copyright Protection.",
  path: "/pricing/",
});

export default function Page() {
  return <PagePlaceholder title="Pricing" />;
}
