"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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

type ProductImageProps = ProductImagePropsWithDimensions | ProductImagePropsWithFill;

const ProductImage: React.FC<ProductImageProps> = (props) => {
  const { className = "", src, alt } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isFillMode = 'fill' in props && props.fill === true;

  return (
    <div 
      className={`relative ${isFillMode ? 'w-full h-full' : ''} ${className}`} 
      style={!isFillMode ? { width: props.width, height: props.height } : undefined}
    >
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-[5px]" />
      )}
      {!hasError ? (
        <Image
          src={src}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${className}`}
          alt={alt}
          {...(isFillMode 
            ? { fill: true } 
            : { width: props.width, height: props.height }
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-[5px]">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
