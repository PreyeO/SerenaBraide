// lib/schemas/phone.schema.ts
import { z } from "zod";

/**
 * The one phone number rule for the whole site.
 *
 * Accepts Nigerian numbers (0XXXXXXXXXX, 234XXXXXXXXXX, +234XXXXXXXXXX) as well
 * as any international E.164 number (+<country><digits>). Spaces, dashes and
 * parentheses are ignored.
 *
 * Shared so signup and checkout cannot drift apart. They did: checkout validated
 * properly while signup used a bare `z.string()`, which let an empty phone number
 * through to the API — where it crashed the registration endpoint with a 500
 * instead of being rejected cleanly.
 */
export const phoneNumberSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine((value) => {
    const digits = value.replace(/[\s()-]/g, "");
    return (
      /^(?:\+?234|0)[789]\d{9}$/.test(digits) ||
      /^\+[1-9]\d{7,14}$/.test(digits)
    );
  }, "Enter a valid phone number");
