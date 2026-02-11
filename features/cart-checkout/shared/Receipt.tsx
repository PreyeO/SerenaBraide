"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import LinkCta from "@/components/ui/btns/link-cta";
import Link from "next/link";
import { useAuthStore } from "@/features/auth/auth.store";
import { useCreateOrder } from "../hooks/useCreateOrder";
import Caption from "@/components/ui/typography/caption";
import AuthSpan from "@/components/ui/typography/auth-span";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { formatCurrency } from "@/lib/utils";

interface ReceiptProps {
  totalItems?: number;
  totalPrice?: number;
  subtotal?: number;
  shippingCost?: number;
  tax?: number;
  showButton?: boolean;
  showMobilePayButton?: boolean;
  onMobilePayClick?: () => void;
  onValidate?: () => boolean;
  shippingAreaId?: string;
}

const Receipt = ({
  totalItems = 0,
  totalPrice = 0,
  subtotal,
  shippingCost,
  tax,
  showButton = true,
  showMobilePayButton = false,
  onMobilePayClick,
  onValidate,
  shippingAreaId,
}: ReceiptProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const createOrderMutation = useCreateOrder({ redirectToCheckout: true });

  const handleProceedToCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Run validation if provided
    if (onValidate && !onValidate()) {
      return;
    }

    const returnUrl = `/cart${shippingAreaId ? `?shippingAreaId=${shippingAreaId}` : ""}`;

    // Check if user is authenticated
    if (!user) {
      // Redirect to register with return URL to cart (they'll click checkout again after login)
      router.push(`/auth/register?return_url=${encodeURIComponent(returnUrl)}`);
      return;
    }

    // Check if email is verified
    if (!user.email_validated) {
      // Redirect to verify OTP with return URL to cart
      router.push(
        `/auth/verify-otp?email=${user.email}&return_url=${encodeURIComponent(returnUrl)}`
      );
      return;
    }

    // User is authenticated and verified, create order
    createOrderMutation.mutate();
  };

  return (
    <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-full text-sm font-normal flex flex-col xl:px-21.5 lg:px-10 px-4 lg:py-12.5 py-4 lg:gap-6 gap-3">
      {/* Cart Summary */}
      <div className="flex justify-between">
        <Caption
          title="Subtotal"
          className="font-medium text-[#3B3B3B] lg:text-base text-sm "
        />

        <Caption
          className="font-normal text-[#3B3B3B] lg:text-base text-sm"
          title={formatCurrency(subtotal !== undefined ? subtotal : (totalPrice ?? 0))}
        ></Caption>
      </div>

      {/* Tax */}
      {tax !== undefined && (
        <div className="flex justify-between">
          <Caption
            title="Tax"
            className="font-medium text-[#3B3B3B] lg:text-base text-sm"
          />
          <Caption
            className="font-normal text-[#3B3B3B] lg:text-base text-sm"
            title={formatCurrency(tax)}
          />
        </div>
      )}

      {/* Shipping Cost */}
      {shippingCost !== undefined && (
        <div className="flex justify-between">
          <Caption
            title="Shipping"
            className="font-medium text-[#3B3B3B] lg:text-base text-sm"
          />
          <Caption
            className="font-normal text-[#3B3B3B] lg:text-base text-sm"
            title={shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
          />
        </div>
      )}

      {/* Promo Code */}
      <div>
        <Input
          type="text"
          className="rounded-[50px] border border-[#D1D5DB] py-3.5 px-5"
          placeholder="Promotional code"
        />

        <AuthSpan className="text-[#3B3B3B] font-normal pt-4  text-sm lg:text-base">
          You have <span className="font-medium">0 Loyalty points = ₦0.00</span>
        </AuthSpan>
      </div>

      {/* Total */}
      <div className="flex font-medium justify-between lg:pb-10 pb-6">
        <Caption
          title="Total"
          className="font-medium text-[#3B3B3B] lg:text-base text-sm"
        />
        <Caption
          className="font-normal text-[#3B3B3B] lg:text-base text-sm"
          title={formatCurrency(totalPrice ?? 0)}
        />
      </div>

      {/* Cart Proceed to Checkout Button */}
      {showButton && (
        <>
          <Link href="/checkout" onClick={handleProceedToCheckout}>
            <LinkCta
              label={
                createOrderMutation.isPending
                  ? "Creating order..."
                  : "Proceed to checkout"
              }
              className="w-full"
              disabled={createOrderMutation.isPending}
            />
          </Link>

          <p className="pt-2.5 lg:text-sm text-xs font-normal text-center text-[#6F6E6C] italic ">
            You will earn {totalItems * 2} points from this purchase
          </p>
        </>
      )}

      {/* Mobile Pay Button - Only shown on checkout page on mobile */}
      {showMobilePayButton && (
        <div className="lg:hidden">
          <SubmitButton
            label={`Pay ${formatCurrency(totalPrice ?? 0)}`}
            loadingLabel="Processing..."
            isPending={false}
            onClick={onMobilePayClick}
          />
          <p className="pt-2.5 text-xs font-normal text-center text-[#6F6E6C] italic">
            You will earn {totalItems * 2} points from this purchase
          </p>
        </div>
      )}
    </div>
  );
};

export default Receipt;
