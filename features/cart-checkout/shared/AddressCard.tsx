"use client";

import React from "react";
import SubHeading from "@/components/ui/typography/subHeading";
import Paragraph from "@/components/ui/typography/paragraph";
import { Address } from "../type/checkout.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useAuthStore } from "@/features/auth/auth.store";

interface AddressCardProps {
  address: Address;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: number) => void;
  showActions?: boolean;
  variant?: "overview" | "shipping";
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  showActions = true,
  variant = "shipping",
}) => {
  const user = useAuthStore((state) => state.user);
  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "User";
  const phoneNumber = user?.phone_number || "";

  const addressLabel = address.is_default ? "Home" : "Address";
  const fullAddress = `${address.address}, ${address.city}, ${address.state} ${address.zip_code}, ${address.country}`;

  if (variant === "overview") {
    return (
      <div className="font-normal text-base max-w-84 flex flex-col gap-1.5">
        <SubHeading
          title={addressLabel}
          className="font-semibold text-[#3B3B3B] text-lg"
        />
        <p>{fullName}</p>
        <p>{address.address}</p>
        <p>
          {address.city}, {address.state} {address.zip_code}, {address.country}
        </p>
        {phoneNumber && (
          <p>
            <span className="font-medium">Phone</span>: {phoneNumber}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-between items-start pb-4 border-b border-[#F5F5F5] last:border-0">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <SubHeading
            title={addressLabel}
            className="text-sm text-[#3B3B3B] font-medium"
          />
        </div>
        <div className="flex flex-col gap-1.5 text-[#6F6E6C] font-normal text-sm">
          <p>{fullName}</p>
          <Paragraph
            className="text-[#6F6E6C] font-normal text-sm leading-5.5"
            content={fullAddress}
          />
          {phoneNumber && (
            <p>
              <span className="font-medium">Phone</span>: {phoneNumber}
            </p>
          )}
        </div>
      </div>
      {showActions && (onEdit || onDelete) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-[#3B3B3B] hover:text-[#6F6E6C] transition-colors">
              <MoreVertical className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(address)}>
                Edit
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(address.id)}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default AddressCard;

