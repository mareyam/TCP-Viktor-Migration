import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "Brand Owners",
  description: "Brand Owners page for Trademark Copyright Protection.",
  path: "/brand-owners/",
});

export default function Page() {
  return <PagePlaceholder title="Brand Owners" />;
}
