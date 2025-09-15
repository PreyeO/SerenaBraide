import { Product } from "@/types/product";
import ProductImage from "../images/product-image";
import Caption from "../typography/caption";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Generate star rating (handles full/half/empty stars)
  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) {
        return <Star key={i} size={13} fill="#D1D5DB" stroke="#D1D5DB" />; // full star
      } else if (rating >= starValue - 0.5) {
        return (
          <Star
            key={i}
            size={13}
            fill="url(#half)"
            stroke="#D1D5DB"
            className="#D1D5DB"
          />
        );
      } else {
        return <Star key={i} size={13} className="text-[#D1D5DB]" />; // empty star
      }
    });
  };

  return (
    <div className="rounded-[15px] py-5 px-5 flex flex-col text-[#D1D5DB]">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-[15px] ">
        <ProductImage
          src={product.src}
          alt={product.name}
          width={310}
          height={500}
          className="object-contain "
        />

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span className="rounded-[40px] text-[10px] h-6 px-3 bg-white text-[#3B3B3B] flex items-center justify-center">
            <Caption title={product.type} className="font-normal" />
          </span>
        </div>

        {/* Price Badge */}
        <span className="absolute top-2 right-2 text-sm text-white">
          <Caption title={product.price} className="font-medium" />
        </span>

        <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1 pt-1">
          {/* Name */}
          <Caption
            title={product.name}
            className="font-medium text-sm text-white"
          />

          {/* Sizes */}
          <div className="flex justify-between items-center">
            {product.sizes && (
              <Caption
                title={`Available in: ${product.sizes.join(", ")}`}
                className="text-[12px] font-normal text-[#D1D5DB]"
              />
            )}
            <div className="rounded-full bg-white/30 backdrop-blur-[40px] w-5 h-5 flex items-center justify-center">
              <Heart className=" size-[15px] text-black" />
            </div>
          </div>

          {/* Reviews + Sold */}
          <div className="flex items-center gap-[6px]">
            <div className="flex items-center gap-[3px] text-[12px] font-normal text-[#D1D5DB]">
              {renderStars(product.rating)}
              <Caption title={product.rating?.toString() ?? "0"} className="" />
            </div>
            <div className="border-[0.8px] h-[10px] border-[#D1D5DB]/30" />
            {product.sold && (
              <Caption title={`${product.sold} sold`} className="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
