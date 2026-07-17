import type { PortableTextBlock } from "@portabletext/react";

export type BlogPostType = "Original" | "Featured";
export type BlogPostVisibility = "public" | "hidden" | "archived";
export type BlogContentType = "original" | "external";

export type BlogImage = {
  _type?: "image";
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
        aspectRatio?: number;
      };
    };
  };
  assetData?: {
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
        aspectRatio?: number;
      };
    };
  };
  crop?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  alt?: string;
  caption?: string;
};

export type BlogBodyImage = {
  _type: "image";
  _key: string;
  url?: string;
  assetId?: string;
  alt?: string;
  caption?: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio?: number;
  };
};

export type BlogPostBody = string | Array<PortableTextBlock | BlogBodyImage>;

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  publishedAt?: string;
  _createdAt?: string;
  type: BlogPostType;
  contentType: BlogContentType;
  visibility: BlogPostVisibility;
  category?: string;
  source?: string;
  author: string;
  excerpt: string;
  body: BlogPostBody;
  tags: string[];
  coverImage?: BlogImage;
  externalUrl?: string;
  readingTime: string;
  featured: boolean;
};
