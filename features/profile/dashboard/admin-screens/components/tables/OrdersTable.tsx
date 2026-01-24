"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Order } from "@/features/profile/type/customers/profile.type";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import TableEmpty from "../shared/empty-screens/TableEmpty";

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const router = useRouter();

  const handleViewMore = (orderNumber: number) => {
    router.push(`/admin/orders/${orderNumber}`);
  };

  const handleDelete = (orderNumber: number) => {
    // TODO: Implement delete functionality
    if (confirm(`Are you sure you want to delete order #${orderNumber}?`)) {
      console.log("Delete order:", orderNumber);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: "bg-orange-100", text: "text-orange-700", label: "Pending" },
      paid: { bg: "bg-blue-100", text: "text-blue-700", label: "Paid" },
      processing: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Processing" },
      shipped: { bg: "bg-purple-100", text: "text-purple-700", label: "Shipped" },
      in_transit: { bg: "bg-indigo-100", text: "text-indigo-700", label: "In Transit" },
      delivered: { bg: "bg-green-100", text: "text-green-700", label: "Delivered" },
    };

    const config = statusConfig[status.toLowerCase()] || {
      bg: "bg-gray-100",
      text: "text-gray-700",
      label: status,
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const calculateTotalQuantity = (order: Order): number => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Show empty state if no orders
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#F0F0F0] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
              <TableHead className="font-semibold text-[#3B3B3B]">
                Order Number
              </TableHead>
              <TableHead className="font-semibold text-[#3B3B3B]">
                Status
              </TableHead>
              <TableHead className="font-semibold text-[#3B3B3B]">
                Total Amount
              </TableHead>
              <TableHead className="font-semibold text-[#3B3B3B]">
                Total Quantity
              </TableHead>
              <TableHead className="font-semibold text-[#3B3B3B]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <TableEmpty
          title="No orders yet"
          description="Orders will appear here once customers make purchases."
          showButton={false}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
            <TableHead className="font-semibold text-[#3B3B3B]">
              Order Number
            </TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">Status</TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">
              Total Amount
            </TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">
              Total Quantity
            </TableHead>
            <TableHead className="font-semibold text-[#3B3B3B]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order: Order) => (
            <TableRow key={order.order_number} className="hover:bg-[#FAFAFA]">
              <TableCell className="font-medium text-[#3B3B3B]">
                #{order.order_number}
              </TableCell>

              <TableCell>{getStatusBadge(order.status)}</TableCell>

              <TableCell className="font-medium text-[#3B3B3B]">
                ₦{order.total_amount}
              </TableCell>

              <TableCell className="text-[#6F6E6C]">
                {calculateTotalQuantity(order)}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-[#F0F0F0]"
                    >
                      <MoreVertical className="h-4 w-4 text-[#3B3B3B]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleViewMore(order.order_number)}
                      className="cursor-pointer"
                    >
                      View More
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(order.order_number)}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;

