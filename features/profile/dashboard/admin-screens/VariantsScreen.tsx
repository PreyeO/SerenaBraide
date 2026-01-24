"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetVariants } from "@/features/profile/hooks/admin/useGetVariants";
import { ProductVariant } from "@/features/profile/type/admin/product.type";
import BackNavigation from "@/components/ui/btns/back-navigation";
import SubHeading from "@/components/ui/typography/subHeading";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";

interface VariantsScreenProps {
  productId: number;
}

const VariantsScreen = ({ productId }: VariantsScreenProps) => {
  const router = useRouter();
  const { data: variantsData, isLoading } = useGetVariants(productId);

  return (
    <section className="py-7.5">
      <BackNavigation
        href="/admin/products"
        text="Back to Products"
        className="mb-6"
      />

      <SubHeading
        title={
          variantsData?.results && variantsData.results.length > 0
            ? `Variants for ${variantsData.results[0].product_name}`
            : "Product Variants"
        }
        className="text-sm text-[#3B3B3B] font-semibold pb-6"
      />

      {isLoading ? (
        <DashboardLoader />
      ) : !variantsData?.results || variantsData.results.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-[#6F6E6C] mb-4">
            No variants found for this product.
          </p>
          <button
            onClick={() => router.push("/admin/products")}
            className="text-[#3B3B3B] hover:underline"
          >
            Return to Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {variantsData.results.map((variant: ProductVariant) => (
            <div
              key={variant.id}
              className="bg-white rounded-lg border border-[#F0F0F0] p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex gap-6">
                {/* Variant Image */}
                <div className="shrink-0">
                  {variant.images && variant.images.length > 0 ? (
                    <div className="w-32 h-32 relative rounded-md overflow-hidden">
                      <Image
                        src={
                          variant.images.find((img) => img.is_primary)
                            ?.image_url || variant.images[0].image_url
                        }
                        alt={variant.sku}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-[#F0F0F0] flex items-center justify-center text-xs text-[#6F6E6C] rounded-md">
                      No Image
                    </div>
                  )}
                </div>

                {/* Variant Details */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-2 font-medium">
                      SKU
                    </p>
                    <p className="font-semibold text-[#3B3B3B] text-base">
                      {variant.sku}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-2 font-medium">
                      Size
                    </p>
                    <p className="font-semibold text-[#3B3B3B] text-base">
                      {variant.size}
                    </p>
                  </div>

                  {variant.color && (
                    <div>
                      <p className="text-xs text-[#6F6E6C] mb-2 font-medium">
                        Color
                      </p>
                      <p className="font-semibold text-[#3B3B3B] text-base">
                        {variant.color}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-2 font-medium">
                      Price
                    </p>
                    <p className="font-semibold text-[#3B3B3B] text-base">
                      ₦{variant.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-2 font-medium">
                      Stock Quantity
                    </p>
                    <p className="font-semibold text-[#3B3B3B] text-base">
                      {variant.stock_quantity}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-2 font-medium">
                      Status
                    </p>
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                        variant.is_in_stock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {variant.is_in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-2 font-medium">
                      Active
                    </p>
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                        variant.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {variant.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Variant Images */}
              {variant.images && variant.images.length > 1 && (
                <div className="mt-6 pt-6 border-t border-[#F0F0F0]">
                  <p className="text-sm text-[#6F6E6C] mb-3 font-medium">
                    Additional Images
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {variant.images.map((img) => (
                      <div
                        key={img.id}
                        className="w-20 h-20 relative rounded-md overflow-hidden border border-[#F0F0F0]"
                      >
                        <Image
                          src={img.image_url}
                          alt={img.alt_text}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VariantsScreen;
