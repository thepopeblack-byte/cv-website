"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Container } from "@/components/Container";
import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { SectionReveal } from "@/components/SectionReveal";
import { skillGroups } from "@/data/skills";

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

    const clusters = Array.from(
      section.querySelectorAll<HTMLElement>(".capability-cluster"),
    );

    if (!clusters.length) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 769px)");
    let frameId = 0;
    let monitorId = 0;
    let isMonitoring = false;

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

      clusters.forEach((cluster, index) => {
        const rect = cluster.getBoundingClientRect();

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

      activateCluster(nextIndex);
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateFromViewport);
      }
    };

    const monitorVisibleSection = () => {
      window.clearTimeout(monitorId);

      if (!isMonitoring) {
        return;
      }

      updateFromViewport();
      monitorId = window.setTimeout(monitorVisibleSection, 120);
    };

    const observer = new IntersectionObserver(requestUpdate, {
      rootMargin: "-18% 0px -34% 0px",
      threshold: [0, 0.2, 0.4, 0.6, 0.8],
    });
    const sectionObserver = new IntersectionObserver(([entry]) => {
      isMonitoring = Boolean(entry?.isIntersecting && desktopQuery.matches);

      if (isMonitoring) {
        monitorVisibleSection();
      } else {
        window.clearTimeout(monitorId);
      }
    });

    clusters.forEach((cluster) => observer.observe(cluster));
    sectionObserver.observe(section);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    desktopQuery.addEventListener("change", requestUpdate);
    requestUpdate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(monitorId);
      observer.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
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
    activateCluster(nextActiveIndex);
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
  const capabilityProgress =
    skillGroups.length > 1 ? (activeIndex / (skillGroups.length - 1)) * 100 : 0;

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
            <aside
              className="capability-copy"
              style={
                {
                  "--capability-progress": `${capabilityProgress}%`,
                } as CSSProperties
              }
            >
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
                <p>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(skillGroups.length).padStart(2, "0")}
                </p>
              </div>

              <div className="capability-rail" aria-label="Capability clusters">
                {skillGroups.map((group, index) => (
                  <button
                    type="button"
                    key={group.title}
                    className={`capability-rail-item ${
                      index === activeIndex ? "is-active" : ""
                    }`}
                    aria-current={index === activeIndex ? "step" : undefined}
                    onClick={() => selectCluster(index)}
                  >
                    <span className="capability-rail-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
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
                  style={{ "--cluster-index": index } as CSSProperties}
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
