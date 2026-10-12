// components/analytics/Analytics.tsx
"use client";

import { useEffect, useState } from "react";
import MetaPixel from "./MetaPixel";
import TikTokPixel from "./TikTokPixel";
import GoogleAnalytics from "./GoogleAnalytics";
import { syncInternalTrafficFlag } from "@/lib/analytics/internal-traffic";

/**
 * Mounts every tracker — unless this browser has been marked as the team's
 * (`?internal=1`), in which case none of them load and nothing is reported.
 * The check needs localStorage, so trackers mount right after hydration rather
 * than during it.
 */
export default function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!syncInternalTrafficFlag());
  }, []);

  if (!enabled) return null;

  return (
    <>
      <MetaPixel />
      <TikTokPixel />
      <GoogleAnalytics />
    </>
  );
}
