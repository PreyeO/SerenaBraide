"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Staff } from "@/features/profile/type/admin/general.type";
import { TableAction, TableActions } from "../shared/TableActions";
import { DataTable } from "../shared/DataTable";

interface StaffTableProps {
  staff: Staff[];
  onInviteStaff?: () => void;
}

const STAFF_TABLE_HEADERS = ["Staff name", "Email", "Phone Number", "Action"];

const StaffTable = ({ staff, onInviteStaff }: StaffTableProps) => {
  const getStaffActions = (staffMember: Staff): TableAction[] => [
    {
      label: "Delete Staff",
      onClick: () => {
        // TODO: Implement delete staff functionality when API is ready
        console.log("Delete staff:", staffMember.id);
      },
    },
  ];

  const getStaffName = (staffMember: Staff): string => {
    return `${staffMember.first_name} ${staffMember.last_name}`;
  };

  const isEmpty = !staff || staff.length === 0;

  return (
    <DataTable
      headers={STAFF_TABLE_HEADERS}
      isEmpty={isEmpty}
      emptyState={{
        title: "No staff yet",
        description: "Invite staff members to get started.",
        buttonLabel: "Invite Staff",
        onAction: onInviteStaff,
        showButton: !!onInviteStaff,
      }}
    >
      {staff.map((staffMember) => (
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

          <TableCell>
            <TableActions actions={getStaffActions(staffMember)} />
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  );
};

export default StaffTable;

