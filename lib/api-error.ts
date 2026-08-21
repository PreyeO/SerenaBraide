// lib/api-error.ts
// Extracts a human-readable message from the many error shapes our Django REST
// Framework backend can return, so users see the real reason instead of a
// generic "Something went wrong".
//
// Handles:
//   "plain string"
//   { detail: "..." }                              (DRF APIException)
//   { detail: ["...", "..."] }
//   { message: "..." } / { error: "..." }
//   { non_field_errors: ["..."] }                  (DRF serializer, form-level)
//   { errors: [...] } / { errors: { field: [...] } }
//   { phone_number: ["..."], email: ["..."] }      (DRF serializer, field-level)

export const DEFAULT_ERROR_MESSAGE = "Something went wrong";

// Keys that carry a global/non-field message. Checked before field-level keys
// so the most user-relevant message wins.
const PRIORITY_KEYS = [
  "detail",
  "non_field_errors",
  "message",
  "error",
  "errors",
] as const;

/** Recursively pull the first non-empty string out of a string | array | object. */
function firstString(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = firstString(item);
      if (found) return found;
    }
    return null;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      const found = firstString(item);
      if (found) return found;
    }
  }
  return null;
}

/** "phone_number" -> "Phone number" */
function humanizeField(field: string): string {
  const spaced = field.replace(/[_-]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Turn any backend error (or axios error) into a single readable sentence.
 * Falls back to `fallback` only when nothing usable can be found.
 */
export function getApiErrorMessage(
  error: unknown,
  fallback: string = DEFAULT_ERROR_MESSAGE,
): string {
  // Unwrap axios errors; otherwise treat the value itself as the payload.
  const data =
    (error as { response?: { data?: unknown } })?.response?.data ?? error;

  if (typeof data === "string") {
    const trimmed = data.trim();
    // Never surface a raw HTML body (e.g. a server 500 error page) or an
    // oversized string to the user — fall back to the friendly message.
    if (!trimmed || trimmed.startsWith("<") || trimmed.length > 300) {
      return fallback;
    }
    return trimmed;
  }
  if (!data || typeof data !== "object") {
    return fallback;
  }

  const record = data as Record<string, unknown>;

  // 1) Global / non-field messages first.
  for (const key of PRIORITY_KEYS) {
    if (key in record) {
      const message = firstString(record[key]);
      if (message) return message;
    }
  }

  // 2) Top-level field errors, e.g. { phone_number: ["...already exists."] }.
  //    Prefix the field name only when the message doesn't already name it,
  //    so "...this phone number already exists." stays clean but a generic
  //    "This field is required." becomes "Phone number: This field is required."
  for (const [key, value] of Object.entries(record)) {
    const message = firstString(value);
    if (!message) continue;

    const fieldWords = key.replace(/[_-]+/g, " ").toLowerCase();
    const mentionsField = message.toLowerCase().includes(fieldWords);
    return mentionsField ? message : `${humanizeField(key)}: ${message}`;
  }

  return fallback;
}
