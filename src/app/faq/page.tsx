import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description: "FAQ page for Trademark Copyright Protection.",
  path: "/faq/",
});

export default function Page() {
  return <PagePlaceholder title="FAQ" />;
}
