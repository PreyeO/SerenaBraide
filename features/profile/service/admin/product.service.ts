import { api } from "@/lib/axios";

import { AxiosResponse } from "axios";
import {
  CreateCategoryValues,
  CreateProductValues,
  CreateVariantValues,
} from "../../type/admin/product.type";

export async function createProduct(data: CreateProductValues) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("category", String(data.category));
  formData.append("base_price", data.base_price);
  formData.append("is_featured", String(data.is_featured));

  // Try format: images[0].image_url (with dot before field name)
  // This is the format used by some DRF parsers
  data.images.forEach((img, index) => {
    if (!img.file || !(img.file instanceof File)) {
      throw new Error(`Image file missing or invalid at index ${index}`);
    }

    formData.append(`images[${index}].image_url`, img.file);
    formData.append(`images[${index}].is_primary`, String(img.is_primary));
    formData.append(`images[${index}].alt_text`, img.alt_text || "");
    formData.append(`images[${index}].order`, String(img.order));
  });

  // Log FormData contents for debugging
  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    console.log(`  ${key}:`, value instanceof File ? `File(${value.name})` : value);
  }

  const response = await api.post("/api/products/", formData);

  return response.data;
}

export async function createCategory(
  data: CreateCategoryValues
): Promise<CreateCategoryValues> {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);

  // Append parent - send empty string if null/undefined for root categories
  // Some APIs expect the field to be present even if it's empty
  if (data.parent !== null && data.parent !== undefined) {
    formData.append("parent", String(data.parent));
  } else {
    // Explicitly send empty string for root categories if API requires it
    // Comment out the next line if API doesn't accept empty parent field
    // formData.append("parent", "");
  }

  // Append is_active - default to true so categories appear in lists immediately
  formData.append("is_active", String(data.is_active ?? true));

  // Append image if provided
  if (data.image_url && data.image_url instanceof File) {
    formData.append("image_url", data.image_url);
  }

  // Append image alt text if provided
  if (data.image_alt_text) {
    formData.append("image_alt_text", data.image_alt_text);
  }

  const response: AxiosResponse<CreateCategoryValues> = await api.post(
    "/api/categories/",
    formData
  );
  return response.data;
}

export async function getCategories() {
  const res = await api.get("/api/categories/", {
    params: {
      page_size: 1000,
    },
  });
  
  // API returns paginated response with results array
  // Extract the results array from the paginated response
  let categories: any[] = [];
  
  if (Array.isArray(res.data)) {
    categories = res.data;
  } else if (Array.isArray(res.data.results)) {
    categories = res.data.results;
  } else if (res.data && typeof res.data === 'object') {
    const arrayKey = Object.keys(res.data).find(key => Array.isArray(res.data[key]));
    if (arrayKey) {
      categories = res.data[arrayKey];
    }
  }
  
  // Ensure we return an array (even if empty)
  if (!Array.isArray(categories)) {
    return [];
  }
  
  return categories;
}
export async function getProducts() {
  const res = await api.get("/api/products/");
  return res.data;
}

export async function getProductVariants(productId: number) {
  const res = await api.get(`/api/products/${productId}/variants/`);
  return res.data;
}

export async function createVariant(
  productId: number,
  data: CreateVariantValues
) {
  const formData = new FormData();

  formData.append("sku", data.sku);
  formData.append("size", data.size);
  if (data.color) {
    formData.append("color", data.color);
  }
  formData.append("price", data.price);
  formData.append("stock_quantity", String(data.stock_quantity));
  formData.append("is_active", String(data.is_active));

  // Append ingredients if provided
  if (data.ingredients !== null && data.ingredients !== undefined) {
    formData.append("ingredients", data.ingredients);
  }

  // Append inspiration if provided
  if (data.inspiration !== null && data.inspiration !== undefined) {
    formData.append("inspiration", data.inspiration);
  }

  data.images.forEach((img, index) => {
    if (!img.file || !(img.file instanceof File)) {
      throw new Error(`Image file missing or invalid at index ${index}`);
    }

    formData.append(`images[${index}].image_url`, img.file);
    formData.append(`images[${index}].is_primary`, String(img.is_primary));
    formData.append(`images[${index}].alt_text`, img.alt_text || "");
    formData.append(`images[${index}].order`, String(img.order));
  });

  // Log FormData contents for debugging
  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    console.log(`  ${key}:`, value instanceof File ? `File(${value.name})` : value);
  }

  const response = await api.post(
    `/api/products/${productId}/variants/`,
    formData
  );

  return response.data;
}
