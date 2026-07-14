"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type MobileSwipeRegionProps = {
  children: ReactNode;
  className?: string;
  label: string;
  onActiveIndexChange?: (index: number) => void;
};

export function MobileSwipeRegion({
  children,
  className,
  label,
  onActiveIndexChange,
}: MobileSwipeRegionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const activeChangeRef = useRef(onActiveIndexChange);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);

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
      const nextProgress = maximum > 0 ? scroller.scrollLeft / maximum : 0;

      setHasOverflow(overflow);
      setAtStart(scroller.scrollLeft <= 2);
      setAtEnd(maximum === 0 || scroller.scrollLeft >= maximum - 2);
      setProgress(Math.min(1, Math.max(0, nextProgress)));

      if (
        compactQuery.matches &&
        activeChangeRef.current &&
        scroller.children.length
      ) {
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

        activeChangeRef.current(closestIndex);
      }
    };

    const requestMeasure = () => {
      window.cancelAnimationFrame(frameRef.current);
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
  }, []);

  const move = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.88,
      behavior: reducedMotion ? "auto" : "smooth",
    });
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
          <span className="mobile-swipe-progress" aria-hidden="true">
            <span style={{ width: `${Math.max(progress * 100, 8)}%` }} />
          </span>
        </div>
      ) : null}
    </div>
  );
}
