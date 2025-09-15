import React from "react";
import { Button } from "../button";

interface ButtonProps {
  className: string;
  label: string;
}
const LinkCta: React.FC<ButtonProps> = ({ className, label }) => {
  return (
    <Button
      className={`${className} bg-[#3B3B3B] py-6 rounded-full text-sm text-white mx-auto flex justify-center cursor-pointer hover:bg-black transition`}
    >
      {label}
    </Button>
  );
};

export default LinkCta;
