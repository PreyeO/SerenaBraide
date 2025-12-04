import React from "react";
import Paragraph from "@/components/ui/typography/paragraph";
import { Plus } from "lucide-react";

interface AddAddressButtonProps {
  onClick: () => void;
}

const AddAddressButton: React.FC<AddAddressButtonProps> = ({ onClick }) => (
  <div className="flex space-x-[10px] pt-4 cursor-pointer" onClick={onClick}>
    <span className="rounded-full w-[22px] h-[22px] bg-[#3B3B3B] flex justify-center items-center">
      <Plus className="text-white size-5" strokeWidth={2} />
    </span>
    <Paragraph
      className="text-[#3B3B3B] underline cursor-pointer font-medium text-center text-sm"
      content="Add a new shipping address"
    />
  </div>
);

export default AddAddressButton;
