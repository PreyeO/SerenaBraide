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
  const response: AxiosResponse<CreateCategoryValues> = await api.post(
    "/api/categories/",
    data
  );
  return response.data;
}

export async function getCategories() {
  const res = await api.get("/api/categories/");
  return res.data;
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
