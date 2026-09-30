import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { getBlogPublicationLabel, getFeaturedBlogPost, isKayodeByline, type BlogPost } from "@/data/articles";
import { getBlogPosts } from "@/lib/sanity";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export async function LatestWriting() {
  const posts = await getBlogPosts();
  const authoredPosts = posts.filter(isKayodeByline);
  const leadPost =
    authoredPosts.find((post) => post.source?.toLowerCase() === "hacken") ??
    getFeaturedBlogPost(authoredPosts);
  const secondPost =
    authoredPosts.find((post) => post.slug === "your-ai-agent-knows-too-much" && post.slug !== leadPost?.slug) ??
    authoredPosts.find((post) => post.contentType === "original" && post.slug !== leadPost?.slug) ??
    posts.find((post) => post.slug !== leadPost?.slug);
  const featuredPosts = [leadPost, secondPost].filter(
    (post): post is BlogPost => Boolean(post),
  );

  if (!featuredPosts.length) {
    return null;
  }

  return (
    <section
      id="writing"
      data-nav-group="blog"
      data-scene-label="Writing"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <Container>
        <SectionReveal className="section-frame writing-preview">
          <div className="meta-stack">Writing</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Latest Writing & Features</h2>
              <p className="section-copy">
                Selected analysis on digital trust, financial crime and
                technology adoption. Explore the full archive on the blog.
              </p>
              <Link
                href="/blog"
                className="text-link mt-6 inline-flex items-center gap-2"
              >
                View all posts
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <MobileSwipeRegion
              className="writing-preview-list"
              label="Featured writing"
            >
              {featuredPosts.map((post) => (
                <article key={post.slug} className="writing-preview-item">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="article-card-link writing-preview-link"
                    aria-label={`Read ${post.title}`}
                  >
                    <div className="article-eyebrow">
                      <span>{getBlogPublicationLabel(post)}</span>
                      <span>
                        {post.contentType === "external" ? "Added " : ""}
                        {formatDate(post.date)}
                      </span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="article-read-indicator text-link">
                      Read article
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </span>
                  </Link>
                </article>
              ))}
            </MobileSwipeRegion>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
