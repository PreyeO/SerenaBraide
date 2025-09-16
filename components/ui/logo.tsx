import React from "react";
import ProductImage from "./images/product-image";

interface LogoProps {
  height: number;
  width: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width, className, height }) => {
  return (
    <ProductImage
      alt="logo image"
      src="/logo.svg"
      width={width}
      height={height}
      className={`${className}`}
    />
  );
};

export default Logo;
