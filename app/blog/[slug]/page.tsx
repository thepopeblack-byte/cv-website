import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  getBlogPostBySlug,
  getLocalBlogPostSlugs,
} from "@/lib/sanity";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function generateStaticParams() {
  return getLocalBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article | Kayode Popoola",
    };
  }

  return {
    title: `${post.title} | Kayode Popoola`,
    description: post.excerpt,
    alternates: {
      canonical: `https://popeblack.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" className="page-layer blog-page pb-10">
        <article className="page-layer py-14 md:py-16 lg:py-14">
          <Container>
            <div className="article-detail">
              <Link href="/blog" className="bracket-link inline-flex gap-2">
                <ArrowLeft size={13} />
                [All posts]
              </Link>

              <div className="article-eyebrow mt-8">
                <span>{post.type}</span>
                <span>{formatDate(post.date)}</span>
                <span>{post.readingTime}</span>
                {post.source ? <span>{post.source}</span> : null}
              </div>

              <h1>{post.title}</h1>
              <p className="article-standfirst">{post.excerpt}</p>

              <div className="article-tag-row">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="article-body">
                <p>{post.body}</p>

                {post.whyItMatters ? (
                  <section>
                    <h2>Why it matters</h2>
                    <p>{post.whyItMatters}</p>
                  </section>
                ) : null}

                {post.keyContext?.length ? (
                  <section>
                    <h2>Key context</h2>
                    <ul>
                      {post.keyContext.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>

              <div className="article-action-row article-detail-actions">
                {post.externalUrl ? (
                  <Link
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary"
                  >
                    Read from source
                    <ArrowUpRight size={16} />
                  </Link>
                ) : null}
                <Link href="/blog" className="button-secondary">
                  More writing
                </Link>
              </div>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
