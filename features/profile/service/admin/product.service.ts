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

  data.images.forEach((img, index) => {
    if (!img.file) {
      throw new Error("Image file missing");
    }

    formData.append(`images[${index}][file]`, img.file);
    formData.append(`images[${index}][is_primary]`, String(img.is_primary));
    formData.append(`images[${index}][alt_text]`, img.alt_text || "");
    formData.append(`images[${index}][order]`, String(img.order));
  });

  const response = await api.post("/api/products/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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
    if (!img.file) {
      throw new Error("Image file missing");
    }

    formData.append(`images[${index}][file]`, img.file);
    formData.append(`images[${index}][is_primary]`, String(img.is_primary));
    formData.append(`images[${index}][alt_text]`, img.alt_text || "");
    formData.append(`images[${index}][order]`, String(img.order));
  });

  const response = await api.post(
    `/api/products/${productId}/variants/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
