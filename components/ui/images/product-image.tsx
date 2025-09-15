import Image from "next/image";
import React from "react";

interface ProductImageProps {
  className: string;
  height: number;
  width: number;
  alt: string;
  src: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  className,
  height,
  width,
  src,
  alt,
}) => {
  return (
    <Image
      src={src}
      className={`${className}`}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default ProductImage;
