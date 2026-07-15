"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

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
}: ControlledSceneProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId().replaceAll(":", "");

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

  const activeItem = items[activeIndex] ?? items[0];
  const activeTabId = `${baseId}-tab-${activeItem.id}`;
  const activePanelId = `${baseId}-panel-${activeItem.id}`;

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
              role="tablist"
              aria-label={ariaLabel}
            >
              {items.map((item, index) => {
                const selected = index === activeIndex;
                const tabId = `${baseId}-tab-${item.id}`;
                const panelId = `${baseId}-panel-${item.id}`;

                return (
                  <button
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    key={item.id}
                    id={tabId}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
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
            <div
              key={activeItem.id}
              id={activePanelId}
              role="tabpanel"
              aria-labelledby={activeTabId}
              tabIndex={0}
              className={cn("controlled-scene-panel", panelClassName)}
            >
              {activeItem.content}
            </div>

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
