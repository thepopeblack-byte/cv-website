"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
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

const proofChips = [
  "$300K+ revenue",
  "50+ deals",
  "20+ L2 partners",
  "3x TVL",
  "500+ developers trained",
];

function getStatus(period: string) {
  return period.includes("Present") ? "Current" : "Previous";
}

export function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const entryRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let frameId = 0;

    const updateActiveEntry = () => {
      const viewportHeight = window.innerHeight;
      const anchor = viewportHeight * 0.36;
      let nextActiveIndex = 0;
      let bestScore = Number.POSITIVE_INFINITY;

      entryRefs.current.forEach((entry, index) => {
        if (!entry) {
          return;
        }

        const rect = entry.getBoundingClientRect();
        const visible = rect.bottom > viewportHeight * 0.12 && rect.top < viewportHeight * 0.88;
        const entryAnchor = rect.top + Math.min(rect.height * 0.18, viewportHeight * 0.28);
        const score = Math.abs(entryAnchor - anchor) + (visible ? 0 : viewportHeight);

        if (score < bestScore) {
          bestScore = score;
          nextActiveIndex = index;
        }
      });

      setActiveIndex(nextActiveIndex);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveEntry);
    };

    updateActiveEntry();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const activeEntry = experience[activeIndex] ?? experience[0];
  const activeRole = activeEntry.roles[0];
  const experienceProgress =
    experience.length > 1 ? (activeIndex / (experience.length - 1)) * 100 : 0;

  return (
    <section id="experience" className="page-layer py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">05 / EXPERIENCE</div>
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
                Operating experience across sales, partnerships, growth, and
                intelligence.
              </h2>
              <p className="section-copy">
                The throughline is commercial execution: opening markets,
                building partnerships, structuring growth systems, and creating
                measurable outcomes in complex environments.
              </p>

              <div className="experience-active-card" aria-live="polite">
                <div className="meta-stack">Active company</div>
                <h3>{activeEntry.company}</h3>
                {activeRole ? <p>{activeRole.title}</p> : null}
                <span>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(experience.length).padStart(2, "0")}
                </span>
              </div>

              <div className="experience-signal-strip" aria-label="Operating signals">
                {experienceSignals.map((signal, index) => (
                  <span key={signal} style={{ "--signal-index": index } as CSSProperties}>
                    {signal}
                  </span>
                ))}
              </div>

              <div className="experience-proof-grid" aria-label="Commercial proof">
                {proofChips.map((chip) => (
                  <span key={chip} className="experience-proof-card">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="experience-rail" aria-label="Experience timeline">
                {experience.map((entry, index) => (
                  <div
                    key={entry.company}
                    className={`experience-rail-item ${
                      index === activeIndex ? "is-active" : ""
                    }`}
                    aria-current={index === activeIndex ? "step" : undefined}
                  >
                    <span className="experience-rail-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{entry.company}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="space-y-8">
              {experience.map((entry, index) => (
                <SectionReveal key={entry.company} delay={0.03 + index * 0.03}>
                  <article
                    ref={(node) => {
                      entryRefs.current[index] = node;
                    }}
                    className="experience-entry"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="meta-stack">
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {String(experience.length).padStart(2, "0")}
                        </div>
                        <h3 className="mt-3 font-['Sora'] text-[1.9rem] tracking-[-0.05em] text-[var(--foreground)]">
                          {entry.company}
                        </h3>
                        <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">
                          {entry.label}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 space-y-7">
                      {entry.roles.map((role) => (
                        <div key={`${entry.company}-${role.title}`} className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="font-['Sora'] text-[1.2rem] tracking-[-0.03em] text-[var(--foreground)]">
                              {role.title}
                            </h4>
                            <span className="meta-stack">[{getStatus(role.period)}]</span>
                          </div>
                          <div className="meta-stack flex flex-wrap gap-4 text-[0.72rem]">
                            <span>{role.period}</span>
                            <span>{role.location}</span>
                          </div>
                          <ul className="space-y-2 text-[0.98rem] leading-8 text-[var(--muted-strong)]">
                            {role.bullets.map((bullet) => (
                              <li key={bullet}>- {bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
