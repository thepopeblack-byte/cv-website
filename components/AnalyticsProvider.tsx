"use client";

import { Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  clearAnalyticsQueue,
  flushAnalyticsQueue,
  normalizeAnalyticsId,
  trackEvent,
  type AnalyticsConsent,
} from "@/lib/analytics";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";
const analyticsEnabled =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
const validGaMeasurementId = /^G-[A-Z0-9]+$/i.test(gaMeasurementId);
const validClarityProjectId = /^[a-z0-9]+$/i.test(clarityProjectId);
const analyticsAvailable =
  analyticsEnabled && (validGaMeasurementId || validClarityProjectId);

function getStoredConsent(): AnalyticsConsent | null {
  try {
    const stored = window.localStorage.getItem(
      ANALYTICS_CONSENT_STORAGE_KEY,
    );
    return stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: AnalyticsConsent) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Consent remains effective for the current page if storage is unavailable.
  }
}

function initializeGoogleAnalytics() {
  if (!validGaMeasurementId || window.__popeblackGaInitialized) {
    return;
  }

  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("js", new Date());
  window.gtag("config", gaMeasurementId, {
    send_page_view: false,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  window.gtag("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "granted",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (!document.getElementById("popeblack-ga4-script")) {
    const script = document.createElement("script");
    script.id = "popeblack-ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`;
    document.head.appendChild(script);
  }

  window.__popeblackGaInitialized = true;
}

function initializeClarity() {
  if (!validClarityProjectId || window.__popeblackClarityInitialized) {
    return;
  }

  window.clarity ??= Object.assign(
    (...args: unknown[]) => {
      window.clarity!.q ??= [];
      window.clarity!.q!.push(args);
    },
    { q: [] as unknown[][] },
  );
  window.clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });

  if (!document.getElementById("popeblack-clarity-script")) {
    const script = document.createElement("script");
    script.id = "popeblack-clarity-script";
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityProjectId)}`;
    document.head.appendChild(script);
  }

  window.__popeblackClarityInitialized = true;
}

function activateAnalytics() {
  window.__popeblackAnalyticsConsent = "accepted";
  initializeGoogleAnalytics();
  initializeClarity();
  flushAnalyticsQueue();
}

function removeAnalyticsCookies() {
  const analyticsCookiePrefixes = ["_ga", "_clck", "_clsk"];
  const hostnameParts = window.location.hostname.split(".");
  const domains = [window.location.hostname];

  if (hostnameParts.length > 1) {
    domains.push(`.${hostnameParts.slice(-2).join(".")}`);
  }

  document.cookie.split(";").forEach((cookie) => {
    const cookieName = cookie.split("=")[0]?.trim();

    if (
      !cookieName ||
      !analyticsCookiePrefixes.some((prefix) => cookieName.startsWith(prefix))
    ) {
      return;
    }

    document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Lax`;
    domains.forEach((domain) => {
      document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    });
  });
}

function inferInteractionLocation(element: HTMLElement) {
  if (element.closest(".site-header")) {
    return "desktop_header" as const;
  }
  if (element.closest("#home, .hero-section")) {
    return "hero" as const;
  }
  if (element.closest("#contact")) {
    return "contact" as const;
  }
  if (element.closest("footer")) {
    return "footer" as const;
  }
  return "content" as const;
}

