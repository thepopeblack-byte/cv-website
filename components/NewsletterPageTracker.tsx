"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function NewsletterPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("newsletter_page_view", {
      page_path: pathname,
      device_layout: window.matchMedia("(max-width: 767px)").matches
        ? "mobile"
        : "desktop",
    });
  }, [pathname]);

  return null;
}
