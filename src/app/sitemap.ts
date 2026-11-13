import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { getAllPosts } from "@/lib/posts";

const STATIC_PATHS = [
  "/",
  "/brand-owners/",
  "/law-firms/",
  "/how-it-works/",
  "/pricing/",
  "/get-started/",
  "/book-a-demo/",
  "/contact/",
  "/faq/",
  "/blog/",
  "/weekly-brand-protection/",
  "/welcome/",
  "/privacy-policy/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${SITE_URL}/${post.slug}/`,
    lastModified: post.date,
  }));

  return [...staticEntries, ...postEntries];
}
