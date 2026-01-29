"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Customer } from "@/features/dashboard/admin/types/customer";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface CustomerTableProps {
    data: Customer[];
}

export function CustomerTable({ data }: CustomerTableProps) {
    const router = useRouter();

    const handleRowClick = (customer: Customer) => {
        router.push(`/admin/customers/${customer.id}`);
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border">
            <Table>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox />
                        </TableHead>
                        <TableHead>Customer name</TableHead>
                        <TableHead>Email subscription</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Amount spent</TableHead>
                        <TableHead>Contact information</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((customer) => (
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
                            <TableCell>
                                {customer.email_validated ? (
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-100 text-green-700 hover:bg-green-100 border-none"
                                    >
                                        • Subscribed
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant="secondary"
                                        className="bg-gray-100 text-gray-500 hover:bg-gray-100 border-none"
                                    >
                                        • Unsubscribed
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                {customer.city ? `${customer.city}, ` : ""}
                                {customer.country || "Nigeria"}
                            </TableCell>
                            <TableCell>0 orders</TableCell> {/* Mocked as not in API */}
                            <TableCell>$0</TableCell> {/* Mocked as not in API */}
                            <TableCell>{customer.email}</TableCell>
                            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
