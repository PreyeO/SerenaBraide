import { z } from "zod";

// Accepts Nigerian numbers (0XXXXXXXXXX, 234XXXXXXXXXX, +234XXXXXXXXXX) as well
// as any international E.164 number (+<country><digits>). Spaces, dashes and
// parentheses are ignored.
const phoneNumberSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine((value) => {
    const digits = value.replace(/[\s()-]/g, "");
    return (
      /^(?:\+?234|0)[789]\d{9}$/.test(digits) ||
      /^\+[1-9]\d{7,14}$/.test(digits)
    );
  }, "Enter a valid phone number");

export const AddressSchema = z.object({
  address: z.string().min(2, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip_code: z.string().optional().or(z.literal("")),
  country: z.string().min(2, "Country is required"),
  phone_number: phoneNumberSchema,
});

export const CreateAddressSchema = AddressSchema;

// All fields optional on edit EXCEPT phone_number, which stays required and
// format-validated — a delivery phone is always needed.
export const UpdateAddressSchema = AddressSchema.partial().extend({
  phone_number: phoneNumberSchema,
});