import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import Section from "@/components/Section";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "News, insights, and updates on brand protection.",
  path: "/blog/",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <h1 className="font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
        Blog
      </h1>
      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/${post.slug}/`}
              className="font-heading text-xl font-semibold text-brand-primary hover:underline"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-brand-dark">{post.description}</p>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="text-brand-dark">No posts yet.</li>
        )}
      </ul>
    </Section>
  );
}
