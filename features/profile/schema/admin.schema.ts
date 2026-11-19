import { z } from "zod";

/**
 * Optional "was" price for sales — display only, checkout charges the selling
 * price. Empty means "not on sale". When filled in it must be higher than the
 * selling price (the backend enforces the same rule).
 */
const compareAtPriceField = z
  .string()
  .trim()
  .optional()
  .refine((v) => !v || (!isNaN(Number(v)) && Number(v) > 0), "Enter a valid amount");

function checkCompareAt(priceKey: "base_price" | "price") {
  return (
    data: { compare_at_price?: string } & Record<string, unknown>,
    ctx: z.RefinementCtx,
  ) => {
    const compareAt = Number(data.compare_at_price);
    const price = Number(data[priceKey]);
    if (data.compare_at_price && !isNaN(compareAt) && !isNaN(price) && compareAt <= price) {
      ctx.addIssue({
        code: "custom",
        path: ["compare_at_price"],
        message: "The \"was\" price must be higher than the selling price",
      });
    }
  };
}

const ProductBaseSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.number(),
  base_price: z.string().min(1),
  compare_at_price: compareAtPriceField,
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

export const CreateProductSchema = ProductBaseSchema.superRefine(
  checkCompareAt("base_price"),
);

// Editing an existing product: same fields, but new images are optional
// (the product already has images) — any added here are appended.
export const UpdateProductSchema = ProductBaseSchema.extend({
  images: z
    .array(
      z.object({
        file: z.any(),
        is_primary: z.boolean(),
        alt_text: z.string().optional(),
        order: z.number(),
      }),
    )
    .optional(),
}).superRefine(checkCompareAt("base_price"));

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  parent: z.number().nullable().optional(), // Parent category ID (optional for root categories)
  image_url: z.any().optional(), // Category image file
  image_alt_text: z.string().optional(), // Image alt text
  is_active: z.boolean(), // Category active status (required, default to true in form)
});

const VariantBaseSchema = z.object({
  product_id: z.number().min(1, "Product is required"),
  sku: z.string().min(1, "SKU is required"),
  size: z.string().min(1, "Size is required"),
  color: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  compare_at_price: compareAtPriceField,
  stock_quantity: z.number().min(0, "Stock quantity must be 0 or greater"),
  is_active: z.boolean(),
  ingredients: z.string().nullable().optional(),
  inspiration: z.string().nullable().optional(),
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

export const CreateVariantSchema = VariantBaseSchema.superRefine(
  checkCompareAt("price"),
);

// Editing an existing variant: same fields, but new images are optional
// (the variant already has images) — any added here are appended.
export const UpdateVariantSchema = VariantBaseSchema.extend({
  images: z
    .array(
      z.object({
        file: z.any(),
        is_primary: z.boolean(),
        alt_text: z.string().optional(),
        order: z.number(),
      }),
    )
    .optional(),
}).superRefine(checkCompareAt("price"));

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

export const CreateStaffInviteSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().optional().or(z.literal("")),
});

export const CreateShippingAreaSchema = z.object({
  name: z.string().min(1, "Area name is required"),
  fee: z.string().min(1, "Shipping fee is required"),
});
