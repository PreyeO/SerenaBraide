import React from "react";
import { Button } from "../button";

interface ButtonProps {
  className: string;
}
const SubmitCta: React.FC<ButtonProps> = ({ className }) => {
  return (
    <Button
      className={`${className} bg-[#3B3B3B] py-3 rounded-full w-[160px] text-sm text-white mx-auto flex justify-center cursor-pointer hover:bg-black transition`}
    >
      Buy A Gift Card
    </Button>
  );
};

export default SubmitCta;
