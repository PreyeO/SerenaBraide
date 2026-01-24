import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.number(),
  base_price: z.string().min(1),
  is_featured: z.boolean(),
  images: z
    .array(
      z.object({
        file: z.any(), // Accept any type since we store File in ref
        is_primary: z.boolean(),
        alt_text: z.string().optional(),
        order: z.number(),
      }),
    )
    .min(1, "At least one image is required"),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  parent: z.number().nullable(),
});

export const CreateVariantSchema = z.object({
  product_id: z.number().min(1, "Product is required"),
  sku: z.string().min(1, "SKU is required"),
  size: z.string().min(1, "Size is required"),
  color: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  stock_quantity: z.number().min(0, "Stock quantity must be 0 or greater"),
  is_active: z.boolean(),
  images: z
    .array(
      z.object({
        file: z.any(), // Accept any type since we store File in ref
        is_primary: z.boolean(),
        alt_text: z.string().optional(),
        order: z.number(),
      }),
    )
    .min(1, "At least one image is required"),
});

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const ResetPasswordSchema = z
  .object({
    otp: z.string().length(6, "OTP must be 6 digits"),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
          "Password must contain upper, lower, number and special character",
      }),
    new_password_repeated: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.new_password_repeated, {
    path: ["new_password_repeated"],
    message: "Passwords do not match",
  });
