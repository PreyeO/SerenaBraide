"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTableNavigation } from "@/features/profile/hooks/admin/useTableNavigation";
import { Order } from "@/features/profile/type/customers/profile.type";
import { TableAction, TableActions } from "../shared/TableActions";
import { DataTable } from "../shared/DataTable";
import {
  calculateOrderTotalQuantity,
  formatOrderNumber,
  getOrderStatusLabel,
} from "../../../utils/order.utils";
import { StatusBadge } from "../shared/StatusBadge";
import { formatNaira } from "../../../utils/currency.utils";
import TablePagination from "../shared/TablePagination";

const ITEMS_PER_PAGE = 10;

interface OrdersTableProps {
  orders: Order[];
}

const ORDER_TABLE_HEADERS = [
  "Order Number",
  "Status",
  "Total Amount",
  "Total Quantity",
  "Actions",
];

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const { navigateToOrder } = useTableNavigation();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((orders?.length || 0) / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getOrderActions = (order: Order): TableAction[] => [
    {
      label: "View More",
      onClick: () => navigateToOrder(order.order_number),
    },
  ];

  const isEmpty = !orders || orders.length === 0;

  return (
    <>
      <DataTable
        headers={ORDER_TABLE_HEADERS}
        isEmpty={isEmpty}
        emptyState={{
          title: "No orders yet",
          description: "Orders will appear here once customers make purchases.",
          showButton: false,
        }}
      >
        {paginatedOrders.map((order) => (
          <TableRow key={order.order_number} className="hover:bg-[#FAFAFA]">
            <TableCell className="font-medium text-[#3B3B3B]">
              {formatOrderNumber(order.order_number)}
            </TableCell>

            <TableCell>
              <StatusBadge variant={order.status}>
                {getOrderStatusLabel(order.status)}
              </StatusBadge>
            </TableCell>

            <TableCell className="font-medium text-[#3B3B3B]">
              {formatNaira(order.total_amount)}
            </TableCell>

            <TableCell className="text-[#6F6E6C]">
              {calculateOrderTotalQuantity(order)}
            </TableCell>

            <TableCell>
              <TableActions actions={getOrderActions(order)} />
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

export default OrdersTable;

