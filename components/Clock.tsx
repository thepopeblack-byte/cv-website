"use client";

import { useSyncExternalStore } from "react";

function formatLagosTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Africa/Lagos",
    hour12: false,
  }).format(new Date());
}

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 1000);
  return () => window.clearInterval(timer);
}

function getServerSnapshot() {
  return "--:--:--";
}

export function Clock() {
  const time = useSyncExternalStore(subscribe, formatLagosTime, getServerSnapshot);
  return <span suppressHydrationWarning>{time}</span>;
}
