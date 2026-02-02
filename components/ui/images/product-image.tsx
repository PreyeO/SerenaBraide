"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

interface ProductImagePropsBase {
  alt: string;
  src: string;
  className?: string; // wrapper
  imageClassName?: string;
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
  const { className = "", imageClassName = "", src, alt } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const prevSrcRef = useRef<string>(src);

  const isFillMode = "fill" in props && props.fill === true;

  useEffect(() => {
    // Only reset loading state if src actually changed
    if (prevSrcRef.current !== src) {
      setIsLoading(true);
      setHasError(false);
      prevSrcRef.current = src;
    }
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
          {...(isFillMode
            ? { fill: true }
            : { width: props.width, height: props.height })}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${imageClassName}`}
          unoptimized={src.includes("assistfactory.s3.amazonaws.com")}
          priority={false}
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
