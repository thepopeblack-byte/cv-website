"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { MobileSwipeRegion } from "@/components/MobileSwipeRegion";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type ControlledSceneItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type ControlledSceneProps = {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  items: ControlledSceneItem[];
  ariaLabel: string;
  className?: string;
  introFooter?: ReactNode;
  panelClassName?: string;
  analyticsEvent?: Extract<
    AnalyticsEventName,
    "case_study_view" | "selected_work_view" | "experience_role_view"
  >;
};

export function ControlledScene({
  eyebrow,
  title,
  intro,
  items,
  ariaLabel,
  className,
  introFooter,
  panelClassName,
  analyticsEvent,
}: ControlledSceneProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!analyticsEvent) {
      return;
    }

    const payload = { item_index: activeIndex + 1 };
    if (analyticsEvent === "case_study_view") {
      trackEvent("case_study_view", payload);
    } else if (analyticsEvent === "selected_work_view") {
      trackEvent("selected_work_view", payload);
    } else {
      trackEvent("experience_role_view", payload);
    }
  }, [activeIndex, analyticsEvent]);

  const selectItem = (nextIndex: number) => {
    const boundedIndex = Math.min(Math.max(nextIndex, 0), items.length - 1);
    setActiveIndex(boundedIndex);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % items.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      selectItem(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  if (!items.length) {
    return null;
  }

  return (
    <div className={cn("controlled-scene section-frame", className)}>
      <div className="controlled-scene-sticky">
        <div className="controlled-scene-grid">
          <div className="controlled-scene-intro">
            <div className="meta-stack">{eyebrow}</div>
            <h2 className="section-title">{title}</h2>
            <div className="section-copy">{intro}</div>

            <div
              className="controlled-scene-tabs"
              aria-label={ariaLabel}
            >
              {items.map((item, index) => {
                const selected = index === activeIndex;

                return (
                  <button
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    className={cn(
                      "controlled-scene-tab",
                      selected && "is-active",
                    )}
                    onClick={() => selectItem(index)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {introFooter ? (
              <div className="controlled-scene-intro-footer">{introFooter}</div>
            ) : null}
          </div>

          <div className="controlled-scene-stage">
            <MobileSwipeRegion
              className="controlled-scene-panel-track"
              label={ariaLabel}
              analyticsId={ariaLabel}
              activeIndex={activeIndex}
              onActiveIndexChange={selectItem}
            >
              {items.map((item, index) => (
                <div
                  key={item.id}
                  role="group"
                  aria-label={item.label}
                  className={cn(
                    "controlled-scene-panel",
                    panelClassName,
                    index === activeIndex && "is-active",
                  )}
                >
                  {item.content}
                </div>
              ))}
            </MobileSwipeRegion>

            <div className="controlled-scene-controls" aria-label={ariaLabel}>
              <button
                type="button"
                onClick={() => selectItem(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label={`Show previous item in ${ariaLabel}`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>
              <span className="controlled-scene-dots" aria-hidden="true">
                {items.map((item, index) => (
                  <span
                    key={item.id}
                    className={index === activeIndex ? "is-active" : undefined}
                  />
                ))}
              </span>
              <button
                type="button"
                onClick={() => selectItem(activeIndex + 1)}
                disabled={activeIndex === items.length - 1}
                aria-label={`Show next item in ${ariaLabel}`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
