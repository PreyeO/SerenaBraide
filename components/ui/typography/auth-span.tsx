import React from "react";

interface AuthSpanProps {
  children: React.ReactNode;
  className?: string;
}

const AuthSpan = ({ children, className }: AuthSpanProps) => {
  return <p className={`{${className} `}>{children}</p>;
};

export default AuthSpan;
