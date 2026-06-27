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
  const activeIndexRef = useRef(0);
  const entryRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const entries = entryRefs.current.filter(Boolean) as HTMLElement[];

    if (!entries.length) {
      return;
    }

    const activateEntry = (nextActiveIndex: number) => {
      if (activeIndexRef.current !== nextActiveIndex) {
        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      }
    };

    if (typeof window.IntersectionObserver === "undefined") {
      activateEntry(0);
      return;
    };

    const visibility = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (observerEntries) => {
        observerEntries.forEach((entry) => {
          visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextActiveIndex = activeIndexRef.current;
        let bestScore = 0;

        entries.forEach((entry) => {
          const score = visibility.get(entry) ?? 0;
          const index = entryRefs.current.indexOf(entry);

          if (index >= 0 && score > bestScore) {
            bestScore = score;
            nextActiveIndex = index;
          }
        });

        if (bestScore > 0.12) {
          activateEntry(nextActiveIndex);
        }
      },
      {
        rootMargin: "-10% 0px -34% 0px",
        threshold: [0.14, 0.28, 0.44, 0.62],
      },
    );

    entries.forEach((entry) => observer.observe(entry));

    return () => observer.disconnect();
  }, []);

  const activeEntry = experience[activeIndex] ?? experience[0];
  const activeRole = activeEntry.roles[0];
  const experienceProgress =
    experience.length > 1 ? (activeIndex / (experience.length - 1)) * 100 : 0;

  return (
    <section id="experience" className="page-layer py-14 md:py-16 lg:py-12">
      <Container>
        <SectionReveal className="section-frame">
          <div className="meta-stack">06 / EXPERIENCE</div>
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
