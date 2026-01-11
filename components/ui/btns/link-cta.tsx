import React from "react";
import { Button } from "../button";

interface ButtonProps {
  className: string;
  label: string;
  disabled?: boolean;
}
const LinkCta: React.FC<ButtonProps> = ({ className, label, disabled }) => {
  return (
    <Button
      disabled={disabled}
      className={`${className}  py-6 rounded-full text-sm mx-auto flex justify-center cursor-pointer`}
    >
      {label}
    </Button>
  );
};

export default LinkCta;
