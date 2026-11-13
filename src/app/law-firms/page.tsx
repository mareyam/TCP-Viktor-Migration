import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "Law Firms",
  description: "Law Firms page for Trademark Copyright Protection.",
  path: "/law-firms/",
});

export default function Page() {
  return <PagePlaceholder title="Law Firms" />;
}
