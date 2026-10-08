import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SubstackSignup } from "@/components/SubstackSignup";
import {
  getBlogPublicationLabel,
  getFeaturedBlogPost,
  isKayodeByline,
  type BlogPost,
} from "@/data/articles";
import { siteDescription, siteUrl } from "@/data/site";
import { getBlogPosts } from "@/lib/sanity";
import { getSanityImageUrl } from "@/sanity/lib/image";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Kayode Popoola",
  description:
    "Original writing, published features, and field notes from Kayode Popoola across AI, privacy, Web3 growth, blockchain intelligence, partnerships, and emerging markets.",
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
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function StoryCard({ post, lead = false }: { post: BlogPost; lead?: boolean }) {
  const imageUrl = getSanityImageUrl(post.coverImage, {
    width: lead ? 1280 : 960,
    height: lead ? 720 : 540,
    quality: 90,
  });
  const titleId = `story-${post.slug}`;

  return (
    <article className={`${styles.story} ${lead ? styles.leadStory : ""}`}>
      <Link
        href={`/blog/${post.slug}`}
        className={styles.storyLink}
        aria-labelledby={titleId}
      >
        {imageUrl ? (
          <div className={styles.imageFrame}>
            <Image
              src={imageUrl}
              alt={post.coverImage?.alt || `Article cover for ${post.title}`}
              fill
              className={styles.coverImage}
              sizes={
                lead
                  ? "(min-width: 1200px) 650px, (min-width: 900px) 58vw, calc(100vw - 40px)"
                  : "(min-width: 1200px) 420px, (min-width: 900px) 37vw, calc(100vw - 40px)"
              }
              priority={lead}
            />
          </div>
        ) : null}
        <div className={styles.storyCopy}>
          <div className={styles.kicker}>
            <span>{getBlogPublicationLabel(post)}</span>
            {post.category ? <span>{post.category}</span> : null}
          </div>
          <h3 id={titleId} className={styles.storyTitle}>
            {post.title}
          </h3>
          <p className={styles.excerpt}>{post.excerpt}</p>
          {lead && post.tags.length ? (
            <ul className={styles.tags} aria-label="Article topics">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
          <div className={styles.byline}>
            <span>By {post.author}</span>
            <span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            {post.readingTime ? <span>{post.readingTime}</span> : null}
          </div>
          <span className={styles.readLink}>
            Read article
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const authoredPosts = posts.filter(isKayodeByline);
  const independentCoverage = posts.filter((post) => !isKayodeByline(post));
  const featuredCoverage =
    independentCoverage.find((post) => post.featured) ?? independentCoverage[0];
  const remainingCoverage = independentCoverage.filter(
    (post) => post.slug !== featuredCoverage?.slug,
  );
  const featuredArticle =
    authoredPosts.find((post) => post.source?.toLowerCase() === "hacken") ??
    getFeaturedBlogPost(authoredPosts);
  const otherArticles = authoredPosts.filter(
    (post) => post.slug !== featuredArticle?.slug,
  );
  const supportingArticles = otherArticles.slice(0, 1);
  const archiveArticles = otherArticles.slice(1);

  return (
    <>
      <Header />
      <main id="main-content" className={`page-layer ${styles.page}`}>
        <Container className={styles.container}>
          <header className={styles.masthead}>
            <div className="meta-stack">Writing &amp; Speaking</div>
            <div className={styles.introduction}>
              <h1 className={styles.title}>Analysis, publication and public conversation.</h1>
              <p className={styles.description}>
                My bylined work on digital trust and commercial technology,
                separate from independent reporting about my career and public speaking.
              </p>
            </div>
          </header>

          {featuredArticle ? (
            <div
              className={`${styles.frontPage} ${supportingArticles.length ? styles.hasSupporting : ""}`}
            >
              <section aria-labelledby="featured-story-heading">
                <h2 id="featured-story-heading" className={styles.sectionLabel}>
                  Featured analysis
                </h2>
                <StoryCard post={featuredArticle} lead />
              </section>
              {supportingArticles.length ? (
                <section aria-labelledby="latest-writing-heading">
                  <h2
                    id="latest-writing-heading"
                    className={styles.sectionLabel}
                  >
                    More by Kayode
                  </h2>
                  <div className={styles.supportingStories}>
                    {supportingArticles.map((post) => (
                      <StoryCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          ) : null}

          {!featuredArticle ? (
            <section className={styles.emptyState}>
              <h2>New writing is being prepared.</h2>
              <p>Published articles will appear here as they are released.</p>
            </section>
          ) : null}

          {archiveArticles.length ? (
            <section
              className={styles.archive}
              aria-labelledby="more-writing-heading"
            >
              <h2 id="more-writing-heading" className={styles.sectionLabel}>
                More by Kayode
              </h2>
              <div className={styles.archiveGrid}>
                {archiveArticles.map((post) => (
                  <StoryCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ) : null}

          {independentCoverage.length ? (
            <section className={styles.archive} aria-labelledby="coverage-heading">
              <h2 id="coverage-heading" className={styles.sectionLabel}>Independent coverage</h2>
              <p className={styles.description}>Reporting about my work, written by others. These are not my bylines.</p>
              {featuredCoverage ? (
                <div className={styles.coverageFeature}>
                  <StoryCard post={featuredCoverage} lead />
                </div>
              ) : null}
              {remainingCoverage.length ? (
                <div className={styles.archiveGrid}>
                  {remainingCoverage.map((post) => <StoryCard key={post.slug} post={post} />)}
                </div>
              ) : null}
            </section>
          ) : null}

          <section className={styles.archive} aria-labelledby="speaking-heading">
            <h2 id="speaking-heading" className={styles.sectionLabel}>Speaking</h2>
            <p className={styles.description}>Selected event appearances and recordings are documented on the expertise page, including the official Cybertech Africa speaker listing.</p>
            <Link href="/expertise#speaking" className="text-link">View speaking evidence <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </section>

          <div className={styles.newsletter}>
            <SubstackSignup variant="compact" location="blog_page" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
