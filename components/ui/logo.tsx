import React from "react";
import Image from "next/image";

interface LogoProps {
  height: number;
  width: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width, className, height }) => {
  return (
    <Image
      alt="logo image"
      src="/logo.svg"
      width={width}
      height={height}
      className={`${className}`}
    />
  );
};

export default Logo;
