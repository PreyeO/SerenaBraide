"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Review } from "@/features/profile/type/admin/general.type";
import { TableAction, TableActions } from "../shared/TableActions";
import { DataTable } from "../shared/DataTable";
import TablePagination from "../shared/TablePagination";

const ITEMS_PER_PAGE = 10;

interface ReviewTableProps {
  reviews: Review[];
  onViewReview: (review: Review) => void;
}

const REVIEW_TABLE_HEADERS = ["Customer name", "Product", "Review", "Action"];

const ReviewTable = ({ reviews, onViewReview }: ReviewTableProps) => {
  // const { data: customersData } = useGetCustomers();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((reviews?.length || 0) / ITEMS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getReviewActions = (review: Review): TableAction[] => [
    {
      label: "View Review",
      onClick: () => onViewReview(review),
    },
  ];

  const truncateReview = (
    reviewText: string,
    maxLength: number = 50,
  ): string => {
    if (reviewText.length <= maxLength) return reviewText;
    return reviewText.substring(0, maxLength) + "...";
  };

  const isEmpty = !reviews || reviews.length === 0;

  return (
    <>
      <DataTable
        headers={REVIEW_TABLE_HEADERS}
        isEmpty={isEmpty}
        emptyState={{
          title: "No reviews yet",
          description:
            "Customer reviews will appear here once they are submitted.",
          showButton: false,
        }}
      >
        {paginatedReviews.map((review) => (
          <TableRow key={review.id} className="hover:bg-[#FAFAFA]">
            <TableCell className="font-medium text-[#3B3B3B]">
              {review.reviewer_name || review.customer_profile.name}
            </TableCell>

            <TableCell className="text-[#3B3B3B]">
              {review.order_item.variant.product_name}
            </TableCell>

            <TableCell className="text-[#6F6E6C] max-w-md">
              {review.review ? truncateReview(review.review) : "-"}
            </TableCell>

            <TableCell>
              <TableActions actions={getReviewActions(review)} />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ReviewTable;
