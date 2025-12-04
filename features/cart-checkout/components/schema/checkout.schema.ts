import { z } from "zod";

export const AddressSchema = z.object({
  full_name: z.string().min(2, "First name is required"),
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number seems too long"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  street_name: z.string().min(2, "Street name is required"),
  address_title: z.string().optional(),
  LGA: z.string().optional(),
  zipcode: z.string().optional(),
  unit_info: z.string().optional(),
});
