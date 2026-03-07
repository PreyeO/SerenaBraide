import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import {
  CategoryTree,
  ProductDetail,
  ProductListParams,
  ProductListResponse,
  ProductListItem,
  ReviewsResponse,
} from "./product.type";

export async function getReviews(productId: number): Promise<ReviewsResponse> {
  const response: AxiosResponse<ReviewsResponse> = await api.get(
    `/api/ratings/?product_id=${productId}`,
  );
  return response.data;
}

export async function getCategoriesTree(): Promise<CategoryTree[]> {
  const response: AxiosResponse<CategoryTree[]> = await api.get(
    "/api/categories/tree/",
  );
  return response.data;
}

export async function getProducts(
  params?: ProductListParams,
): Promise<ProductListResponse> {
  const queryParams = new URLSearchParams();

  if (params?.category) {
    queryParams.append("category", params.category);
  }
  if (params?.search) {
    queryParams.append("search", params.search);
  }
  if (params?.is_featured !== undefined) {
    queryParams.append("is_featured", String(params.is_featured));
  }
  if (params?.slug) {
    queryParams.append("slug", params.slug);
  }

  // Request more items to handle pagination
  queryParams.append("page_size", "20");

  const queryString = queryParams.toString();
  const url = `/api/products/${queryString ? `?${queryString}` : ""}`;

  const response: AxiosResponse<ProductListResponse> = await api.get(url);
  return response.data;
}

export async function getProductById(
  productId: number,
): Promise<ProductDetail> {
  const response: AxiosResponse<ProductDetail> = await api.get(
    `/api/products/${productId}/`,
  );
  return response.data;
}

export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  // 1. Attempt to fetch by slug if the backend supports it (best case: 1 call)
  const response = await getProducts({ slug });
  const product = response.results.find((p) => p.slug === slug);

  if (product) {
    return getProductById(product.id);
  }

  // 2. Fallback search (though backend SHOULD have an endpoint for this)
  const searchResponse = await getProducts({ search: slug });
  const searchProduct = searchResponse.results.find((p) => p.slug === slug);

  if (!searchProduct) {
    throw new Error("Product not found");
  }

  return getProductById(searchProduct.id);
}

// ... existing code ...
export async function getFeaturedProducts(): Promise<ProductListItem[]> {
  const response: AxiosResponse<ProductListItem[]> = await api.get(
    "/api/products/featured/",
  );
  return response.data;
}

export async function getAllProducts(): Promise<ProductListResponse> {
  const response: AxiosResponse<ProductListResponse> =
    await api.get("/api/products/");
  return response.data;
}
