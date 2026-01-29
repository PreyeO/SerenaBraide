import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";
import TableEmpty from "../shared/empty-screens/TableEmpty";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
  isEmpty?: boolean;
  emptyState?: {
    title: string;
    description: string;
    buttonLabel?: string;
    onAction?: () => void;
    showButton?: boolean;
  };
  className?: string;
}

export function DataTable({
  headers,
  children,
  isEmpty = false,
  emptyState,
  className = "bg-white rounded-lg border border-[#F0F0F0] overflow-hidden",
}: DataTableProps) {
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
            {headers.map((header, index) => (
              <TableHead key={index} className="font-semibold text-[#3B3B3B]">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {!isEmpty && <TableBody>{children}</TableBody>}
      </Table>
      {isEmpty && emptyState && (
        <TableEmpty
          title={emptyState.title}
          description={emptyState.description}
          buttonLabel={emptyState.buttonLabel}
          onAction={emptyState.onAction}
          showButton={emptyState.showButton}
        />
      )}
    </div>
  );
}
