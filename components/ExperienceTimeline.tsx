"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>(
    {},
  );
  const activeIndexRef = useRef(0);
  const entryRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const entries = entryRefs.current.filter(Boolean) as HTMLElement[];

    if (!entries.length) {
      return;
    }

    let frameId = 0;

    const updateFromViewport = () => {
      frameId = 0;
      const headerHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--site-header-height",
          ),
        ) || 88;
      const viewportCentre =
        headerHeight + (window.innerHeight - headerHeight) * 0.5;
      let nextIndex = activeIndexRef.current;
      let bestDistance = Number.POSITIVE_INFINITY;

      entries.forEach((entry, index) => {
        const rect = entry.getBoundingClientRect();

        if (rect.bottom <= headerHeight || rect.top >= window.innerHeight) {
          return;
        }

        const distance =
          rect.top <= viewportCentre && rect.bottom >= viewportCentre
            ? 0
            : Math.min(
                Math.abs(rect.top - viewportCentre),
                Math.abs(rect.bottom - viewportCentre),
              );

        if (distance < bestDistance) {
          bestDistance = distance;
          nextIndex = index;
        }
      });

      if (activeIndexRef.current !== nextIndex) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateFromViewport);
      }
    };

    const observer = new IntersectionObserver(requestUpdate, {
      rootMargin: "-18% 0px -34% 0px",
      threshold: [0, 0.2, 0.4, 0.6, 0.8],
    });

    entries.forEach((entry) => observer.observe(entry));
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const activeEntry = experience[activeIndex] ?? experience[0];
  const activeRole = activeEntry.roles[0];
  const experienceProgress =
    experience.length > 1 ? (activeIndex / (experience.length - 1)) * 100 : 0;

  const toggleRoleDetails = (roleKey: string) => {
    setExpandedRoles((current) => ({
      ...current,
      [roleKey]: !current[roleKey],
    }));
  };

  return (
    <section
      id="experience"
      data-nav-group="experience"
      data-scene-label="Experience"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">Experience</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <aside
              className="experience-sidebar"
              style={
                {
                  "--experience-progress": `${experienceProgress}%`,
                } as CSSProperties
              }
            >
              <div className="experience-sidebar-glow" aria-hidden="true" />
              <h2 className="section-title">
                Operating experience across commercial leadership, Web3
                infrastructure, intelligence, and emerging markets.
              </h2>
              <p className="section-copy">
                The throughline is disciplined execution: building markets,
                partnerships, revenue systems, stakeholder programmes, and
                defensible digital-asset intelligence in complex environments.
              </p>

              <div className="experience-active-card" aria-live="polite">
                <div className="meta-stack">Active company</div>
                <h3>{activeEntry.company}</h3>
                {activeRole ? <p>{activeRole.title}</p> : null}
              </div>

              <div
                className="experience-signal-strip"
                aria-label="Operating signals"
              >
                {experienceSignals.map((signal, index) => (
                  <span
                    key={signal}
                    style={{ "--signal-index": index } as CSSProperties}
                  >
                    {signal}
                  </span>
                ))}
              </div>

              <MobileSwipeRegion
                className="experience-proof-grid"
                label="Experience proof points"
              >
                {experienceProofChips.map((chip) => (
                  <span key={chip} className="experience-proof-card">
                    {chip}
                  </span>
                ))}
              </MobileSwipeRegion>

              <div className="experience-rail" aria-label="Experience timeline">
                {experience.map((entry, index) => (
                  <div
                    key={entry.company}
                    className={`experience-rail-item ${
                      index === activeIndex ? "is-active" : ""
                    }`}
                    aria-current={index === activeIndex ? "step" : undefined}
                  >
                    <span>{entry.company}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="experience-content space-y-8">
              {experience.map((entry, index) => (
                <Fragment key={entry.company}>
                  {index === 0 ? (
                    <div className="experience-group-heading">
                      <span className="meta-stack">Current roles</span>
                      <p>
                        Concurrent current roles are presented together.
                        Engagement types are shown only where confirmed.
                      </p>
                    </div>
                  ) : null}
                  {index === 2 ? (
                    <div className="experience-group-heading">
                      <span className="meta-stack">Earlier experience</span>
                      <p>
                        Earlier commercial and creative work underpinning the
                        current leadership and stakeholder-management profile.
                      </p>
                    </div>
                  ) : null}

                  <SectionReveal delay={0.03 + index * 0.03}>
                    <article
                      ref={(node) => {
                        entryRefs.current[index] = node;
                      }}
                      className="experience-entry"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="meta-stack">Operating role</div>
                          <h3 className="mt-3 font-['Sora'] text-[1.9rem] tracking-[-0.05em] text-[var(--foreground)]">
                            {entry.company}
                          </h3>
                          <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">
                            {entry.label}
                          </p>
                        </div>
                      </div>

                      <div className="mt-7 space-y-7">
                        {entry.roles.map((role) => {
                          const roleKey = `${entry.company}-${role.title}`;
                          const isExpanded = expandedRoles[roleKey] ?? false;

                          return (
                            <div
                              key={roleKey}
                              className={`experience-role space-y-3 ${
                                isExpanded ? "is-expanded" : ""
                              }`}
                            >
                              <div className="flex flex-wrap items-center gap-3">
                                <h4 className="font-['Sora'] text-[1.2rem] tracking-[-0.03em] text-[var(--foreground)]">
                                  {role.title}
                                </h4>
                                <span className="meta-stack">
                                  [{getStatus(role.period)}]
                                </span>
                              </div>
                              <div className="meta-stack flex flex-wrap gap-4 text-[0.72rem]">
                                <span>{role.period}</span>
                                <span>{role.location}</span>
                                {role.engagementType ? (
                                  <span>{role.engagementType}</span>
                                ) : null}
                              </div>
                              <ul className="experience-bullet-list space-y-2 text-[0.98rem] leading-8 text-[var(--muted-strong)]">
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
                              {role.bullets.length > 2 ? (
                                <button
                                  type="button"
                                  className="experience-details-toggle"
                                  aria-expanded={isExpanded}
                                  onClick={() => toggleRoleDetails(roleKey)}
                                >
                                  {isExpanded ? "Show less" : "View details"}
                                </button>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </article>
                  </SectionReveal>
                </Fragment>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
