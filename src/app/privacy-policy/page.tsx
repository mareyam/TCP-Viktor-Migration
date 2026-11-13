import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy page for Trademark Copyright Protection.",
  path: "/privacy-policy/",
});

export default function Page() {
  return <PagePlaceholder title="Privacy Policy" />;
}
