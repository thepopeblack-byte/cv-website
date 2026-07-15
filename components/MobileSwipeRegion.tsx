"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Children,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";
import { normalizeAnalyticsId, trackEvent } from "@/lib/analytics";

type MobileSwipeRegionProps = {
  children: ReactNode;
  className?: string;
  label: string;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  analyticsId?: string;
};

export function MobileSwipeRegion({
  children,
  className,
  label,
  activeIndex: controlledActiveIndex,
  onActiveIndexChange,
  analyticsId,
}: MobileSwipeRegionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const activeChangeRef = useRef(onActiveIndexChange);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const measuredIndexRef = useRef(0);
  const userSwipeRef = useRef(false);
  const swipeTrackTimerRef = useRef<number | null>(null);
  const itemCount = Children.count(children);

  useEffect(() => {
    activeChangeRef.current = onActiveIndexChange;
  }, [onActiveIndexChange]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const compactQuery = window.matchMedia("(max-width: 768px)");

    const measure = () => {
      const overflow =
        compactQuery.matches && scroller.scrollWidth > scroller.clientWidth + 2;
      const maximum = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);

      setHasOverflow(overflow);
      setAtStart(scroller.scrollLeft <= 2);
      setAtEnd(maximum === 0 || scroller.scrollLeft >= maximum - 2);

      if (compactQuery.matches && scroller.children.length) {
        const scrollerRect = scroller.getBoundingClientRect();
        const centre = scrollerRect.left + scrollerRect.width / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        Array.from(scroller.children).forEach((child, index) => {
          const rect = child.getBoundingClientRect();
          const distance = Math.abs(rect.left + rect.width / 2 - centre);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (measuredIndexRef.current !== closestIndex) {
          measuredIndexRef.current = closestIndex;
          setActiveIndex(closestIndex);
          activeChangeRef.current?.(closestIndex);

          if (userSwipeRef.current) {
            if (swipeTrackTimerRef.current) {
              window.clearTimeout(swipeTrackTimerRef.current);
            }
            swipeTrackTimerRef.current = window.setTimeout(() => {
              trackEvent("mobile_swipe", {
                region_id: normalizeAnalyticsId(analyticsId ?? label),
                item_index: closestIndex + 1,
              });
              userSwipeRef.current = false;
            }, 160);
          }
        }
      }
    };

    const requestMeasure = () => {
      window.cancelAnimationFrame(frameRef.current);
      if (swipeTrackTimerRef.current) {
        window.clearTimeout(swipeTrackTimerRef.current);
      }
      frameRef.current = window.requestAnimationFrame(measure);
    };

    const handleScroll = () => {
      setHasInteracted(true);
      requestMeasure();
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(requestMeasure);
    resizeObserver?.observe(scroller);
    Array.from(scroller.children).forEach((child) =>
      resizeObserver?.observe(child),
    );
    compactQuery.addEventListener("change", requestMeasure);
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    measure();

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      resizeObserver?.disconnect();
      compactQuery.removeEventListener("change", requestMeasure);
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, [analyticsId, label]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (
      controlledActiveIndex === undefined ||
      !scroller ||
      measuredIndexRef.current === controlledActiveIndex
    ) {
      return;
    }

    measuredIndexRef.current = controlledActiveIndex;
    setActiveIndex(controlledActiveIndex);

    if (!window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    const target = scroller.children.item(controlledActiveIndex) as
      | HTMLElement
      | null;

    if (!target) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    scroller.scrollTo({
      left: target.offsetLeft - scroller.offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [controlledActiveIndex]);

  const move = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const nextIndex = Math.min(
      Math.max(activeIndex + direction, 0),
      Math.max(itemCount - 1, 0),
    );
    const target = scroller.children.item(nextIndex) as HTMLElement | null;

    if (!target) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    scroller.scrollTo({
      left: target.offsetLeft - scroller.offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    measuredIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    activeChangeRef.current?.(nextIndex);
    setHasInteracted(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };

  return (
    <div
      className={cn(
        "mobile-swipe-region",
        hasOverflow && "has-overflow",
        atStart && "is-at-start",
        atEnd && "is-at-end",
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(className, "mobile-swipe-scroller")}
        aria-label={label}
        role={hasOverflow ? "region" : undefined}
        aria-roledescription={hasOverflow ? "carousel" : undefined}
        tabIndex={hasOverflow ? 0 : undefined}
        onKeyDown={handleKeyDown}
        onPointerDown={() => {
          userSwipeRef.current = true;
        }}
      >
        {children}
      </div>

      {hasOverflow ? (
        <div className="mobile-swipe-controls">
          <div className="mobile-swipe-directions">
            {!atStart ? (
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={`Show previous item in ${label}`}
              >
                <ChevronLeft size={15} />
              </button>
            ) : (
              <span aria-hidden="true" />
            )}

            {!hasInteracted ? (
              <span className="mobile-swipe-label">Swipe</span>
            ) : (
              <span className="sr-only">Swipe controls</span>
            )}

            {!atEnd ? (
              <button
                type="button"
                className={!hasInteracted ? "is-nudging" : undefined}
                onClick={() => move(1)}
                aria-label={`Show next item in ${label}`}
              >
                <ChevronRight size={15} />
              </button>
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
          <span className="mobile-swipe-dots" aria-hidden="true">
            {Array.from({ length: itemCount }, (_, index) => (
              <span
                key={index}
                className={index === activeIndex ? "is-active" : undefined}
              />
            ))}
          </span>
        </div>
      ) : null}
    </div>
  );
}
