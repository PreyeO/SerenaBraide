// components/analytics/TikTokPixel.tsx
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TIKTOK_PIXEL_ID, tiktokPageView } from "@/lib/analytics/tiktok-pixel";

/**
 * Routes the pixel stays off entirely — the same exclusion MetaPixel applies.
 *
 * Staff spend their working day in the dashboard, and those page views would
 * otherwise land in the audiences and conversion data ad spend is optimised
 * against. Admin only: the customer-facing auth pages stay tracked, because
 * registering is a funnel step.
 *
 * This helper and the mount latch below are duplicated from MetaPixel rather than
 * shared. Extracting them would mean editing the live Meta loader, which this
 * change deliberately leaves byte-identical. Worth consolidating later, in a
 * change that touches Meta alone and can be verified on its own.
 */
const EXCLUDED_PREFIXES = ["/admin"];

function isTrackedPath(pathname: string): boolean {
  return !EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * TikTok's base code, exactly as supplied by TikTok Events Manager, with only the
 * pixel ID interpolated.
 *
 * Left verbatim on purpose: it's a minified loader where a single wrong character
 * fails silently — the pixel simply never reports. Its trailing `ttq.page()`
 * reports the page it loads on, which is why the effect below skips that view.
 */
const baseCode = `!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


  ttq.load('${TIKTOK_PIXEL_ID}');
  ttq.page();
}(window, document, 'ttq');`;

/**
 * Mounted in the root layout alongside MetaPixel. The two are independent — each
 * gated on its own env var, so either can run without the other.
 */
export default function TikTokPixel() {
  const pathname = usePathname() ?? "";
  const isTracked = Boolean(TIKTOK_PIXEL_ID) && isTrackedPath(pathname);

  // Whether the base code is in the document. Latches on and never off: pulling
  // the snippet out and putting it back would re-run it and report a second page
  // view. Someone who opens the dashboard first and then browses the shop picks
  // the pixel up from that point on.
  const [baseCodeMounted, setBaseCodeMounted] = useState(isTracked);
  const baseCodeMountedRef = useRef(isTracked);

  // The snippet's own ttq.page() covers the page it loads on, so that first view
  // is already reported and must not be sent twice.
  const initialViewPending = useRef(isTracked);

  useEffect(() => {
    if (!isTracked) return;

    // First tracked page after starting somewhere excluded. Mounting the base
    // code reports it, so there's nothing to send by hand here.
    if (!baseCodeMountedRef.current) {
      baseCodeMountedRef.current = true;
      setBaseCodeMounted(true);
      return;
    }

    if (initialViewPending.current) {
      initialViewPending.current = false;
      return;
    }

    // Every client-side navigation after that. The snippet only ever runs once,
    // so these views have to be reported manually.
    tiktokPageView();
  }, [pathname, isTracked]);

  // No pixel ID configured — render nothing rather than shipping a snippet that
  // would load against an empty ID.
  if (!TIKTOK_PIXEL_ID) return null;

  return (
    <>
      {baseCodeMounted && (
        <Script
          id="tiktok-pixel-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: baseCode }}
        />
      )}
    </>
  );
}
