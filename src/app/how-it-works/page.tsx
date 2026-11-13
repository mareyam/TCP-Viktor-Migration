import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "How It Works",
  description: "How It Works page for Trademark Copyright Protection.",
  path: "/how-it-works/",
});

export default function Page() {
  return <PagePlaceholder title="How It Works" />;
}
