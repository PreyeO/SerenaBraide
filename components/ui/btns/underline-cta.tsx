import React, { ReactNode } from "react";
import Link from "next/link";

interface UnderlineLinkProps {
  href: string;
  text: string;
  className: string;
  children?: ReactNode;
}

const UnderlineLink: React.FC<UnderlineLinkProps> = ({
  href,
  text,
  className = "",
  children,
}) => {
  return (
    <Link href={href} className={`flex items-center gap-2  ${className}`}>
      <span className="underline">{text}</span>
      {children}
    </Link>
  );
};

export default UnderlineLink;
