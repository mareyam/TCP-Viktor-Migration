import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Section from "@/components/Section";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return pageMetadata({
      title: "Not Found",
      description: "This page could not be found.",
      path: `/${slug}/`,
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/${post.slug}/`,
    image: post.image,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Section>
      <article className="prose">
        <h1 className="font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-brand-dark/70">{post.date}</p>
        <div className="mt-6 whitespace-pre-wrap text-brand-dark">
          {post.content}
        </div>
      </article>
    </Section>
  );
}
