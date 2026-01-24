"use client";

import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { AllProduct } from "@/features/profile/type/admin/product.type";

interface ProductTableProps {
  products: AllProduct[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
            <TableHead className="font-semibold text-[#3B3B3B]">ID</TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">Image</TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">Name</TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">Category</TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">Price</TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">Featured</TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">Stock</TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products?.map((product: AllProduct) => (
            <TableRow key={product.id} className="hover:bg-[#FAFAFA]">
              <TableCell className="text-[#6F6E6C]">{product.id}</TableCell>

              <TableCell>
                {product.primary_image ? (
                  <div className="w-16 h-16 relative rounded-md overflow-hidden">
                    <Image
                      src={product.primary_image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-[#F0F0F0] flex items-center justify-center text-xs text-[#6F6E6C] rounded-md">
                    No Image
                  </div>
                )}
              </TableCell>

              <TableCell className="font-medium text-[#3B3B3B]">
                {product.name}
              </TableCell>
              <TableCell className="text-[#6F6E6C]">
                {product.category_name}
              </TableCell>

              <TableCell className="font-medium text-[#3B3B3B]">
                ₦{product.base_price}
              </TableCell>

              <TableCell>
                {product.is_featured ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    No
                  </span>
                )}
              </TableCell>

              <TableCell>
                {product.in_stock ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    Out of Stock
                  </span>
                )}
              </TableCell>

              <TableCell className="text-[#6F6E6C]">
                {new Date(product.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;

