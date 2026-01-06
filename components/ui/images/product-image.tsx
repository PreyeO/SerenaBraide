"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductImageProps {
  className?: string;
  height: number;
  width: number;
  alt: string;
  src: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  className = "",
  height,
  width,
  src,
  alt,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-[5px]" />
      )}
      {!hasError ? (
        <Image
          src={src}
          className={`${className} transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          alt={alt}
          width={width}
          height={height}
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
