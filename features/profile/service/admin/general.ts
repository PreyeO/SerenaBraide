import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import {
  Customer,
  CustomerListResponse,
  Review,
  ReviewListResponse,
} from "../../type/admin/general.type";

export async function getCustomers(): Promise<CustomerListResponse> {
  const response: AxiosResponse<CustomerListResponse> = await api.get(
    "/api/customer-profiles/",
  );
  return response.data;
}

export async function getCustomerDetail(id: number): Promise<Customer> {
  const response: AxiosResponse<Customer> = await api.get(
    `/api/customer-profiles/${id}/`,
  );
  return response.data;
}

export async function getReviews(): Promise<ReviewListResponse> {
  const response: AxiosResponse<ReviewListResponse> = await api.get(
    "/api/ratings/",
  );
  return response.data;
}

export async function getReview(id: number): Promise<Review> {
  const response: AxiosResponse<Review> = await api.get(`/api/ratings/${id}/`);
  return response.data;
}

export async function updateReviewApproval(
  id: number,
  isApproved: boolean,
): Promise<Review> {
  const response: AxiosResponse<Review> = await api.patch(
    `/api/ratings/${id}/`,
    {
      is_approved: isApproved,
    },
  );
  return response.data;
}