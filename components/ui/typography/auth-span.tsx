import React from "react";

interface AuthSpanProps {
  children: React.ReactNode;
  className?: string;
}

const AuthSpan = ({ children, className }: AuthSpanProps) => {
  return <p className={`{${className} text-[#3B3B3B]`}>{children}</p>;
};

export default AuthSpan;
