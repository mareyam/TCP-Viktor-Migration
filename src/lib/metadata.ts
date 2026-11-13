import type { Metadata } from "next";

export const SITE_URL = "https://trademarkcopyrightprotection.com";
export const SITE_NAME = "Trademark Copyright Protection";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
  };
}
