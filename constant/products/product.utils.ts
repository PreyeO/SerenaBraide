import { ProductDetail, Variant, VariantImage } from "./product.type";

/**
 * Color name to hex value mapping
 */
const COLOR_MAP: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#FF0000",
  blue: "#0000FF",
  green: "#008000",
  yellow: "#FFFF00",
  orange: "#FFA500",
  purple: "#800080",
  pink: "#FFC0CB",
  brown: "#A52A2A",
  gray: "#808080",
  grey: "#808080",
  beige: "#F5F5DC",
  navy: "#000080",
  teal: "#008080",
  coral: "#FF7F50",
  gold: "#FFD700",
  silver: "#C0C0C0",
  cream: "#FFFDD0",
  maroon: "#800000",
  olive: "#808000",
  tan: "#D2B48C",
  nude: "#E3BC9A",
  rose: "#FF007F",
  burgundy: "#800020",
  champagne: "#F7E7CE",
  ivory: "#FFFFF0",
  charcoal: "#36454F",
};

/**
 * Converts a color name to its hex value
 */
export function getColorValue(colorName: string): string {
  const lowerCaseName = colorName.toLowerCase();
  return COLOR_MAP[lowerCaseName] || colorName;
}

/**
 * Formats a price value to Naira currency format
 */
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return `₦${numPrice.toLocaleString()}`;
}

/**
 * Gets the primary image URL for a product/variant
 */
export function getPrimaryImage(
  product: ProductDetail,
  selectedVariant: Variant | null,
  fallback: string = "/product-1.png",
): string {
  // If a variant is selected, prioritize its images
  if (selectedVariant?.images?.length) {
    const variantPrimaryImage = selectedVariant.images.find(
      (img) => img.is_primary,
    );
    if (variantPrimaryImage) return variantPrimaryImage.image_url;
    return selectedVariant.images[0].image_url;
  }

  // First try to get primary image from product images (variant === null)
  const productPrimaryImage = product.images.find(
    (img) => img.is_primary && img.variant === null,
  );
  if (productPrimaryImage) return productPrimaryImage.image_url;

  // Then try any product image (variant === null)
  const anyProductImage = product.images.find((img) => img.variant === null);
  if (anyProductImage) return anyProductImage.image_url;

  // Then try first variant images if no variant selected
  if (product.variants?.length && product.variants[0].images?.length) {
    const variantPrimaryImage = product.variants[0].images.find(
      (img) => img.is_primary,
    );
    return (
      variantPrimaryImage?.image_url || product.variants[0].images[0].image_url
    );
  }

  return fallback;
}

/**
 * Gets variants that have color values
 */
export function getColorVariants(variants: Variant[]): Variant[] {
  return variants.filter((v) => v.color && v.color.trim() !== "");
}

/**
 * Checks if product has color variants
 */
export function hasColorVariants(variants: Variant[]): boolean {
  return getColorVariants(variants).length > 0;
}

/**
 * Gets the selected variant from a list
 */
export function getSelectedVariant(
  variants: Variant[],
  selectedVariantId: number | null,
): Variant | null {
  if (!selectedVariantId) return null;
  return variants.find((v) => v.id === selectedVariantId) || null;
}

/**
 * Collects all display images for carousel (generic product images + selected variant images)
 */
export function getCarouselImages(
  product: ProductDetail,
  selectedVariant: Variant | null,
): Array<{ image_url: string; alt_text: string }> {
  const images: Array<{ image_url: string; alt_text: string }> = [];

  // Add generic product images first
  product.images
    .filter((img) => img.variant === null)
    .sort((a, b) => a.order - b.order)
    .forEach((img) => {
      images.push({
        image_url: img.image_url,
        alt_text: img.alt_text || product.name,
      });
    });

  // Add selected variant images
  if (selectedVariant?.images) {
    selectedVariant.images
      .sort((a, b) => a.order - b.order)
      .forEach((img) => {
        // Avoid duplicates if same URL exists
        if (!images.some((existing) => existing.image_url === img.image_url)) {
          images.push({
            image_url: img.image_url,
            alt_text:
              img.alt_text || `${product.name} - ${selectedVariant.size}`,
          });
        }
      });
  }

  return images;
}

/**
 * Gets non-primary variant images for display grid
 */
export function getNonPrimaryVariantImages(
  selectedVariant: Variant | null,
): VariantImage[] {
  if (!selectedVariant?.images) return [];
  return selectedVariant.images.filter((img) => !img.is_primary);
}

/**
 * Builds display images for the info section grid
 */
export function getDisplayImagesForGrid(
  product: ProductDetail,
  primaryImage: string,
  nonPrimaryVariantImages: VariantImage[],
): Array<{ image_url: string; alt_text: string }> {
  const images: Array<{ image_url: string; alt_text: string }> = [];

  // Always show primary image as first image
  images.push({
    image_url: primaryImage,
    alt_text: `${product.name} - Primary`,
  });

  // Add non-primary variant images
  if (nonPrimaryVariantImages.length > 0) {
    if (nonPrimaryVariantImages.length >= 2) {
      // Show both non-primary variant images
      images[0] = {
        image_url: nonPrimaryVariantImages[0].image_url,
        alt_text:
          nonPrimaryVariantImages[0].alt_text || `${product.name} - Variant 1`,
      };
      images.push({
        image_url: nonPrimaryVariantImages[1].image_url,
        alt_text:
          nonPrimaryVariantImages[1].alt_text || `${product.name} - Variant 2`,
      });
    } else {
      // Show primary + first non-primary variant image
      images.push({
        image_url: nonPrimaryVariantImages[0].image_url,
        alt_text:
          nonPrimaryVariantImages[0].alt_text || `${product.name} - Variant`,
      });
    }
  }

  return images;
}

/**
 * Gets variant or product level field with fallback
 */
export function getProductField<T>(
  product: ProductDetail,
  selectedVariant: Variant | null,
  fieldName: keyof Pick<ProductDetail, "inspiration" | "ingredients">,
): T | null {
  if (product[fieldName]) return product[fieldName] as T;
  if (selectedVariant?.[fieldName]) return selectedVariant[fieldName] as T;
  if (product.variants?.length && product.variants[0][fieldName]) {
    return product.variants[0][fieldName] as T;
  }
  return null;
}
