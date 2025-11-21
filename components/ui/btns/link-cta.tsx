import React from "react";
import { Button } from "../button";

interface ButtonProps {
  className: string;
  label: string;
}
const LinkCta: React.FC<ButtonProps> = ({ className, label }) => {
  return (
    <Button
      className={`${className}  py-6 rounded-full text-sm mx-auto flex justify-center cursor-pointer`}
    >
      {label}
    </Button>
  );
};

export default LinkCta;
