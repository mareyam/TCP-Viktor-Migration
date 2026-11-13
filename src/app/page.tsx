import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PagePlaceholder from "@/components/PagePlaceholder";
import CTA from "@/components/CTA";

export const metadata: Metadata = pageMetadata({
  title: "Home",
  description: "Protecting brands from counterfeiting, trademark infringement, and copyright theft.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <PagePlaceholder title="Trademark Copyright Protection" />
      <CTA />
    </>
  );
}
