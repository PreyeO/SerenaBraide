import { z } from "zod";
import { phoneNumberSchema } from "@/lib/schemas/phone.schema";

// City, state and zip code are collected nowhere in the UI anymore (backend
// treats them as optional) — only address, country and phone are asked for.
export const AddressSchema = z.object({
  address: z.string().min(2, "Address is required"),
  country: z.string().min(2, "Country is required"),
  phone_number: phoneNumberSchema,
});

export const CreateAddressSchema = AddressSchema;

// All fields optional on edit EXCEPT phone_number, which stays required and
// format-validated — a delivery phone is always needed.
export const UpdateAddressSchema = AddressSchema.partial().extend({
  phone_number: phoneNumberSchema,
});