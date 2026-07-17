import type {
  BlogContentType,
  BlogPost,
  BlogPostVisibility,
} from "@/data/articles";
import { sanityClient } from "@/sanity/lib/client";

const publishedPostFilter = `
  _type == "post" &&
  !(_id in path("drafts.**")) &&
  defined(slug.current) &&
  (!defined(publishedAt) || publishedAt <= now())
`;

const publicOriginalPostFilter = `
  ${publishedPostFilter} &&
  (!defined(visibility) || visibility == "public") &&
  (!defined(contentType) || contentType == "original")
`;

const postProjection = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  _createdAt,
  "date": coalesce(publishedAt, _createdAt),
  type,
  contentType,
  visibility,
  category,
  source,
  author,
  excerpt,
  body[]{
    ...,
    markDefs[]{...},
    _type == "image" => {
      "url": asset->url,
      "assetId": asset->_id,
      "dimensions": asset->metadata.dimensions
    }
  },
  tags,
  coverImage{
    ...,
    asset,
    "assetData": asset->{
      _id,
      url,
      metadata{dimensions}
    }
  },
  externalUrl,
  readingTime,
  featured
}`;

function normalizePost(post: Partial<BlogPost>): BlogPost | null {
  if (!post._id || !post.title || !post.slug || !post.excerpt || !post.date) {
    return null;
  }

  const contentType: BlogContentType =
    post.contentType === "external" || post.type === "Featured"
      ? "external"
      : "original";
  const visibility: BlogPostVisibility =
    post.visibility === "hidden" || post.visibility === "archived"
      ? post.visibility
      : "public";

  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    date: post.date,
    publishedAt: post.publishedAt || undefined,
    _createdAt: post._createdAt || undefined,
    type: contentType === "external" ? "Featured" : "Original",
    contentType,
    visibility,
    category: post.category || undefined,
    source: post.source || undefined,
    author: post.author || "Kayode Popoola",
    excerpt: post.excerpt,
    body: post.body ?? post.excerpt,
    tags: (post.tags || []).map((tag) => tag.trim()).filter(Boolean),
    coverImage: post.coverImage,
    externalUrl: post.externalUrl,
    readingTime: post.readingTime || "3 min read",
    featured: Boolean(post.featured),
  };
}

async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: {
        revalidate: 60,
        tags: ["sanity:posts"],
      },
    });
  } catch {
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const sanityPosts = await sanityFetch<Array<Partial<BlogPost>>>(
    `*[${publicOriginalPostFilter}] | order(coalesce(publishedAt, _createdAt) desc) ${postProjection}`,
  );

  return (
    sanityPosts
      ?.map((post) => normalizePost(post))
      .filter((post): post is BlogPost => Boolean(post)) ?? []
  );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const sanityPost = await sanityFetch<Partial<BlogPost>>(
    `*[${publishedPostFilter} && slug.current == $slug][0] ${postProjection}`,
    { slug },
  );
  const normalizedPost = sanityPost ? normalizePost(sanityPost) : null;

  return normalizedPost;
}
