"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ProductImagePropsBase {
  className?: string;
  alt: string;
  src: string;
}

interface ProductImagePropsWithDimensions extends ProductImagePropsBase {
  height: number;
  width: number;
  fill?: never;
}

interface ProductImagePropsWithFill extends ProductImagePropsBase {
  fill: true;
  height?: never;
  width?: never;
}

type ProductImageProps =
  | ProductImagePropsWithDimensions
  | ProductImagePropsWithFill;

const ProductImage: React.FC<ProductImageProps> = (props) => {
  const { className = "", src, alt } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isFillMode = "fill" in props && props.fill === true;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  return (
    <div
      className={`relative bg-[#F2F2F2] overflow-hidden ${
        isFillMode ? "w-full h-full" : ""
      } ${className}`}
      style={
        !isFillMode ? { width: props.width, height: props.height } : undefined
      }
    >
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          {...(isFillMode
            ? { fill: true }
            : { width: props.width, height: props.height })}
          unoptimized={src.includes("assistfactory.s3.amazonaws.com")}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
          No Image
        </div>
      )}
    </div>
  );
};

export default ProductImage;
