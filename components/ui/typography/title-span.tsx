import React, { ReactNode } from "react";

interface TitleSpanProps {
  className?: string;
  title: string;
  span: string;
  children?: ReactNode; // 👈 allow extra content after the span
}

const TitleSpan: React.FC<TitleSpanProps> = ({
  title,
  className = "",
  span,
  children,
}) => {
  return (
    <p className={`${className} font-GeneralSans`}>
      {title}
      <span className="font-PPEditorialNew italic"> {span} </span>
      {children && <>{children}</>}
    </p>
  );
};

export default TitleSpan;
