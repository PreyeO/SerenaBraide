import SubHeading from "@/components/ui/typography/subHeading";
import React from "react";

interface LegalTypographyProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const LegalTypography: React.FC<LegalTypographyProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className="gap-4 flex flex-col font-normal  max-w-81.75 text-sm md:max-w-201.25 leading-5.5 text-[#6F6E6C]">
      <SubHeading
        className="text-base font-medium text-[#3B3B3B]"
        title={title}
      />
      <div className={`${className}`}>{children}</div>
    </div>
  );
};

export default LegalTypography;
