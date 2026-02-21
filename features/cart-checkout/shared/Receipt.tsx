"use client";

import Caption from "@/components/ui/typography/caption";
import LinkCta from "@/components/ui/btns/link-cta";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { formatCurrency } from "@/lib/utils";

interface ReceiptProps {
  totalItems?: number;
  totalPrice?: number;
  subtotal?: number;
  shippingCost?: number;
  tax?: number;
  showTotal?: boolean;
  showButton?: boolean;
  showMobilePayButton?: boolean;
  onMobilePayClick?: () => void;
  onProceedToCheckout?: () => void;
  isCheckoutPending?: boolean;
}

const Receipt = ({
  // totalItems = 0,
  totalPrice = 0,
  subtotal,
  shippingCost,
  tax,
  showTotal = true,
  showButton = true,
  showMobilePayButton = false,
  onMobilePayClick,
  onProceedToCheckout,
  isCheckoutPending = false,
}: ReceiptProps) => {
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
          title={formatCurrency(
            subtotal !== undefined ? subtotal : (totalPrice ?? 0),
          )}
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

      {/* Total */}
      {showTotal && (
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
      )}

      {/* Cart Proceed to Checkout Button */}
      {showButton && (
        <button onClick={onProceedToCheckout} disabled={isCheckoutPending}>
          <LinkCta
            label={
              isCheckoutPending ? "Creating order..." : "Proceed to checkout"
            }
            className="w-full"
            disabled={isCheckoutPending}
          />
        </button>
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
        </div>
      )}
    </div>
  );
};

export default Receipt;
