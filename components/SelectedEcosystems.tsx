import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { logoItems } from "@/data/logos";

const marqueeLogos = [...logoItems, ...logoItems];

export function SelectedEcosystems() {
  if (logoItems.length === 0) {
    return null;
  }

  return (
    <section id="ecosystems" className="page-layer py-14 md:py-16 lg:py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">03 / ECOSYSTEMS & PARTNERS</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">
                Selected Ecosystems, Partners & Projects
              </h2>
              <p className="section-copy">
                A selection of ecosystems, projects, and organizations I have
                contributed to through partnerships, business development,
                ecosystem growth, advisory support, intelligence work, or
                go-to-market execution.
              </p>
            </div>

            <div
              className="logo-marquee"
              aria-label="Selected ecosystems, partners, and projects"
            >
              <div className="logo-marquee-track">
                {marqueeLogos.map((logo, index) => {
                  const isDuplicate = index >= logoItems.length;
                  const logoCard = (
                    <span className="logo-marquee-card">
                      <Image
                        src={logo.src}
                        alt={isDuplicate ? "" : `${logo.name} logo`}
                        width={logo.width}
                        height={logo.height}
                        className="logo-marquee-image"
                        aria-hidden={isDuplicate}
                      />
                      {logo.category ? (
                        <span className="sr-only">{logo.category}</span>
                      ) : null}
                    </span>
                  );

                  if (!logo.href || isDuplicate) {
                    return (
                      <span
                        key={`${logo.name}-${index}`}
                        aria-hidden={isDuplicate}
                      >
                        {logoCard}
                      </span>
                    );
                  }

                  return (
                    <Link
                      key={`${logo.name}-${index}`}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="logo-marquee-link"
                      aria-label={`Visit ${logo.name}`}
                    >
                      {logoCard}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
