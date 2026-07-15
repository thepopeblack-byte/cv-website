import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import type { BlogBodyImage, BlogPostBody } from "@/data/articles";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href || "#";
      const isExternal = /^https?:\/\//.test(href);

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }

      return <Link href={href}>{children}</Link>;
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as BlogBodyImage;

      if (!image.url) {
        return null;
      }

      const width = image.dimensions?.width || 1400;
      const height = image.dimensions?.height || 900;

      return (
        <figure className="article-inline-image">
          <Image
            src={image.url}
            alt={image.alt || "Article image"}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, 760px"
          />
          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </figure>
      );
    },
  },
};

export function PortableArticle({ body }: { body: BlogPostBody }) {
  if (typeof body === "string") {
    return <p>{body}</p>;
  }

  return <PortableText value={body} components={components} />;
}
