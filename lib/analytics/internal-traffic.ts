// lib/analytics/internal-traffic.ts
/**
 * Opt a device out of all analytics (Meta, TikTok, Google Analytics).
 *
 * The team tests checkout and payments on the live site, and those visits were
 * landing in the same funnels the ad spend is judged on. Opening the site once
 * with `?internal=1` marks the browser as internal for good; `?internal=0`
 * undoes it. It's per browser, so each phone/laptop needs it once.
 */

const STORAGE_KEY = "sb_internal_traffic";

export function isInternalTraffic(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Apply `?internal=1` / `?internal=0` from the current URL, then report the state. */
export function syncInternalTrafficFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const flag = new URLSearchParams(window.location.search).get("internal");
    if (flag === "1") window.localStorage.setItem(STORAGE_KEY, "1");
    if (flag === "0") window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage blocked — treat as a normal visitor */
  }
  return isInternalTraffic();
}
