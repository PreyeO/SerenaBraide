"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/features/profile/type/admin/general.type";
import { useTableNavigation } from "@/features/profile/hooks/admin/useTableNavigation";
import { TableAction, TableActions } from "../shared/TableActions";
import {
  formatDate,
  isBirthdayToday,
  sendBirthdayWish,
  sendEmail,
} from "../../../utils/array.utils";
import TablePagination from "../shared/TablePagination";

const ITEMS_PER_PAGE = 10;

interface CustomerTableProps {
  data: Customer[];
}

export function CustomerTable({ data }: CustomerTableProps) {
  const { navigateToCustomer } = useTableNavigation();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleRowClick = (customer: Customer) => {
    navigateToCustomer(customer.customer_profile.id);
  };

  const getCustomerActions = (customer: Customer): TableAction[] => {
    const isBirthday = isBirthdayToday(customer.date_of_birth);

    const actions: TableAction[] = [
      {
        label: "Send Email",
        icon: Mail,
        onClick: () => sendEmail(customer.email),
      },
    ];

    if (isBirthday) {
      actions.push({
        label: "Send Birthday Wish",
        icon: Gift,
        onClick: () => sendBirthdayWish(customer.email, customer.first_name),
        className: "text-pink-600 focus:text-pink-600",
      });
    }

    actions.push({
      label: "View Details",
      onClick: () => handleRowClick(customer),
    });

    return actions;
  };

  const getLocationDisplay = (customer: Customer): string => {
    const city = customer.city ? `${customer.city}, ` : "";
    const country = customer.country || "Nigeria";
    return `${city}${country}`;
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm border">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-12.5">
                <Checkbox />
              </TableHead>
              <TableHead className="min-w-45">Customer name</TableHead>
              <TableHead className="min-w-50">Email</TableHead>
              <TableHead className="min-w-37.5">Location</TableHead>
              <TableHead className="min-w-30">Date Joined</TableHead>
              <TableHead className="min-w-45">Birthday</TableHead>
              <TableHead className="w-20">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((customer) => {
              const isBirthday = isBirthdayToday(customer.date_of_birth);

              return (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(customer)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox />
                  </TableCell>

                  <TableCell className="font-medium">
                    {customer.first_name} {customer.last_name}
                  </TableCell>

                  <TableCell>{customer.email}</TableCell>

                  <TableCell>{getLocationDisplay(customer)}</TableCell>

                  <TableCell>{formatDate(customer.date_joined)}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      {customer.date_of_birth ? (
                        <span>{customer.date_of_birth}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                      {isBirthday && (
                        <Badge className="bg-pink-100 text-pink-600 hover:bg-pink-100 border-none px-2 py-0.5 gap-1">
                          <Gift className="h-3 w-3" />
                          Today
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <TableActions
                      actions={getCustomerActions(customer)}
                      iconType="horizontal"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
