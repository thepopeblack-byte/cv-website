"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  homepageNavigationTargets,
  primaryNavigation,
  type PrimaryNavigationItem,
} from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type NavigationId = PrimaryNavigationItem["id"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<NavigationId>("profile");
  const activeIdRef = useRef<NavigationId>("profile");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  const resolveHomepageHref = (href: string) =>
    pathname === "/" ? href : `/${href}`;

  const isActive = (id: NavigationId) =>
    pathname === "/" && activeId === id;

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

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

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
      const headerHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--site-header-height",
          ),
        ) || 88;
      const viewportCentre =
        headerHeight + (window.innerHeight - headerHeight) * 0.5;
      let candidate: (typeof targets)[number] | null = null;
      let candidateDistance = Number.POSITIVE_INFINITY;

      targets.forEach((target) => {
        const rect = target.element.getBoundingClientRect();
        const isVisible = rect.bottom > headerHeight && rect.top < window.innerHeight;

        if (!isVisible) {
          return;
        }

        const distance =
          rect.top <= viewportCentre && rect.bottom >= viewportCentre
            ? 0
            : Math.min(
                Math.abs(rect.top - viewportCentre),
                Math.abs(rect.bottom - viewportCentre),
              );

        if (distance < candidateDistance) {
          candidate = target;
          candidateDistance = distance;
        }
      });

      if (!candidate && window.scrollY < headerHeight) {
        candidate = targets[0];
      }

      if (candidate) {
        const nextId = candidate.navigationId;

        if (activeIdRef.current !== nextId) {
          activeIdRef.current = nextId;
          setActiveId(nextId);
        }
      }
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateActiveNavigation);
      }
    };

    const observer = new IntersectionObserver(requestUpdate, {
      rootMargin: "-20% 0px -38% 0px",
      threshold: [0, 0.2, 0.4, 0.6, 0.8],
    });

    targets.forEach((target) => observer.observe(target.element));
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);
    requestUpdate();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, [pathname]);

  const activateLink = (id: NavigationId) => {
    activeIdRef.current = id;
    setActiveId(id);
    closeMenu();
  };

  const navigateToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    navigationId?: NavigationId,
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      const target = document.getElementById(href.slice(1));

      if (target) {
        event.preventDefault();
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const headerHeight =
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--site-header-height",
            ),
          ) || 88;
        const targetTop =
          target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.history.pushState(null, "", href);
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: reducedMotion ? "auto" : "smooth",
        });
      }
    }

    if (navigationId) {
      activateLink(navigationId);
    } else {
      closeMenu();
    }
  };

  return (
    <header className="site-header page-layer sticky top-0 pt-4">
      <Container>
        <div className="site-header-panel relative rounded-[1rem] border border-[var(--line)] bg-[rgba(10,11,13,0.84)] px-4 py-4 backdrop-blur-xl">
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
                  href={resolveHomepageHref(link.href)}
                  aria-current={isActive(link.id) ? "location" : undefined}
                  className={cn(
                    "desktop-nav-link meta-stack transition hover:text-[var(--foreground)]",
                    isActive(link.id) && "is-active",
                  )}
                  onClick={(event) =>
                    navigateToSection(event, link.href, link.id)
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="nav-actions hidden items-center gap-2 lg:flex">
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
                className="mobile-menu-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/[0.02] text-[var(--foreground)] lg:hidden"
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
              <div className="mobile-nav-group border-t border-[var(--line)] pt-4">
                <div className="meta-stack mb-3">Primary</div>
                <div className="mobile-nav-links">
                  {primaryNavigation.map((link, index) => (
                    <Link
                      ref={index === 0 ? firstMobileLinkRef : undefined}
                      key={link.id}
                      href={resolveHomepageHref(link.href)}
                      aria-current={isActive(link.id) ? "location" : undefined}
                      className={cn(
                        "mobile-nav-link meta-stack transition hover:text-[var(--foreground)]",
                        isActive(link.id) && "is-active",
                      )}
                      onClick={(event) =>
                        navigateToSection(event, link.href, link.id)
                      }
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mobile-nav-group mt-4 border-t border-[var(--line)] pt-4">
                <div className="meta-stack mb-3">More</div>
                <div className="mobile-nav-secondary">
                  <Link href="/blog" className="mobile-nav-link meta-stack" onClick={closeMenu}>
                    Blog
                  </Link>
                  <Link
                    href={resolveHomepageHref("#contact")}
                    className="mobile-nav-link meta-stack"
                    onClick={(event) =>
                      navigateToSection(event, "#contact")
                    }
                  >
                    Contact
                  </Link>
                  <Link href="/privacy" className="mobile-nav-link meta-stack" onClick={closeMenu}>
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
    </header>
  );
}
