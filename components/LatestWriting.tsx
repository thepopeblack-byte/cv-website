import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { getBlogPosts } from "@/lib/sanity";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export async function LatestWriting() {
  const posts = await getBlogPosts();
  const featuredPosts = posts.slice(0, 2);

  if (!featuredPosts.length) {
    return null;
  }

  return (
    <section
      id="writing"
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
                A concise reading room for field notes, featured coverage, and
                future essays across Web3 growth, intelligence, and emerging
                markets.
              </p>
              <Link
                href="/blog"
                className="bracket-link mt-6 inline-flex items-center gap-2"
              >
                [View all posts]
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <MobileSwipeRegion
              className="writing-preview-list"
              label="Latest writing and featured coverage"
            >
              {featuredPosts.map((post) => (
                <article key={post.slug} className="writing-preview-item">
                  <div className="article-eyebrow">
                    <span>{post.type}</span>
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="article-action-row">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="bracket-link inline-flex items-center gap-2"
                    >
                      [Read article]
                      <ArrowUpRight size={13} />
                    </Link>
                    {post.externalUrl ? (
                      <Link
                        href={post.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bracket-link inline-flex items-center gap-2"
                      >
                        [Source]
                        <ArrowUpRight size={13} />
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </MobileSwipeRegion>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
