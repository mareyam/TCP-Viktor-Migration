import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "Welcome",
  description: "Welcome page for Trademark Copyright Protection.",
  path: "/welcome/",
});

export default function Page() {
  return <PagePlaceholder title="Welcome" />;
}
