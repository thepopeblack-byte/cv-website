import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import {
  ControlledScene,
  type ControlledSceneItem,
} from "@/components/ControlledScene";
import { portfolioItems } from "@/data/portfolio";

function isExternalHref(href: string) {
  return href.startsWith("http");
}

const projectLabels = [
  "Commercial growth",
  "Africa ecosystem",
  "Intelligence",
  "Speaking proof",
];

const projectPanels: ControlledSceneItem[] = portfolioItems.map(
  (item, index) => {
    const hrefIsExternal = item.href ? isExternalHref(item.href) : false;

    return {
      id: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      label: projectLabels[index] ?? item.title,
      content: (
        <article className="portfolio-feature">
          <div className="image-panel portfolio-feature-image relative">
            <Image
              src={item.image}
              alt={item.imageAlt ?? item.title}
              fill
              className={item.imageFit === "contain" ? "object-contain" : "object-cover"}
              style={{ objectPosition: item.imageObjectPosition ?? "center center" }}
              sizes="(min-width: 1180px) 56vw, 100vw"
            />
            <div className="portfolio-feature-shade" aria-hidden="true" />
            <div className="portfolio-feature-heading">
              <div className="meta-stack">{item.category}</div>
              <h3>{item.title}</h3>
            </div>
          </div>

          <div className="portfolio-feature-copy">
            <p>{item.summary ?? item.description}</p>
            {item.proof ? (
              <div className="portfolio-feature-proof">
                <span className="meta-stack">Outcome / proof</span>
                <p>{item.proof}</p>
              </div>
            ) : null}

            <details className="portfolio-details">
              <summary>View details</summary>
              <p>{item.description}</p>
            </details>

            {item.href ? (
              <Link
                href={item.href}
                target={hrefIsExternal ? "_blank" : undefined}
                rel={hrefIsExternal ? "noopener noreferrer" : undefined}
                className="text-link inline-flex items-center gap-2"
              >
                {item.ctaLabel ?? "View"}
                {hrefIsExternal ? <ArrowUpRight size={13} /> : null}
              </Link>
            ) : null}
          </div>
        </article>
      ),
    };
  },
);

export function Portfolio() {
  return (
    <section
      id="portfolio"
      data-nav-group="impact"
      data-scene-label="Selected Work"
      className="page-layer controlled-section py-14 md:py-16 lg:py-12"
    >
      <Container>
        <ControlledScene
          eyebrow="Selected work"
          title="Commercial proof across Web3 partnerships, ecosystem growth, and intelligence."
          intro="Four high-signal proof points across revenue growth, go-to-market strategy, blockchain infrastructure, Africa Web3 ecosystem expansion, and blockchain intelligence."
          items={projectPanels}
          ariaLabel="Selected work and professional proof"
          panelClassName="portfolio-scene-panel"
        />
      </Container>
    </section>
  );
}
