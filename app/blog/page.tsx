import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SubstackSignup } from "@/components/SubstackSignup";
import { siteDescription, siteUrl } from "@/data/site";
import { getBlogPosts } from "@/lib/sanity";
import { getSanityImageUrl } from "@/sanity/lib/image";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Kayode Popoola",
  description:
    "Original writing and field notes from Kayode Popoola across AI, privacy, Web3 growth, blockchain intelligence, partnerships, and emerging markets.",
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
  }).format(new Date(date));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredArticle = posts.find((post) => post.featured) ?? posts[0];
  const otherArticles = posts.filter(
    (post) => post.slug !== featuredArticle?.slug,
  );
  const featuredImageUrl = featuredArticle
    ? getSanityImageUrl(featuredArticle.coverImage, {
        width: 1280,
        height: 720,
        quality: 90,
      })
    : null;

  return (
    <>
      <Header />
      <main id="main-content" className="page-layer blog-page pb-10">
        <section className="page-layer py-14 md:py-16 lg:py-14">
          <Container>
            <div className="section-frame blog-hero">
              <div className="meta-stack">Original writing / Field notes</div>
              <div className="mt-5 grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
                <h1 className="blog-title">From the Desk of Kayode Popoola</h1>
                <p className="section-copy blog-intro">
                  Original essays and field notes across AI, privacy, Web3
                  growth, blockchain intelligence, partnerships, and emerging
                  markets.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {featuredArticle ? (
          <section className="page-layer py-8 md:py-10">
            <Container>
              <article className="article-feature">
                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="article-card-link article-feature-link"
                  aria-label={`Read ${featuredArticle.title}`}
                >
                  {featuredImageUrl ? (
                    <div className="article-feature-image">
                      <Image
                        src={featuredImageUrl}
                        alt={
                          featuredArticle.coverImage?.alt ||
                          `Article cover for ${featuredArticle.title}`
                        }
                        fill
                        className="article-cover-image object-cover"
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        priority
                      />
                    </div>
                  ) : null}
                  <div className="article-feature-copy">
                    <div className="article-eyebrow">
                      {featuredArticle.category ? (
                        <span>{featuredArticle.category}</span>
                      ) : null}
                      <span>Original</span>
                      <span>By {featuredArticle.author}</span>
                      <span>{formatDate(featuredArticle.date)}</span>
                      <span>{featuredArticle.readingTime}</span>
                    </div>
                    <h2>{featuredArticle.title}</h2>
                    <p>{featuredArticle.excerpt}</p>
                    <div className="article-tag-row">
                      {featuredArticle.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className="article-read-indicator text-link">
                      Read article
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            </Container>
          </section>
        ) : null}

        {!featuredArticle ? (
          <section className="page-layer py-8 md:py-10">
            <Container>
              <div className="blog-empty-state">
                <h2>New writing is being prepared.</h2>
                <p>Published articles will appear here as they are released.</p>
              </div>
            </Container>
          </section>
        ) : null}

        <section className="page-layer py-10 md:py-14">
          <Container>
            <SubstackSignup variant="compact" location="blog_page" />
          </Container>
        </section>

        {otherArticles.length ? (
          <section className="page-layer py-8 md:py-10">
            <Container>
              <div className="article-list-heading">
                <div className="meta-stack">Latest writing</div>
                <h2>Latest writing</h2>
              </div>
              <MobileSwipeRegion
                className="article-grid"
                label="Latest writing from Kayode Popoola"
              >
                {otherArticles.map((article) => {
                  const imageUrl = getSanityImageUrl(article.coverImage, {
                    width: 960,
                    height: 540,
                  });

                  return (
                    <article key={article.slug} className="article-card">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="article-card-link"
                        aria-label={`Read ${article.title}`}
                      >
                        {imageUrl ? (
                          <div className="article-card-image">
                            <Image
                              src={imageUrl}
                              alt={
                                article.coverImage?.alt ||
                                `Article cover for ${article.title}`
                              }
                              fill
                              className="article-cover-image object-cover"
                              sizes="(min-width: 768px) 42vw, 88vw"
                            />
                          </div>
                        ) : null}
                        <div className="article-eyebrow">
                          {article.category ? (
                            <span>{article.category}</span>
                          ) : null}
                          <span>Original</span>
                          <span>{formatDate(article.date)}</span>
                          <span>{article.readingTime}</span>
                        </div>
                        <h2>{article.title}</h2>
                        <p>{article.excerpt}</p>
                        <span className="article-read-indicator text-link">
                          Read article
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </span>
                      </Link>
                    </article>
                  );
                })}
              </MobileSwipeRegion>
            </Container>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
