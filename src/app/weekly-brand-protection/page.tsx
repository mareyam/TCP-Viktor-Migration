import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "Weekly Brand Protection",
  description: "Weekly Brand Protection page for Trademark Copyright Protection.",
  path: "/weekly-brand-protection/",
});

export default function Page() {
  return <PagePlaceholder title="Weekly Brand Protection" />;
}
