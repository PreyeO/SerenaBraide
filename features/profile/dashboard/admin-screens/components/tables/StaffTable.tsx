"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Staff } from "@/features/profile/type/admin/general.type";
import { TableAction, TableActions } from "../shared/TableActions";
import { DataTable } from "../shared/DataTable";
import { useDeleteStaff } from "@/features/profile/hooks/admin/useDeleteStaff";
import DeleteConfirmationModal from "@/components/ui/modals/delete-confirmation-modal";
import { useIsSuperAdmin } from "@/hooks/useIsSuperAdmin";
import TablePagination from "../shared/TablePagination";

const ITEMS_PER_PAGE = 10;

interface StaffTableProps {
  staff: Staff[];
  onInviteStaff?: () => void;
}

const STAFF_TABLE_HEADERS_BASE = ["Staff name", "Email", "Phone Number"];

const StaffTable = ({ staff, onInviteStaff }: StaffTableProps) => {
  const isSuperAdmin = useIsSuperAdmin();
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((staff?.length || 0) / ITEMS_PER_PAGE);
  const paginatedStaff = staff.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const deleteStaffMutation = useDeleteStaff({
    onSuccess: () => {
      setStaffToDelete(null);
    },
  });

  const getStaffActions = (staffMember: Staff): TableAction[] => {
    const actions: TableAction[] = [];
    if (isSuperAdmin) {
      actions.push({
        label: "Delete Staff",
        onClick: () => {
          setStaffToDelete(staffMember);
        },
      });
    }
    return actions;
  };

  const getStaffName = (staffMember: Staff): string => {
    return `${staffMember.first_name} ${staffMember.last_name}`;
  };

  const handleConfirmDelete = () => {
    if (staffToDelete?.admin_profile?.id) {
      deleteStaffMutation.mutate(staffToDelete.admin_profile.id);
    }
  };

  const isEmpty = !staff || staff.length === 0;

  const headers = isSuperAdmin
    ? [...STAFF_TABLE_HEADERS_BASE, "Action"]
    : STAFF_TABLE_HEADERS_BASE;

  return (
    <>
      <DataTable
        headers={headers}
        isEmpty={isEmpty}
        emptyState={{
          title: "No staff yet",
          description: "Invite staff members to get started.",
          buttonLabel: "Invite Staff",
          onAction: onInviteStaff,
          showButton: !!onInviteStaff,
        }}
      >
        {paginatedStaff.map((staffMember) => (
          <TableRow key={staffMember.id} className="hover:bg-[#FAFAFA]">
            <TableCell className="font-medium text-[#3B3B3B]">
              {getStaffName(staffMember)}
            </TableCell>

            <TableCell className="text-[#6F6E6C]">
              {staffMember.email}
            </TableCell>

            <TableCell className="text-[#6F6E6C]">
              {staffMember.phone_number || "—"}
            </TableCell>

            {isSuperAdmin && (
              <TableCell>
                <TableActions actions={getStaffActions(staffMember)} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </DataTable>

      <DeleteConfirmationModal
        open={!!staffToDelete}
        onClose={() => setStaffToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete ${staffToDelete ? `${staffToDelete.first_name} ${staffToDelete.last_name}` : "this staff member"}?`}
        description="This action cannot be undone. The staff member will lose access to the admin panel."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteStaffMutation.isPending}
      />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default StaffTable;

