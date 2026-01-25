import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import {
  CategoryTree,
  ProductDetail,
  ProductListParams,
  ProductListResponse,
  ReviewsResponse,
} from "./product.type";

export async function getReviews(productId: number): Promise<ReviewsResponse> {
  const response: AxiosResponse<ReviewsResponse> = await api.get(
    `/api/ratings/?order_item__variant__product=${productId}`,
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

  // Request more items to handle pagination
  queryParams.append("page_size", "100");

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
  console.log("Looking for product with slug:", slug);

  // Fetch all products (no category filter since API expects category ID, not slug)
  const response = await getProducts();
  console.log("Products fetched:", response.results.length);
  console.log(
    "Available slugs:",
    response.results.map((p) => p.slug),
  );

  // Find exact match by slug
  const product = response.results.find((p) => p.slug === slug);

  if (!product) {
    console.error("Product not found with slug:", slug);
    throw new Error("Product not found");
  }

  console.log("Found product:", product.id, product.name);

  // Get full product details by ID
  return getProductById(product.id);
}
