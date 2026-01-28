import React from "react";
import LegalParagraph from "./LegalParagraph";

interface LegalHeaderProps {
  title: string;
  effectiveDate?: string;
  children: React.ReactNode;
}

const LegalHeader = ({ title, effectiveDate, children }: LegalHeaderProps) => {
  return (
    <div className="gap-1.25 flex flex-col md:max-w-208 max-w-81.75 text-[#3B3B3B] font-normal">
      <h2 className="lg:text-[26px] text-[22px] font-normal">{title}</h2>

      {effectiveDate && (
        <LegalParagraph>Effective Date: {effectiveDate}</LegalParagraph>
      )}

      {children}
    </div>
  );
};

export default LegalHeader;
