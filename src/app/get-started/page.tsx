import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "Get Started",
  description: "Get Started page for Trademark Copyright Protection.",
  path: "/get-started/",
});

export default function Page() {
  return <PagePlaceholder title="Get Started" />;
}
