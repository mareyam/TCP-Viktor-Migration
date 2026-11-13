import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import GetStartedEmbed from "@/components/get-started/GetStartedEmbed";

export const metadata: Metadata = pageMetadata({
  title: "Get Started",
  description: "Start protecting your brand today. Pick a plan and tell us what to monitor.",
  path: "/get-started/",
});

export default function GetStartedPage() {
  return <GetStartedEmbed />;
}
