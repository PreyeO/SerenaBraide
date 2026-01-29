export interface Address {
  id: number;
  customer_profile: number;
  phone_number: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
  created_on: string;
  updated_on: string;
}

export interface CustomerProfile {
  id: number;
  user: number;
  addresses: Address[];
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  date_of_birth: string | null;
  country: string;
  city: string | null;
  is_customer: boolean;
  is_admin: boolean;
  customer_profile: CustomerProfile;
  admin_profile: null; // Assuming null for now based on JSON
  email_validated: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  date_joined: string;
}

export interface CustomerListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Customer[];
}
