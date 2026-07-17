import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PortableArticle } from "@/components/PortableArticle";
import { SubstackSignup } from "@/components/SubstackSignup";
import type { BlogBodyImage, BlogPostBody } from "@/data/articles";
import { siteName, siteUrl } from "@/data/site";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity";
import { getSanityImageUrl } from "@/sanity/lib/image";

export const revalidate = 60;

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
  }).format(new Date(date));
}

function withoutDuplicateCoverImage(
  body: BlogPostBody,
  coverAssetId: string | undefined,
): BlogPostBody {
  if (!Array.isArray(body) || !coverAssetId) {
    return body;
  }

  return body.filter((block) => {
    const image = block as BlogBodyImage;
    return image._type !== "image" || image.assetId !== coverAssetId;
  });
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
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

  const socialImage = getSanityImageUrl(post.coverImage, {
    width: 1200,
    height: 630,
    quality: 90,
  });

  return {
    title: `${post.title} | Kayode Popoola`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: socialImage ?? `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.coverImage?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [socialImage ?? `${siteUrl}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverImageUrl = getSanityImageUrl(post.coverImage, {
    width: 1600,
    height: 900,
    quality: 90,
  });
  const articleBody = withoutDuplicateCoverImage(
    post.body,
    post.coverImage?.assetData?._id ??
      post.coverImage?.asset?._id ??
      post.coverImage?.asset?._ref,
  );

  const articleJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Kayode Popoola",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
    image: coverImageUrl ?? `${siteUrl}/opengraph-image`,
    keywords: post.tags.join(", "),
    ...(post.externalUrl ? { isBasedOn: post.externalUrl } : {}),
  }).replace(/</g, "\\u003c");

  return (
    <>
      <Header />
      <main id="main-content" className="page-layer blog-page pb-10">
        <article className="page-layer py-14 md:py-16 lg:py-14">
          <Container>
            <div className="article-detail">
              <Link href="/blog" className="text-link inline-flex gap-2">
                <ArrowLeft size={13} />
                All posts
              </Link>

              <div className="article-eyebrow mt-8">
                <span>
                  {post.contentType === "external" ? "External" : "Original"}
                </span>
                <span>By {post.author}</span>
                <span>{formatDate(post.date)}</span>
                <span>{post.readingTime}</span>
                {post.contentType === "external" && post.source ? (
                  <span>{post.source}</span>
                ) : null}
              </div>

              <h1>{post.title}</h1>
              <p className="article-standfirst">{post.excerpt}</p>

              <div className="article-tag-row">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {coverImageUrl ? (
                <figure className="article-cover-figure">
                  <div className="article-cover-frame">
                    <Image
                      src={coverImageUrl}
                      alt={
                        post.coverImage?.alt ||
                        `Article cover for ${post.title}`
                      }
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 767px) 100vw, 880px"
                    />
                  </div>
                  {post.coverImage?.caption ? (
                    <figcaption>{post.coverImage.caption}</figcaption>
                  ) : null}
                </figure>
              ) : null}

              <div className="article-body">
                <PortableArticle body={articleBody} />
              </div>

              {post.contentType === "original" ? (
                <SubstackSignup
                  variant="compact"
                  location="article_footer"
                  className="article-substack-signup"
                />
              ) : null}

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
                {post.tags.includes("Newsletter") ? (
                  <Link href="/newsletter" className="text-link">
                    The Popeblack Brief archive
                  </Link>
                ) : null}
              </div>
            </div>
          </Container>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <Footer />
    </>
  );
}
