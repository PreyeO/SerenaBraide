import React from "react";

interface AuthTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

const AuthTitle = ({ title, subtitle, className }: AuthTitleProps) => {
  return (
    <div
      className={`flex flex-col gap-4  mx-auto justify-center text-center  ${className}`}
    >
      <h1 className="text-[48px] leading-[48px] font-medium  text-[#3B3B3B]">
        {title}
      </h1>
      <p className="text-[#9A9A98] text-sm font-normal leading-[22px]">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthTitle;
