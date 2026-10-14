// features/auth/utils/account.utils.ts

const LOWER = "abcdefghijkmnopqrstuvwxyz";
const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const DIGITS = "23456789";
const SPECIAL = "!@#$%^&*?";
const ALL = LOWER + UPPER + DIGITS + SPECIAL;

function randomIndex(max: number): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

const pick = (chars: string) => chars[randomIndex(chars.length)];

/**
 * A strong random password for accounts created at checkout. The checkout form
 * doesn't ask for one — customers who come back sign in with "Forgot password".
 * Always meets the backend rules (8+ chars, upper, lower, number, special); it's
 * generated in the browser with a secure random source and only ever sent to
 * the API.
 */
export function generateAccountPassword(length = 16): string {
  const chars = [pick(LOWER), pick(UPPER), pick(DIGITS), pick(SPECIAL)];
  while (chars.length < length) chars.push(pick(ALL));

  // Shuffle so the guaranteed characters aren't always at the start.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

/**
 * True when signup failed because the customer already has an account — the
 * backend rejects an email (or phone number) that's already registered.
 */
export function isExistingAccountError(error: unknown): boolean {
  const response = (error as { response?: { status?: number; data?: unknown } })
    ?.response;
  if (response?.status !== 400 || !response.data || typeof response.data !== "object") {
    return false;
  }
  const data = response.data as Record<string, unknown>;
  return ["email", "phone_number"].some((field) =>
    JSON.stringify(data[field] ?? "").toLowerCase().includes("exist"),
  );
}
