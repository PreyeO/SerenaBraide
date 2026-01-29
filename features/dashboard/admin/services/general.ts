import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Customer, CustomerListResponse } from "../types/customer";

export async function getCustomers(): Promise<CustomerListResponse> {
    const response: AxiosResponse<CustomerListResponse> = await api.get(
        "/api/customer-profiles/"
    );
    return response.data;
}

export async function getCustomerDetail(id: number): Promise<Customer> {
    const response: AxiosResponse<Customer> = await api.get(
        `/api/customer-profiles/${id}/`
    );
    return response.data;
}
