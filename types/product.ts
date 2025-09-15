export interface Product {
  type: string;
  price: string;
  name: string;
  src: string;
  sizes: string[]; // ["3ML", "10ML", ...]
  rating: number; // 4.5
  reviews: number; // e.g., 120
  sold: string;
}
