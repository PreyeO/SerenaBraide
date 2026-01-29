import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, MoreHorizontal } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface TableAction {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: "default" | "destructive";
  className?: string;
}

interface TableActionsProps {
  actions: TableAction[];
  iconType?: "vertical" | "horizontal";
  label?: string;
}

export function TableActions({
  actions,
  iconType = "vertical",
}: TableActionsProps) {
  const Icon = iconType === "vertical" ? MoreVertical : MoreHorizontal;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-[#F0F0F0]"
        >
          <Icon className="h-4 w-4 text-[#3B3B3B]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          const isDestructive = action.variant === "destructive";

          return (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              className={`cursor-pointer ${
                isDestructive
                  ? "text-red-600 focus:text-red-600 focus:bg-red-50"
                  : ""
              } ${action.className || ""}`}
            >
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
