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

// Review Types
export interface VariantImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  alt_text: string;
  order: number;
  variant: number;
  created_at: string;
}

export interface ReviewVariant {
  id: number;
  product: number;
  product_name: string;
  sku: string;
  size: string;
  color: string | null;
  price: string;
  effective_price: number;
  stock_quantity: number;
  is_in_stock: boolean;
  is_active: boolean;
  images: VariantImage[];
  ingredients: string | null;
  inspiration: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReviewOrderItem {
  id: number;
  variant: ReviewVariant;
  variant_id: number;
  quantity: number;
  price: string;
  subtotal: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewCustomerProfile {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
}

export interface Review {
  id: number;
  customer_profile: ReviewCustomerProfile;
  reviewer_name: string;
  order_item: ReviewOrderItem;
  rating: number;
  review: string;
  is_approved: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface ReviewListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Review[];
}

// Staff Types
export interface Staff {
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
  customer_profile: null;
  admin_profile: {
    id: number;
    user: number;
  } | null;
  email_validated: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  date_joined: string;
}

export interface StaffListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Staff[];
}

export interface CreateStaffInvitePayload {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface CreateStaffInviteResponse {
  message: string;
  invite_id: string;
}