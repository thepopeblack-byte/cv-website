export const ANALYTICS_CONSENT_STORAGE_KEY = "popeblack-analytics-consent";

export type AnalyticsConsent = "accepted" | "rejected";

type AnalyticsLocation =
  | "desktop_header"
  | "mobile_menu"
  | "section_rail"
  | "hero"
  | "contact"
  | "footer"
  | "content";

type NewsletterAnalyticsContext = {
  page_path: string;
  cta_location: "newsletter_page" | "homepage" | "blog_page" | "article_footer";
  device_layout: "mobile" | "desktop";
};

type AnalyticsEventMap = {
  navigation_click: {
    navigation_id: string;
    navigation_location: AnalyticsLocation;
  };
  section_view: { section_id: string; page_path: string };
  scroll_depth: { percent: 25 | 50 | 75 | 90; page_path: string };
  mobile_swipe: { region_id: string; item_index: number };
  capability_view: { capability_id: string };
  case_study_view: { item_index: number };
  selected_work_view: { item_index: number };
  experience_role_view: { item_index: number };
  blog_post_view: { post_slug: string };
  linkedin_click: { location: AnalyticsLocation };
  book_call_click: { location: AnalyticsLocation };
  email_click: { location: AnalyticsLocation };
  cv_download: { location: AnalyticsLocation };
  contact_form_start: { form_id: "contact" };
  generate_lead: { method: "contact_form" };
  contact_form_submit_error: {
    error_type: "validation" | "server" | "network";
  };
  theme_change: { theme: "dark" | "light" };
  not_found_view: { page_path: string };
  newsletter_page_view: {
    page_path: string;
    device_layout: "mobile" | "desktop";
  };
  newsletter_section_view: NewsletterAnalyticsContext;
  substack_cta_click: NewsletterAnalyticsContext;
  substack_publication_click: NewsletterAnalyticsContext;
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type AnalyticsEventPayload<Name extends AnalyticsEventName> =
  AnalyticsEventMap[Name];

type AnalyticsPrimitive = string | number | boolean;
type AnalyticsPayload = Record<string, AnalyticsPrimitive>;
type GtagFunction = (...args: unknown[]) => void;
type ClarityFunction = ((...args: unknown[]) => void) & {
  q?: unknown[][];
};

type QueuedAnalyticsEvent = {
  name: AnalyticsEventName;
  payload: AnalyticsPayload;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
    clarity?: ClarityFunction;
    __popeblackAnalyticsConsent?: AnalyticsConsent;
    __popeblackAnalyticsQueue?: QueuedAnalyticsEvent[];
    __popeblackGaInitialized?: boolean;
    __popeblackClarityInitialized?: boolean;
  }
}

const blockedPayloadKeys = new Set([
  "name",
  "full_name",
  "email",
  "email_address",
  "company",
  "organisation",
  "organization",
  "message",
  "form_value",
  "phone",
  "telephone",
]);

function isAnalyticsEnabled() {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
}

function hasStoredConsent() {
  try {
    return (
      window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) === "accepted"
    );
  } catch {
    return false;
  }
}

function sanitizePayload(payload: AnalyticsPayload) {
  const safePayload: AnalyticsPayload = {};

  Object.entries(payload).forEach(([key, value]) => {
    if (blockedPayloadKeys.has(key.toLowerCase())) {
      return;
    }

    safePayload[key] = typeof value === "string" ? value.slice(0, 100) : value;
  });

  return safePayload;
}

function dispatchEvent(name: AnalyticsEventName, payload: AnalyticsPayload) {
  window.gtag?.("event", name, payload);
  window.clarity?.("event", name);
}

export function trackEvent<Name extends AnalyticsEventName>(
  name: Name,
  payload: AnalyticsEventPayload<Name>,
) {
  if (typeof window === "undefined" || !isAnalyticsEnabled()) {
    return;
  }

  const consentAccepted =
    window.__popeblackAnalyticsConsent === "accepted" || hasStoredConsent();

  if (!consentAccepted) {
    return;
  }

  const safePayload = sanitizePayload(payload as AnalyticsPayload);

  if (!window.gtag && !window.clarity) {
    window.__popeblackAnalyticsQueue ??= [];
    window.__popeblackAnalyticsQueue.push({ name, payload: safePayload });
    return;
  }

  dispatchEvent(name, safePayload);
}

export function flushAnalyticsQueue() {
  if (typeof window === "undefined") {
    return;
  }

  const queuedEvents = window.__popeblackAnalyticsQueue ?? [];
  window.__popeblackAnalyticsQueue = [];
  queuedEvents.forEach(({ name, payload }) => dispatchEvent(name, payload));
}

export function clearAnalyticsQueue() {
  if (typeof window !== "undefined") {
    window.__popeblackAnalyticsQueue = [];
  }
}

export function normalizeAnalyticsId(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 80) || "section"
  );
}
