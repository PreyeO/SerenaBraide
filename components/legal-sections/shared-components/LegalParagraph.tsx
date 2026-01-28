import React from "react";
import clsx from "clsx";

type LegalParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

const LegalParagraph = ({ children, className }: LegalParagraphProps) => {
  return (
    <p className={clsx("text-sm leading-5.5 text-[#6F6E6C]", className)}>
      {children}
    </p>
  );
};

export default LegalParagraph;
