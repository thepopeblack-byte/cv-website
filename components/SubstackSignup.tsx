"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef } from "react";

import { newsletterConfig, type NewsletterLocation } from "@/data/newsletter";
import { trackEvent } from "@/lib/analytics";

type SubstackSignupProps = {
  variant: "full" | "compact";
  location: NewsletterLocation;
  className?: string;
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

  if (!embedUrl && !publicationUrl) {
    return null;
  }

  const analyticsContext = () => ({
    page_path: pathname,
    cta_location: location,
    device_layout: getDeviceLayout(),
  });

  return (
    <section
      ref={sectionRef}
      className={`substack-signup is-${variant} ${embedUrl ? "has-embed" : "has-no-embed"} ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <div className="substack-signup-copy">
        <div className="meta-stack">Newsletter</div>
        {variant === "full" ? (
          <h1 id={headingId}>{newsletterConfig.name}</h1>
        ) : (
          <h2 id={headingId}>Get The Popeblack Brief</h2>
        )}
        <p>
          {variant === "full"
            ? "Practical intelligence for people building, leading and protecting organisations across AI, privacy, digital assets and emerging markets."
            : "Clear insights on AI, privacy, financial crime, strategic partnerships and emerging-market growth."}
        </p>

        {variant === "full" ? (
          <>
            <p>
              Each edition provides clear analysis, useful frameworks and
              lessons from real-world work in strategic partnerships,
              technology, ecosystem growth and financial crime intelligence.
            </p>
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
          </>
        ) : null}

        <div className="substack-actions">
          {publicationUrl ? (
            <>
              <a
                href={publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
                onClick={() =>
                  trackEvent("substack_cta_click", analyticsContext())
                }
              >
                {variant === "full"
                  ? "Subscribe to The Popeblack Brief"
                  : "Subscribe on Substack"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              {variant === "full" ? (
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
            </>
          ) : null}
          <Link
            href={variant === "full" ? "/blog" : "/newsletter"}
            className="text-link"
          >
            {variant === "full"
              ? "Read the Popeblack blog"
              : "About the newsletter"}
          </Link>
        </div>
      </div>

      {embedUrl ? (
        <div className="substack-embed-column">
          <div className="substack-embed-frame">
            <iframe
              src={embedUrl}
              title="Subscribe to The Popeblack Brief"
              width="100%"
              height="320"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
