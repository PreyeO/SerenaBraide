import { z } from "zod";

export const AddressSchema = z.object({
  address: z.string().min(2, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  country: z.string().min(2, "Country is required"),
  phone_number: z.string().optional().or(z.literal("")),
});

export const CreateAddressSchema = AddressSchema;
export const UpdateAddressSchema = AddressSchema.partial();