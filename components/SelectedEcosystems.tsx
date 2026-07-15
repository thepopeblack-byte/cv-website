import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { logoItems } from "@/data/logos";

const marqueeLogos = [...logoItems, ...logoItems];

export function SelectedEcosystems() {
  if (logoItems.length === 0) {
    return null;
  }

  return (
    <section
      id="ecosystems"
      data-nav-group="impact"
      data-scene-label="Organisations"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">Ecosystems & partners</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">
                Selected organisations, ecosystems and projects I have worked
                with, supported or contributed to.
              </h2>
              <p className="section-copy">
                Professional context spanning Web3 infrastructure, digital
                assets, ecosystem development, commercial growth, and emerging
                technology.
              </p>
            </div>

            <div
              className="logo-marquee"
              aria-label="Selected organisations, ecosystems, and projects"
            >
              <div className="logo-marquee-track">
                {marqueeLogos.map((logo, index) => {
                  const isDuplicate = index >= logoItems.length;
                  const logoMark = (
                    <span className="logo-marquee-item">
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
                        {logoMark}
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
                      {logoMark}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="logo-swipe-mobile">
              <MobileSwipeRegion
                className="logo-swipe-list"
                label="Selected organisations, ecosystems, and projects"
              >
                {logoItems.map((logo) => {
                  const logoMark = (
                    <span className="logo-swipe-item">
                      <Image
                        src={logo.src}
                        alt={`${logo.name} logo`}
                        width={logo.width}
                        height={logo.height}
                        className="logo-marquee-image"
                      />
                      <span className="logo-swipe-name">{logo.name}</span>
                    </span>
                  );

                  return logo.href ? (
                    <Link
                      key={logo.name}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${logo.name}`}
                    >
                      {logoMark}
                    </Link>
                  ) : (
                    <span key={logo.name}>{logoMark}</span>
                  );
                })}
              </MobileSwipeRegion>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
