import React from "react";

interface BorderlineProps {
  className: string;
}

const BorderLine: React.FC<BorderlineProps> = ({ className }) => {
  return <div className={`${className} border border-[#F0F0F0] `}></div>;
};

export default BorderLine;
