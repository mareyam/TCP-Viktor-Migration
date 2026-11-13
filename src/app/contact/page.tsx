import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact page for Trademark Copyright Protection.",
  path: "/contact/",
});

export default function Page() {
  return <PagePlaceholder title="Contact" />;
}
