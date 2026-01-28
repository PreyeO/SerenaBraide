import React from "react";
import clsx from "clsx";

interface LegalHeaderProps {
  title: string;
  effectiveDate?: string;
  children: React.ReactNode;
  className?: string;
}

const LegalHeader = ({
  title,
  effectiveDate,
  children,
  className,
}: LegalHeaderProps) => {
  return (
    <div className="gap-1.25 flex flex-col md:max-w-208 max-w-81.75  font-normal">
      <h2 className="lg:text-[26px] text-[22px] font-normal">{title}</h2>

      {effectiveDate && (
        <p className={clsx("text-sm leading-5.5 text-[#3B3B3B]", className)}>
          Effective Date: {effectiveDate}
        </p>
      )}

      {children}
    </div>
  );
};

export default LegalHeader;
