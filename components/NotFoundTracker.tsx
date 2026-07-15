"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function NotFoundTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("not_found_view", { page_path: pathname });
  }, [pathname]);

  return null;
}
