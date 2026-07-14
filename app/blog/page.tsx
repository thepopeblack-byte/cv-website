import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteDescription, siteUrl } from "@/data/site";
import { getBlogPosts } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blog | Kayode Popoola",
  description:
    "Ideas, field notes, and featured coverage from Kayode Popoola across Web3 growth, blockchain intelligence, partnerships, and emerging markets.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "From the Desk of Kayode Popoola",
    description: siteDescription,
    url: `${siteUrl}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "From the Desk of Kayode Popoola",
    description: siteDescription,
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredArticle = posts.find((post) => post.featured) ?? posts[0];
  const otherArticles = posts.filter(
    (post) => post.slug !== featuredArticle?.slug,
  );

  return (
    <>
      <Header />
      <main id="main-content" className="page-layer blog-page pb-10">
        <section className="page-layer py-14 md:py-16 lg:py-14">
          <Container>
            <div className="section-frame blog-hero">
              <div className="meta-stack">Editorial / Features / Field Notes</div>
              <div className="mt-5 grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
                <h1 className="blog-title">
                  From the Desk of Kayode Popoola
                </h1>
                <p className="section-copy blog-intro">
                  Ideas, field notes, and featured coverage across Web3 growth,
                  blockchain intelligence, partnerships, and emerging markets.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {featuredArticle ? (
          <section className="page-layer py-8 md:py-10">
            <Container>
              <article className="article-feature">
                <div>
                  <div className="article-eyebrow">
                    <span>{featuredArticle.type}</span>
                    <span>By {featuredArticle.author}</span>
                    <span>{formatDate(featuredArticle.date)}</span>
                    <span>{featuredArticle.readingTime}</span>
                    {featuredArticle.externalUrl ? (
                      <span>Externally published</span>
                    ) : (
                      <span>Original</span>
                    )}
                  </div>
                  <h2>{featuredArticle.title}</h2>
                  <p>{featuredArticle.excerpt}</p>
                  <div className="article-tag-row">
                    {featuredArticle.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="article-action-row">
                    <Link
                      href={`/blog/${featuredArticle.slug}`}
                      className="button-primary"
                    >
                      Read article
                    </Link>
                    {featuredArticle.externalUrl ? (
                      <Link
                        href={featuredArticle.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bracket-link inline-flex items-center gap-2"
                      >
                        [Read from source]
                        <ArrowUpRight size={13} />
                      </Link>
                    ) : null}
                  </div>
                </div>
                <div className="article-source-panel">
                  <div className="meta-stack">Source</div>
                  <p>{featuredArticle.source ?? "Kayode Popoola"}</p>
                  <span>{featuredArticle.type} coverage</span>
                </div>
              </article>
            </Container>
          </section>
        ) : null}

        {otherArticles.length ? (
          <section className="page-layer py-8 md:py-10">
            <Container>
              <div className="article-grid">
                {otherArticles.map((article) => (
                  <article key={article.slug} className="article-card">
                    <div className="article-eyebrow">
                      <span>{article.type}</span>
                      <span>By {article.author}</span>
                      <span>{formatDate(article.date)}</span>
                      <span>{article.readingTime}</span>
                      {article.externalUrl ? (
                        <span>Externally published</span>
                      ) : (
                        <span>Original</span>
                      )}
                    </div>
                    <h2>{article.title}</h2>
                    <p>{article.excerpt}</p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="bracket-link inline-flex items-center gap-2"
                    >
                      [Read article]
                      <ArrowUpRight size={13} />
                    </Link>
                  </article>
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
