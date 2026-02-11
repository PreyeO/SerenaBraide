import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import {
  Customer,
  CustomerListResponse,
  Review,
  ReviewListResponse,
  StaffListResponse,
  CreateStaffInvitePayload,
  CreateStaffInviteResponse,
  RevenueGraphResponse,
  DashboardCardsResponse,
  CustomerLocationData,
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
  const response: AxiosResponse<ReviewListResponse> =
    await api.get("/api/ratings/");
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

export async function getAdminProfiles(): Promise<StaffListResponse> {
  const response: AxiosResponse<StaffListResponse> = await api.get(
    "/api/admin-profiles/",
  );
  return response.data;
}

export async function createAdminInvite(
  data: CreateStaffInvitePayload,
): Promise<CreateStaffInviteResponse> {
  const response: AxiosResponse<CreateStaffInviteResponse> = await api.post(
    "/api/users/admin-invite/",
    data,
  );
  return response.data;
}

export async function deleteAdminProfile(id: number): Promise<void> {
  await api.delete(`/api/admin-profiles/${id}/`);
}

// Dashboard APIs
export async function getRevenueGraph(
  year?: number,
): Promise<RevenueGraphResponse> {
  const params = year ? { year } : {};
  const response: AxiosResponse<RevenueGraphResponse> = await api.get(
    "/api/dashboard/revenue-graph/",
    { params },
  );
  return response.data;
}

export async function getDashboardCards(params?: {
  start_date?: string;
  end_date?: string;
}): Promise<DashboardCardsResponse> {
  const response: AxiosResponse<DashboardCardsResponse> = await api.get(
    "/api/dashboard/cards/",
    { params },
  );
  return response.data;
}

export async function getCustomersByLocation(): Promise<CustomerLocationData[]> {
  const response: AxiosResponse<CustomerLocationData[]> = await api.get(
    "/api/dashboard/customers-by-location/",
  );
  return response.data;
}
