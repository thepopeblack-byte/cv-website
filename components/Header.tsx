"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  getNavigationIdFromPathname,
  homepageNavigationTargets,
  primaryNavigation,
  type PrimaryNavigationItem,
} from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type NavigationId = PrimaryNavigationItem["id"];

function getHeaderBottom() {
  return (
    document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect()
      .bottom ?? 88
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.5 8.25H3.25V20H6.5V8.25ZM4.88 3A1.88 1.88 0 1 0 4.88 6.75 1.88 1.88 0 0 0 4.88 3ZM9 8.25h3.12v1.6h.05c.44-.83 1.5-1.7 3.08-1.7 3.29 0 3.9 2.17 3.9 4.99V20H15.9v-6.08c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V20H9V8.25Z" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const pathnameNavigationId = getNavigationIdFromPathname(pathname);
  const [open, setOpen] = useState(false);
  const [homepageActiveId, setHomepageActiveId] =
    useState<NavigationId>("profile");
  const activeIdRef = useRef<NavigationId>("profile");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const currentNavigationId =
    pathname === "/" ? homepageActiveId : pathnameNavigationId;
  const currentNavigationLabel = primaryNavigation.find(
    (item) => item.id === currentNavigationId,
  )?.label;

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !mobileMenuRef.current) {
        return;
      }

      const focusable = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const targets = homepageNavigationTargets
      .map((target) => ({
        ...target,
        element: document.getElementById(target.sectionId),
      }))
      .filter((target) => target.element) as Array<
      (typeof homepageNavigationTargets)[number] & { element: HTMLElement }
    >;

    if (!targets.length) {
      return;
    }

    let frameId = 0;

    const updateActiveNavigation = () => {
      frameId = 0;
      const headerBottom = getHeaderBottom();
      const viewportCentre =
        headerBottom + (window.innerHeight - headerBottom) * 0.5;
      let nextId = targets[0].navigationId;
      let bestDistance = Number.POSITIVE_INFINITY;

      targets.forEach((target) => {
        const rect = target.element.getBoundingClientRect();
        const centre =
          rect.top + Math.min(rect.height * 0.5, window.innerHeight * 0.42);
        const distance = Math.abs(centre - viewportCentre);

        if (distance < bestDistance) {
          nextId = target.navigationId;
          bestDistance = distance;
        }
      });

      if (activeIdRef.current !== nextId) {
        activeIdRef.current = nextId;
        setHomepageActiveId(nextId);
      }
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateActiveNavigation);
      }
    };

    const observer = new IntersectionObserver(requestUpdate, {
      rootMargin: "-18% 0px -18% 0px",
      threshold: [0, 0.15, 0.35, 0.6, 0.85],
    });

    targets.forEach((target) => observer.observe(target.element));
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("orientationchange", requestUpdate);
    requestUpdate();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("orientationchange", requestUpdate);
    };
  }, [pathname]);

  const isActive = (id: NavigationId) => id === currentNavigationId;

  return (
    <header className="site-header page-layer sticky top-0 pt-4">
      <Container>
        <div className="site-header-panel relative rounded-[1rem] bg-[rgba(10,11,13,0.84)] px-4 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="site-brand min-w-0" onClick={closeMenu}>
              <div className="meta-stack">Kayode Popoola</div>
              <div className="site-brand-subtitle mt-1 truncate font-['Sora'] text-sm text-[var(--foreground)]">
                Popeblack · Web3 Growth & Intelligence
              </div>
            </Link>

            <nav
              className="desktop-nav hidden items-center lg:flex"
              aria-label="Primary navigation"
            >
              {primaryNavigation.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={isActive(link.id) ? "page" : undefined}
                  className={cn(
                    "desktop-nav-link meta-stack transition hover:text-[var(--foreground)]",
                    isActive(link.id) && "is-active",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="nav-actions hidden items-center gap-2 lg:flex">
              <Link
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="header-social-link"
                aria-label="View Kayode Popoola on LinkedIn"
              >
                <LinkedInIcon />
              </Link>
              <Link
                href={profile.bookCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="desktop-nav-cta meta-stack"
              >
                Book a Call
              </Link>
              <ThemeToggle />
            </div>

            <div className="mobile-nav-actions flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                ref={menuButtonRef}
                type="button"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close navigation" : "Open navigation"}
                className="mobile-menu-button"
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          <nav
            ref={mobileMenuRef}
            id="mobile-nav"
            className="mobile-nav-panel mt-4 lg:hidden"
            aria-label="Mobile navigation"
            hidden={!open}
          >
            <div className="mobile-nav-group pt-3">
              <div className="meta-stack mb-3">Explore</div>
              <div className="mobile-nav-links">
                {primaryNavigation.map((link, index) => (
                  <Link
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    key={link.id}
                    href={link.href}
                    aria-current={isActive(link.id) ? "page" : undefined}
                    className={cn(
                      "mobile-nav-link meta-stack transition hover:text-[var(--foreground)]",
                      isActive(link.id) && "is-active",
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mobile-nav-group mt-3 pt-2">
              <div className="meta-stack mb-3">Connect</div>
              <div className="mobile-nav-secondary">
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-link meta-stack mobile-linkedin-link"
                  onClick={closeMenu}
                >
                  <LinkedInIcon />
                  LinkedIn
                </Link>
                <Link
                  href="/privacy"
                  className="mobile-nav-link meta-stack"
                  onClick={closeMenu}
                >
                  Privacy
                </Link>
                <Link
                  href={profile.bookCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-link meta-stack"
                  onClick={closeMenu}
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </Container>

      <nav className="section-progress-rail" aria-label="Portfolio sections">
        <span className="section-progress-current">
          {currentNavigationLabel ?? "Explore"}
        </span>
        <span className="section-progress-track">
          {primaryNavigation.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "section-progress-marker",
                isActive(link.id) && "is-active",
              )}
              aria-current={isActive(link.id) ? "page" : undefined}
              aria-label={`Go to ${link.label}`}
            />
          ))}
        </span>
      </nav>

      {currentNavigationLabel ? (
        <div className="section-progress-mobile" aria-live="polite">
          <span>{currentNavigationLabel}</span>
          <span className="section-progress-mobile-dots" aria-hidden="true">
            {primaryNavigation.map((link) => (
              <span
                key={link.id}
                className={isActive(link.id) ? "is-active" : undefined}
              />
            ))}
          </span>
        </div>
      ) : null}
    </header>
  );
}
