"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ShippingArea } from "@/features/profile/type/admin/general.type";
import { TableAction, TableActions } from "../shared/TableActions";
import { DataTable } from "../shared/DataTable";
import { useDeleteShippingArea } from "@/features/profile/hooks/admin/useDeleteShippingArea";
import DeleteConfirmationModal from "@/components/ui/modals/delete-confirmation-modal";
import { useIsSuperAdmin } from "@/hooks/useIsSuperAdmin";
import TablePagination from "../shared/TablePagination";
import FormModal from "@/components/ui/modals/form-modals";
import ShippingForm from "../forms/ShippingForm";
import { formatNaira } from "../../../utils/currency.utils";

const ITEMS_PER_PAGE = 10;

interface ShippingTableProps {
    shippingAreas: ShippingArea[];
    onAddArea?: () => void;
}

const SHIPPING_TABLE_HEADERS_BASE = ["Area Name", "Shipping Fee"];

const ShippingTable = ({ shippingAreas, onAddArea }: ShippingTableProps) => {
    const isSuperAdmin = useIsSuperAdmin();
    const [areaToDelete, setAreaToDelete] = useState<ShippingArea | null>(null);
    const [areaToEdit, setAreaToEdit] = useState<ShippingArea | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil((shippingAreas?.length || 0) / ITEMS_PER_PAGE);
    const paginatedAreas = shippingAreas.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const deleteShippingAreaMutation = useDeleteShippingArea({
        onSuccess: () => {
            setAreaToDelete(null);
        },
    });

    const getShippingActions = (area: ShippingArea): TableAction[] => {
        const actions: TableAction[] = [
            {
                label: "Edit",
                onClick: () => {
                    setAreaToEdit(area);
                },
            },
        ];
        if (isSuperAdmin) {
            actions.push({
                label: "Delete",
                onClick: () => {
                    setAreaToDelete(area);
                },
            });
        }
        return actions;
    };

    const handleConfirmDelete = () => {
        if (areaToDelete) {
            deleteShippingAreaMutation.mutate(areaToDelete.id);
        }
    };

    const headers = [...SHIPPING_TABLE_HEADERS_BASE, "Action"];
    const isEmpty = !shippingAreas || shippingAreas.length === 0;

    return (
        <>
            <DataTable
                headers={headers}
                isEmpty={isEmpty}
                emptyState={{
                    title: "No shipping areas yet",
                    description: "Add shipping areas to define delivery zones and fees.",
                    buttonLabel: "Add New Area",
                    onAction: onAddArea,
                    showButton: !!onAddArea,
                }}
            >
                {paginatedAreas.map((area) => (
                    <TableRow key={area.id} className="hover:bg-[#FAFAFA]">
                        <TableCell className="font-medium text-[#3B3B3B]">
                            {area.name}
                        </TableCell>

                        <TableCell className="text-[#6F6E6C]">
                            {formatNaira(area.fee)}
                        </TableCell>

                        <TableCell>
                            <TableActions actions={getShippingActions(area)} />
                        </TableCell>
                    </TableRow>
                ))}
            </DataTable>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Edit Modal */}
            <FormModal
                open={!!areaToEdit}
                onClose={() => setAreaToEdit(null)}
                title="Edit Shipping Area"
            >
                <ShippingForm
                    initialData={areaToEdit}
                    onSuccess={() => setAreaToEdit(null)}
                />
            </FormModal>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                open={!!areaToDelete}
                onClose={() => setAreaToDelete(null)}
                onConfirm={handleConfirmDelete}
                title={`Are you sure you want to delete "${areaToDelete?.name}"?`}
                description="This action cannot be undone. The shipping area will be permanently removed."
                productName={areaToDelete?.name}
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={deleteShippingAreaMutation.isPending}
            />
        </>
    );
};

export default ShippingTable;
