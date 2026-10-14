// components/analytics/MicrosoftClarity.tsx
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Set as NEXT_PUBLIC_CLARITY_PROJECT_ID. Empty means Clarity is switched off. */
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";

// Same exclusion as the other trackers: staff dashboard sessions aren't recorded.
const EXCLUDED_PREFIXES = ["/admin"];

function isTrackedPath(pathname: string): boolean {
  return !EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

// Microsoft's standard loader. Clarity follows client-side navigation on its
// own, so there are no page views to report by hand. Masking is set to Strict
// in the Clarity dashboard, so nothing customers type is ever recorded.
const loader = `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`;

export default function MicrosoftClarity() {
  const pathname = usePathname() ?? "";
  const isTracked = Boolean(CLARITY_PROJECT_ID) && isTrackedPath(pathname);

  // Latches on at the first tracked page, like the pixels — re-running the
  // loader would start a second recording.
  const [mounted, setMounted] = useState(isTracked);
  const mountedRef = useRef(isTracked);

  useEffect(() => {
    if (isTracked && !mountedRef.current) {
      mountedRef.current = true;
      setMounted(true);
    }
  }, [isTracked]);

  if (!CLARITY_PROJECT_ID || !mounted) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: loader }}
    />
  );
}
