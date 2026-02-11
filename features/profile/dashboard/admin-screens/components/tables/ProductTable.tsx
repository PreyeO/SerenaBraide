"use client";

import { useState } from "react";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { AllProduct } from "@/features/profile/type/admin/product.type";
import { useTableNavigation } from "@/features/profile/hooks/admin/useTableNavigation";
import { TableAction, TableActions } from "../shared/TableActions";
import { DataTable } from "../shared/DataTable";
import { StatusBadge } from "../shared/StatusBadge";
import { formatDate } from "../../../utils/array.utils";
import { useDeleteProduct } from "@/features/profile/hooks/admin/useDeleteProduct";
import DeleteConfirmationModal from "@/components/ui/modals/delete-confirmation-modal";
import { useIsSuperAdmin } from "@/hooks/useIsSuperAdmin";
import TablePagination from "../shared/TablePagination";

const ITEMS_PER_PAGE = 10;

interface ProductTableProps {
  products: AllProduct[];
  onAddProduct?: () => void;
  hideEmptyState?: boolean;
}

const PRODUCT_TABLE_HEADERS = [
  "ID",
  "Image",
  "Name",
  "Category",
  "Featured",
  "Stock",
  "Created At",
  "Actions",
];

const ProductTable = ({ products, onAddProduct, hideEmptyState }: ProductTableProps) => {
  const { navigateToProduct } = useTableNavigation();
  const isSuperAdmin = useIsSuperAdmin();
  const [productToDelete, setProductToDelete] = useState<AllProduct | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((products?.length || 0) / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const deleteProductMutation = useDeleteProduct({
    onSuccess: () => {
      setProductToDelete(null);
    },
  });

  const getProductActions = (product: AllProduct): TableAction[] => {
    const actions: TableAction[] = [
      {
        label: "View More",
        onClick: () => navigateToProduct(product.id, "variants"),
      },
    ];
    if (isSuperAdmin) {
      actions.push(
        {
          label: "Delete Product",
          onClick: () => {
            setProductToDelete(product);
          },
        },
        {
          label: "Delete Variant",
          onClick: () => navigateToProduct(product.id, "variants"),
        },
      );
    }
    return actions;
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete.id);
    }
  };

  const renderProductImage = (product: AllProduct) => {
    if (product.primary_image) {
      return (
        <div className="w-16 h-16 relative rounded-md overflow-hidden">
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <div className="w-16 h-16 bg-[#F0F0F0] flex items-center justify-center text-xs text-[#6F6E6C] rounded-md">
        No Image
      </div>
    );
  };

  const isEmpty = !products || products.length === 0;

  return (
    <>
      <DataTable
        headers={PRODUCT_TABLE_HEADERS}
        isEmpty={hideEmptyState ? false : isEmpty}
        emptyState={{
          title: "No product yet",
          description: "Upload your first product to get started!",
          buttonLabel: "Add new product",
          onAction: onAddProduct,
        }}
      >
        {paginatedProducts.map((product) => (
          <TableRow key={product.id} className="hover:bg-[#FAFAFA]">
            <TableCell className="text-[#6F6E6C]">{product.id}</TableCell>

            <TableCell>{renderProductImage(product)}</TableCell>

            <TableCell className="font-medium text-[#3B3B3B]">
              {product.name}
            </TableCell>

            <TableCell className="text-[#6F6E6C]">
              {product.category_name}
            </TableCell>

            <TableCell>
              <StatusBadge variant={product.is_featured ? "success" : "default"}>
                {product.is_featured ? "Yes" : "No"}
              </StatusBadge>
            </TableCell>

            <TableCell>
              <StatusBadge variant={product.in_stock ? "success" : "error"}>
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </StatusBadge>
            </TableCell>

            <TableCell className="text-[#6F6E6C]">
              {formatDate(product.created_at)}
            </TableCell>

            <TableCell>
              <TableActions actions={getProductActions(product)} />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      <DeleteConfirmationModal
        open={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete "${productToDelete?.name}"?`}
        description="This action cannot be undone. All variants associated with this product will also be deleted."
        productImage={productToDelete?.primary_image || undefined}
        productName={productToDelete?.name}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteProductMutation.isPending}
      />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProductTable;

