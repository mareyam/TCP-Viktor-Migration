import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "Book a Demo",
  description: "Book a Demo page for Trademark Copyright Protection.",
  path: "/book-a-demo/",
});

export default function Page() {
  return <PagePlaceholder title="Book a Demo" />;
}
