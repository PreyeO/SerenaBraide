import { z } from "zod";
import { phoneNumberSchema } from "@/lib/schemas/phone.schema";

// City and zip code remain optional, but state is required for delivery.
export const AddressSchema = z.object({
  address: z.string().min(2, "Address is required"),
  country: z.string().min(2, "Country is required"),
  state: z.string().trim().min(2, "State is required"),
  phone_number: phoneNumberSchema,
});

export const CreateAddressSchema = AddressSchema;

// All fields optional on edit EXCEPT phone_number, which stays required and
// format-validated — a delivery phone is always needed.
export const UpdateAddressSchema = AddressSchema.partial().extend({
  phone_number: phoneNumberSchema,
});