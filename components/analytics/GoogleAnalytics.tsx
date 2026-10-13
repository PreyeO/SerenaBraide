// components/analytics/GoogleAnalytics.tsx
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  GA_MEASUREMENT_ID,
  gaPageView,
  redactedLocation,
} from "@/lib/analytics/google-analytics";

// Same exclusion as the Meta and TikTok pixels: staff dashboard traffic stays out.
const EXCLUDED_PREFIXES = ["/admin"];

function isTrackedPath(pathname: string): boolean {
  return !EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function GoogleAnalytics() {
  const pathname = usePathname() ?? "";
  const isTracked = Boolean(GA_MEASUREMENT_ID) && isTrackedPath(pathname);

  // Latches on once the first tracked page is reached, like the pixels.
  const [initialised, setInitialised] = useState(false);
  const initialisedRef = useRef(false);

  // Google's standard snippet, run here rather than as an inline script. Calls
  // queue in dataLayer until gtag.js arrives, so nothing is lost meanwhile.
  // Automatic page views are off (send_page_view: false, and "page changes based
  // on browser history events" is unticked in the GA stream) so every page view
  // goes through gaPageView, which strips emails from the URL.
  useEffect(() => {
    if (!isTracked || initialisedRef.current) return;
    initialisedRef.current = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js expects the raw arguments object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
    setInitialised(true);
  }, [isTracked]);

  const lastTitle = useRef<string | null>(null);

  useEffect(() => {
    if (!isTracked || !initialised) return;

    // Captured now, so a view sent late (or on leaving) still has this page's URL.
    const location = redactedLocation();
    const send = () => {
      lastTitle.current = document.title;
      gaPageView(location);
    };

    // First page of the visit: the title is already in place.
    // Moving between pages: Next.js can set the new page's title a moment
    // after the URL changes, so wait (briefly) for it — otherwise GA records
    // the previous page's title against this page.
    if (lastTitle.current === null || document.title !== lastTitle.current) {
      send();
      return;
    }

    let sent = false;
    const sendOnce = () => {
      if (sent) return;
      sent = true;
      observer.disconnect();
      clearTimeout(fallback);
      send();
    };
    const observer = new MutationObserver(() => {
      if (document.title !== lastTitle.current) sendOnce();
    });
    observer.observe(document.head, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    // Pages that share a title never change it — don't wait on those for long.
    const fallback = setTimeout(sendOnce, 600);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
      // Left before the title settled: still count the view.
      if (!sent) send();
    };
  }, [pathname, isTracked, initialised]);

  if (!GA_MEASUREMENT_ID || !initialised) return null;

  return (
    <Script
      id="ga-gtag"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
    />
  );
}
