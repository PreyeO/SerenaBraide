import { z } from "zod";

export const RecipientSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().optional(),
});
export const BalanceSchema = z.object({
  card_number: z.string().min(2, "Enter your gift card number"),
  pin: z.string().min(2, "Enter your gift card pin"),
});
