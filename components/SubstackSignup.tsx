"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { newsletterConfig, type NewsletterLocation } from "@/data/newsletter";
import { trackEvent } from "@/lib/analytics";

type SubstackSignupProps = {
  variant: "full" | "compact";
  location: NewsletterLocation;
  className?: string;
};

type CompactContent = {
  heading: string;
  description: string;
  primaryLabel: string;
  secondaryLabel?: string;
};

const compactContent: Record<
  Exclude<NewsletterLocation, "newsletter_page">,
  CompactContent
> = {
  homepage: {
    heading: "The Popeblack Brief",
    description:
      "Clear insights on AI, privacy, financial crime, strategic partnerships and emerging-market growth.",
    primaryLabel: "Subscribe to The Popeblack Brief",
    secondaryLabel: "Learn more",
  },
  blog_page: {
    heading: "Get The Popeblack Brief",
    description:
      "Practical intelligence on AI, privacy, digital assets, financial crime and strategic growth.",
    primaryLabel: "Subscribe on Substack",
  },
  article_footer: {
    heading: "Continue with The Popeblack Brief",
    description:
      "Receive practical insights and new Popeblack articles once or twice each month.",
    primaryLabel: "Subscribe on Substack",
    secondaryLabel: "About the newsletter",
  },
};

function getDeviceLayout() {
  return window.matchMedia("(max-width: 767px)").matches
    ? ("mobile" as const)
    : ("desktop" as const);
}

export function SubstackSignup({
  variant,
  location,
  className = "",
}: SubstackSignupProps) {
  const pathname = usePathname();
  const headingId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionTrackedRef = useRef(false);
  const [embedFailed, setEmbedFailed] = useState(false);
  const { embedUrl, publicationUrl } = newsletterConfig;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || sectionTrackedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        sectionTrackedRef.current = true;
        trackEvent("newsletter_section_view", {
          page_path: pathname,
          cta_location: location,
          device_layout: getDeviceLayout(),
        });
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [location, pathname]);

  const analyticsContext = () => ({
    page_path: pathname,
    cta_location: location,
    device_layout: getDeviceLayout(),
  });

  if (variant === "compact") {
    if (!publicationUrl || location === "newsletter_page") {
      return null;
    }

    const content = compactContent[location];

    return (
      <section
        ref={sectionRef}
        className={`substack-signup is-compact ${className}`.trim()}
        aria-labelledby={headingId}
      >
        <div className="substack-signup-copy">
          <div className="meta-stack">Newsletter</div>
          <h2 id={headingId}>{content.heading}</h2>
          <p>{content.description}</p>
        </div>
        <div className="substack-actions">
          <a
            href={publicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="substack-cta-primary"
            onClick={() => trackEvent("substack_cta_click", analyticsContext())}
          >
            {content.primaryLabel}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          {content.secondaryLabel ? (
            <Link href="/newsletter" className="substack-cta-secondary">
              {content.secondaryLabel}
            </Link>
          ) : null}
        </div>
      </section>
    );
  }

  if (!embedUrl && !publicationUrl) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={`substack-signup is-full ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <div className="substack-signup-copy">
        <div className="meta-stack">Newsletter</div>
        <h1 id={headingId}>{newsletterConfig.name}</h1>
        <p>
          Practical intelligence for people building, leading and protecting
          organisations across AI, privacy, digital assets and emerging markets.
        </p>
        <p>
          Each edition provides clear analysis, useful frameworks and lessons
          from real-world work in strategic partnerships, technology, ecosystem
          growth and financial crime intelligence.
        </p>
      </div>

      <div className="substack-topics">
        <div className="meta-stack bronze-label">Topics covered</div>
        <ul>
          {newsletterConfig.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>

      <p className="substack-frequency">
        Published once or twice each month. No daily noise.
      </p>

      {embedUrl && !embedFailed ? (
        <div className="substack-embed-column">
          <div className="substack-embed-frame">
            <iframe
              src={embedUrl}
              title="Subscribe to The Popeblack Brief"
              width="100%"
              height="340"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              onError={() => setEmbedFailed(true)}
            />
          </div>
        </div>
      ) : publicationUrl ? (
        <a
          href={publicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="substack-cta-primary substack-fallback-cta"
          onClick={() => trackEvent("substack_cta_click", analyticsContext())}
        >
          Subscribe on Substack
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      ) : null}

      <div className="substack-full-links">
        {publicationUrl ? (
          <a
            href={publicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link substack-publication-link"
            onClick={() =>
              trackEvent("substack_publication_click", analyticsContext())
            }
          >
            Read on Substack
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ) : null}
        <Link href="/blog" className="text-link">
          Read the Popeblack blog
        </Link>
      </div>
    </section>
  );
}
