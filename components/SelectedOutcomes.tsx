import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import {
  ControlledScene,
  type ControlledSceneItem,
} from "@/components/ControlledScene";
import { confidentialityNote } from "@/data/achievements";
import { institutionalOutcomes } from "@/data/outcomes";

const outcomeLabels = [
  "Commercial growth",
  "Africa ecosystem",
  "Blockchain intelligence",
  "Jumia execution",
];

const outcomePanels: ControlledSceneItem[] = institutionalOutcomes.map(
  (outcome, index) => ({
    id: outcome.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    label: outcomeLabels[index] ?? outcome.title,
    content: (
      <article className="outcome-item">
        <div className="meta-stack">Institutional case study</div>
        <h3>{outcome.title}</h3>
        <dl>
          <div>
            <dt>Context</dt>
            <dd>{outcome.context}</dd>
          </div>
          <div>
            <dt>Kayode&apos;s role</dt>
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
            className="text-link inline-flex items-center gap-2"
          >
            {outcome.evidenceLabel}
            <ArrowUpRight size={13} />
          </Link>
        ) : (
          <p className="outcome-reference-note">{outcome.evidenceLabel}</p>
        )}
      </article>
    ),
  }),
);

export function SelectedOutcomes() {
  return (
    <section
      id="outcomes"
      data-nav-group="impact"
      data-scene-label="Selected Outcomes"
      className="page-layer controlled-section py-14 md:py-16 lg:py-12"
    >
      <Container>
        <ControlledScene
          eyebrow="Selected outcomes"
          title="Institutional case studies."
          intro="Concise examples of commercial leadership, market development, capacity building, and digital-asset intelligence in practice."
          items={outcomePanels}
          ariaLabel="Institutional case studies"
          analyticsEvent="case_study_view"
          introFooter={
            <p className="outcomes-confidentiality-note">
              {confidentialityNote}
            </p>
          }
        />
      </Container>
    </section>
  );
}
