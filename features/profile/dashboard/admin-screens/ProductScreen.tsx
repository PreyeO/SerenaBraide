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
import { useGetProducts } from "@/features/profile/hooks/admin/useGetProducts";
import { AllProduct } from "@/features/profile/type/admin/product.type";

const ProductScreen = () => {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <p>Loading products...</p>;

  return (
    <section className="p-4">
      <h1 className="text-xl font-semibold mb-4">Products</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products?.map((product: AllProduct) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>

              <TableCell>
                {product.primary_image ? (
                  <div className="w-12 h-12 relative">
                    <Image
                      src={product.primary_image}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-xs rounded">
                    No Image
                  </div>
                )}
              </TableCell>

              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category_name}</TableCell>

              <TableCell>₦{product.base_price}</TableCell>

              <TableCell>
                {product.is_featured ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-gray-500">No</span>
                )}
              </TableCell>

              <TableCell>
                {product.in_stock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600">Out</span>
                )}
              </TableCell>

              <TableCell>
                {new Date(product.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ProductScreen;
