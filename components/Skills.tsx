"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { skillGroups } from "@/data/skills";
import { normalizeAnalyticsId, trackEvent } from "@/lib/analytics";

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const clusterRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 769px)");
    let frameId = 0;

    const activateCluster = (nextActiveIndex: number) => {
      if (activeIndexRef.current !== nextActiveIndex) {
        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      }
    };

    const updateFromViewport = () => {
      frameId = 0;

      if (!desktopQuery.matches) {
        return;
      }

      const clusters = Array.from(
        section.querySelectorAll<HTMLElement>(".capability-cluster"),
      );

      if (!clusters.length) {
        return;
      }

      const headerHeight =
        document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect()
          .bottom ?? 88;
      const viewportCentre =
        headerHeight + (window.innerHeight - headerHeight) * 0.5;
      let nextIndex = activeIndexRef.current;
      let bestDistance = Number.POSITIVE_INFINITY;
      let currentDistance = Number.POSITIVE_INFINITY;
      // Derive the visible candidates from current geometry so an observer entry
      // delivered just before a fast scroll cannot leave a stale highlight behind.
      const candidates = clusters.filter((cluster) => {
        const rect = cluster.getBoundingClientRect();
        return rect.bottom > headerHeight && rect.top < window.innerHeight;
      });

      candidates.forEach((cluster) => {
        const index = clusters.indexOf(cluster);

        if (index < 0) {
          return;
        }

        const rect = cluster.getBoundingClientRect();

        const distance = Math.abs(
          rect.top + rect.height * 0.5 - viewportCentre,
        );

        if (index === activeIndexRef.current) {
          currentDistance = distance;
        }

        if (distance < bestDistance) {
          bestDistance = distance;
          nextIndex = index;
        }
      });

      const shouldSwitch =
        nextIndex === activeIndexRef.current ||
        !Number.isFinite(currentDistance) ||
        bestDistance + 24 < currentDistance;

      if (shouldSwitch) {
        activateCluster(nextIndex);
      }
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateFromViewport);
      }
    };

    const observer = new IntersectionObserver(
      () => {
        requestUpdate();
      },
      {
        rootMargin: "-8% 0px -8% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(requestUpdate);

    Array.from(
      section.querySelectorAll<HTMLElement>(".capability-cluster"),
    ).forEach((cluster) => {
      observer.observe(cluster);
      resizeObserver?.observe(cluster);
    });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("orientationchange", requestUpdate);
    desktopQuery.addEventListener("change", requestUpdate);
    frameId = window.requestAnimationFrame(updateFromViewport);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("orientationchange", requestUpdate);
      desktopQuery.removeEventListener("change", requestUpdate);
    };
  }, []);

  const activateCluster = (nextActiveIndex: number) => {
    if (nextActiveIndex < 0 || nextActiveIndex >= skillGroups.length) {
      return;
    }

    activeIndexRef.current = nextActiveIndex;
    setActiveIndex(nextActiveIndex);
  };

  const selectCluster = (nextActiveIndex: number) => {
    const target = clusterRefs.current[nextActiveIndex];

    if (target) {
      const compactViewport = window.matchMedia("(max-width: 768px)").matches;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: compactViewport ? "nearest" : "center",
        inline: "center",
      });
    }
  };

  const activeGroup = skillGroups[activeIndex] ?? skillGroups[0];

  useEffect(() => {
    trackEvent("capability_view", {
      capability_id: normalizeAnalyticsId(activeGroup.title),
    });
  }, [activeGroup.title]);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      data-nav-group="expertise"
      data-scene-label="Expertise"
      className="page-layer py-14 md:py-16 lg:py-12"
    >
      <span id="skills" className="anchor-alias" aria-hidden="true" />
      <Container>
        <SectionReveal className="section-frame capability-section">
          <div className="meta-stack">Expertise</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <aside className="capability-copy">
              <div className="capability-orbit" aria-hidden="true" />
              <h2 className="section-title">Capabilities.</h2>
              <p className="section-copy">
                Senior commercial leadership, enterprise partnerships,
                ecosystem development, Web3 infrastructure, digital-asset
                intelligence, and emerging-market execution.
              </p>

              <div className="capability-active-card" aria-live="polite">
                <div className="meta-stack">Active cluster</div>
                <h3>{activeGroup.title}</h3>
              </div>

              <div className="capability-rail" aria-label="Capability clusters">
                {skillGroups.map((group, index) => (
                  <button
                    type="button"
                    key={group.title}
                    className={`capability-rail-item ${
                      index === activeIndex ? "is-active" : ""
                    }`}
                    aria-pressed={index === activeIndex}
                    onClick={() => selectCluster(index)}
                  >
                    <span>{group.title}</span>
                  </button>
                ))}
              </div>
              <p className="capability-instruction capability-instruction-desktop">
                Scroll or select a cluster to explore.
              </p>
              <p className="capability-instruction capability-instruction-mobile">
                Swipe or scroll to explore each capability cluster.
              </p>
            </aside>

            <MobileSwipeRegion
              className="capability-cluster-stack"
              label="Capability clusters"
              analyticsId="capabilities"
              activeIndex={activeIndex}
              onActiveIndexChange={activateCluster}
            >
              {skillGroups.map((group, index) => (
                <article
                  key={group.title}
                  ref={(node) => {
                    clusterRefs.current[index] = node;
                  }}
                  className={`capability-cluster ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                >
                  <div className="capability-cluster-header">
                    <span className="meta-stack">Capability cluster</span>
                    <h3>{group.title}</h3>
                  </div>
                  <ul className="capability-chip-grid">
                    {group.items.map((item) => (
                      <li key={item} className="capability-chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </MobileSwipeRegion>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
