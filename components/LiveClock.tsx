"use client";

import { useEffect, useState } from "react";

const lagosTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function getLagosTime() {
  return lagosTimeFormatter.format(new Date());
}

export function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(getLagosTime());

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div
      className="live-clock"
      aria-label={
        time ? `Remote Lagos time: ${time}` : "Remote work timezone: UTC+1"
      }
    >
      <span className="live-clock-dot" aria-hidden="true" />
      <span>Remote (UTC+1)</span>
      {time ? (
        <time className="live-clock-time" suppressHydrationWarning>
          {time}
        </time>
      ) : null}
    </div>
  );
}
