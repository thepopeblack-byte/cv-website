"use client";

import { useState } from "react";

import { Container } from "@/components/Container";
import {
  ControlledScene,
  type ControlledSceneItem,
} from "@/components/ControlledScene";
import { experienceProofChips } from "@/data/achievements";
import { experience } from "@/data/experience";

const experienceSignals = [
  "Partnerships",
  "Revenue",
  "Ecosystem Growth",
  "Intelligence",
  "GTM",
  "Web3",
  "Africa Expansion",
];

function getStatus(period: string) {
  return period.includes("Present") ? "Current" : "Previous";
}

export function ExperienceTimeline() {
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>(
    {},
  );

  const toggleRoleDetails = (roleKey: string) => {
    setExpandedRoles((current) =>
      current[roleKey] ? {} : { [roleKey]: true },
    );
  };

  const experiencePanels: ControlledSceneItem[] = experience.map(
    (entry, entryIndex) => ({
      id: entry.company.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      label: entry.company,
      content: (
        <article className="experience-entry experience-feature">
          <div className="experience-feature-header">
            <div>
              <div className="meta-stack">
                {entryIndex < 2 ? "Current roles" : "Earlier experience"}
              </div>
              <h3>{entry.company}</h3>
              <p>{entry.label}</p>
            </div>
          </div>

          <div className="experience-feature-roles">
            {entry.roles.map((role, roleIndex) => {
              const roleKey = `${entry.company}-${role.title}`;
              const isExpanded = expandedRoles[roleKey] ?? false;
              const showsPreview = roleIndex === 0 || isExpanded;

              return (
                <section
                  key={roleKey}
                  className={`experience-role ${isExpanded ? "is-expanded" : ""}`}
                  aria-labelledby={`${roleKey.replace(/[^a-z0-9]+/gi, "-")}-title`}
                >
                  <div className="experience-role-heading">
                    <h4 id={`${roleKey.replace(/[^a-z0-9]+/gi, "-")}-title`}>
                      {role.title}
                    </h4>
                    <span className="meta-stack">{getStatus(role.period)}</span>
                  </div>
                  <div className="experience-role-meta meta-stack">
                    <span>{role.period}</span>
                    <span>{role.location}</span>
                    {role.engagementType ? <span>{role.engagementType}</span> : null}
                  </div>
                  {showsPreview ? (
                    <ul className="experience-bullet-list">
                      {role.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bullet}
                          className={
                            bulletIndex >= 2
                              ? "experience-extra-bullet"
                              : undefined
                          }
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {role.bullets.length ? (
                    <button
                      type="button"
                      className="experience-details-toggle"
                      aria-expanded={isExpanded}
                      onClick={() => toggleRoleDetails(roleKey)}
                    >
                      {isExpanded
                        ? "Show less"
                        : roleIndex === 0
                          ? "View details"
                          : "View role"}
                    </button>
                  ) : null}
                </section>
              );
            })}
          </div>
        </article>
      ),
    }),
  );

  return (
    <section
      id="experience"
      data-nav-group="experience"
      data-scene-label="Experience"
      className="page-layer controlled-section py-14 md:py-16 lg:py-12"
    >
      <Container>
        <ControlledScene
          eyebrow="Experience"
          title="Operating experience across commercial leadership, Web3 infrastructure, intelligence, and emerging markets."
          intro="The throughline is disciplined execution: building markets, partnerships, revenue systems, stakeholder programmes, and defensible digital-asset intelligence in complex environments."
          items={experiencePanels}
          ariaLabel="Professional experience by company"
          panelClassName="experience-scene-panel"
          introFooter={
            <div className="experience-scene-signals">
              <div className="experience-signal-strip" aria-label="Operating signals">
                {experienceSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
              <div className="experience-proof-grid" aria-label="Experience proof points">
                {experienceProofChips.map((chip) => (
                  <span key={chip} className="experience-proof-card">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          }
        />
      </Container>
    </section>
  );
}
