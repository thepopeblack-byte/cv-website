import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section
      id="credentials"
      data-nav-group="expertise"
      data-scene-label="Credentials"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">Credentials</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Credentials.</h2>
              <p className="section-copy">
                Certification work across AML/CFT, transaction monitoring,
                KYC/KYB, fraud prevention, open-source intelligence,
                institutional operations, and commercial leadership.
              </p>
            </div>

            <MobileSwipeRegion
              className="credential-stage"
              label="Professional credentials"
            >
              {certifications.map((certification) => (
                <article
                  key={`${certification.issuer}-${certification.title}`}
                  className="credential-card"
                >
                  <div className="meta-stack">{certification.issuer}</div>
                  <h3>{certification.title}</h3>
                  {certification.credentialUrl ? (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link mt-4 inline-flex items-center gap-2"
                      aria-label={`View ${certification.title} credential`}
                    >
                      View credential
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ) : null}
                </article>
              ))}
            </MobileSwipeRegion>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
