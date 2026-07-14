import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { confidentialityNote } from "@/data/achievements";
import { institutionalOutcomes } from "@/data/outcomes";

export function SelectedOutcomes() {
  return (
    <section
      id="outcomes"
      data-nav-group="impact"
      data-scene-label="Selected Outcomes"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <Container>
        <SectionReveal className="section-frame outcomes-stage">
          <div className="meta-stack">Selected outcomes</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <h2 className="section-title">Institutional case studies.</h2>
              <p className="section-copy">
                Concise examples of commercial leadership, market development,
                capacity building, and digital-asset intelligence in practice.
              </p>
              <p className="outcomes-confidentiality-note">
                {confidentialityNote}
              </p>
            </div>

            <MobileSwipeRegion
              className="outcome-list"
              label="Institutional case studies"
            >
              {institutionalOutcomes.map((outcome, index) => (
                <article key={outcome.title} className="outcome-item">
                  <div className="outcome-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3>{outcome.title}</h3>
                  <dl>
                    <div>
                      <dt>Context</dt>
                      <dd>{outcome.context}</dd>
                    </div>
                    <div>
                      <dt>Role</dt>
                      <dd>{outcome.role}</dd>
                    </div>
                    <div>
                      <dt>Action</dt>
                      <dd>{outcome.actions}</dd>
                    </div>
                    <div>
                      <dt>Outcome</dt>
                      <dd>{outcome.outcome}</dd>
                    </div>
                  </dl>
                  {outcome.evidenceHref ? (
                    <Link
                      href={outcome.evidenceHref}
                      className="bracket-link inline-flex items-center gap-2"
                    >
                      [{outcome.evidenceLabel}]
                      <ArrowUpRight size={13} />
                    </Link>
                  ) : (
                    <p className="outcome-reference-note">
                      {outcome.evidenceLabel}
                    </p>
                  )}
                </article>
              ))}
            </MobileSwipeRegion>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