export function AnalyticsProvider() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const lastPageViewRef = useRef<string | null>(null);

  useEffect(() => {
    if (!analyticsAvailable) {
      return;
    }

    const timer = window.setTimeout(() => {
      const storedConsent = getStoredConsent();
      setConsent(storedConsent);
      setPreferencesOpen(storedConsent === null);

      if (storedConsent === "accepted") {
        activateAnalytics();
      } else if (storedConsent === "rejected") {
        window.__popeblackAnalyticsConsent = "rejected";
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (consent !== "accepted" || lastPageViewRef.current === pathname) {
      return;
    }

    lastPageViewRef.current = pathname;
    window.gtag?.("event", "page_view", {
      page_location: `${window.location.origin}${pathname}`,
      page_path: pathname,
      page_title: document.title,
    });

    const blogPostMatch = pathname.match(/^\/blog\/([^/]+)$/);
    if (blogPostMatch?.[1]) {
      trackEvent("blog_post_view", {
        post_slug: normalizeAnalyticsId(blogPostMatch[1]),
      });
    }
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== "accepted") {
      return;
    }

    const observedSections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-scene-label], [data-nav-group]",
      ),
    );
    const viewedSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const sectionId = normalizeAnalyticsId(
            element.dataset.sceneLabel ||
              element.dataset.navGroup ||
              element.id ||
              "section",
          );

          if (viewedSections.has(sectionId)) {
            return;
          }

          viewedSections.add(sectionId);
          trackEvent("section_view", {
            section_id: sectionId,
            page_path: pathname,
          });
        });
      },
      { rootMargin: "-34% 0px -44% 0px", threshold: [0, 0.2, 0.5] },
    );

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== "accepted") {
      return;
    }

    const trackedDepths = new Set<number>();
    const thresholds = [25, 50, 75, 90] as const;
    let frameId = 0;

    const updateScrollDepth = () => {
      frameId = 0;
      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const depth = Math.min(100, (window.scrollY / scrollableHeight) * 100);

      thresholds.forEach((threshold) => {
        if (depth >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          trackEvent("scroll_depth", { percent: threshold, page_path: pathname });
        }
      });
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateScrollDepth);
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== "accepted") {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      const link =
        target instanceof Element ? target.closest<HTMLAnchorElement>("a") : null;

      if (!link) {
        return;
      }

      const navigationId = link.dataset.analyticsNavigation;
      const navigationLocation = link.dataset.analyticsLocation;
      if (navigationId && navigationLocation) {
        trackEvent("navigation_click", {
          navigation_id: normalizeAnalyticsId(navigationId),
          navigation_location:
            navigationLocation === "mobile_menu" ||
            navigationLocation === "section_rail"
              ? navigationLocation
              : "desktop_header",
        });
      }

      const location = inferInteractionLocation(link);
      const rawHref = link.getAttribute("href") ?? "";
      if (rawHref.includes("linkedin.com")) {
        trackEvent("linkedin_click", { location });
      } else if (rawHref.includes("calendly.com")) {
        trackEvent("book_call_click", { location });
      } else if (rawHref.startsWith("mailto:")) {
        trackEvent("email_click", { location });
      } else if (
        link.hasAttribute("download") ||
        /kayode-popoola-(?:cv|executive-profile)\.pdf$/i.test(rawHref)
      ) {
        trackEvent("cv_download", { location });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [consent]);

  const chooseConsent = (nextConsent: AnalyticsConsent) => {
    const withdrawingConsent =
      nextConsent === "rejected" &&
      (consent === "accepted" || window.__popeblackAnalyticsConsent === "accepted");

    saveConsent(nextConsent);
    setConsent(nextConsent);
    setPreferencesOpen(false);

    if (nextConsent === "accepted") {
      activateAnalytics();
      return;
    }

    window.__popeblackAnalyticsConsent = "rejected";
    clearAnalyticsQueue();
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.clarity?.("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "denied",
    });
    removeAnalyticsCookies();

    if (withdrawingConsent) {
      window.location.reload();
    }
  };

  if (!analyticsAvailable) {
    return null;
  }

  return (
    <>
      {preferencesOpen ? (
        <section
          className="analytics-consent"
          role="region"
          aria-labelledby="analytics-consent-title"
        >
          <div className="analytics-consent-copy">
            <div className="meta-stack">Privacy preferences</div>
            <h2 id="analytics-consent-title">Optional website analytics</h2>
            <p>
              With your permission, Google Analytics and Microsoft Clarity help
              improve this website. Contact-form content is masked and form
              values are never sent to analytics. Read the{" "}
              <Link href="/privacy">privacy notice</Link>.
            </p>
          </div>
          <div className="analytics-consent-actions">
            <button
              type="button"
              className="button-primary"
              onClick={() => chooseConsent("accepted")}
            >
              Accept analytics
            </button>
            <button
              type="button"
              className="button-secondary"
              onClick={() => chooseConsent("rejected")}
            >
              Reject analytics
            </button>
          </div>
        </section>
      ) : consent ? (
        <button
          type="button"
          className="analytics-preferences-button"
          aria-label="Change analytics preferences"
          title="Change analytics preferences"
          onClick={() => setPreferencesOpen(true)}
        >
          <Settings2 size={17} aria-hidden="true" />
        </button>
      ) : null}
    </>
  );
}
