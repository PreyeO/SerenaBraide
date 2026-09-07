import { z } from "zod";
import { phoneNumberSchema } from "@/lib/schemas/phone.schema";

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