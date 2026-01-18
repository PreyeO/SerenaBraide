import { z } from "zod";

export const CreateRatingSchema = z.object({
  order_item: z.number().min(1, "Order item is required"),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
  review: z
    .string()
    .max(3000, "Review must be less than 3000 characters")
    .optional(),
});

export type CreateRatingFormValues = z.infer<typeof CreateRatingSchema>;


