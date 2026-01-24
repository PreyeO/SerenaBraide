"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import LinkCta from "@/components/ui/btns/link-cta";
import Link from "next/link";
import { useAuthStore } from "@/features/auth/auth.store";
import { useCreateOrder } from "../hooks/useCreateOrder";

interface ReceiptProps {
  totalItems?: number;
  totalPrice?: number;
  subtotal?: number;
  shippingCost?: number;
  tax?: number;
  showButton?: boolean;
}

const Receipt = ({
  totalItems = 0,
  totalPrice = 0,
  subtotal,
  shippingCost,
  tax,
  showButton = true,
}: ReceiptProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const createOrderMutation = useCreateOrder({ redirectToCheckout: true });

  const handleProceedToCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!user) {
      // Redirect to register with return URL
      router.push("/auth/register?return_url=/checkout");
      return;
    }

    // Check if email is verified
    if (!user.email_validated) {
      // Redirect to verify OTP with return URL
      router.push(`/auth/verify-otp?email=${user.email}&return_url=/checkout`);
      return;
    }

    // User is authenticated and verified, create order
    createOrderMutation.mutate();
  };

  return (
    <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-full text-sm font-normal flex flex-col px-21.5 py-12.5 gap-6">
      {/* Cart Summary */}
      <div className="flex justify-between">
        <h5 className="font-medium">Items</h5>
        <h5>{totalItems}</h5>
      </div>

      <div className="flex justify-between">
        <h5 className="font-medium">Subtotal</h5>
        <h5>
          #{(subtotal !== undefined ? subtotal : (totalPrice ?? 0)).toFixed(2)}
        </h5>
      </div>

      {/* Shipping Cost */}
      {shippingCost !== undefined && (
        <div className="flex justify-between">
          <h5 className="font-medium">Shipping</h5>
          <h5>#{shippingCost.toFixed(2)}</h5>
        </div>
      )}

      {/* Tax */}
      {tax !== undefined && (
        <div className="flex justify-between">
          <h5 className="font-medium">Tax</h5>
          <h5>#{tax.toFixed(2)}</h5>
        </div>
      )}

      {/* Promo Code */}
      <div>
        <Input
          type="text"
          className="rounded-[50px] border border-[#D1D5DB] py-3.5 px-5"
          placeholder="Promotional code"
        />

        <p className="text-[#3B3B3B] font-normal pt-4">
          You have <span className="font-medium">0 Loyalty points = #0.00</span>
        </p>
      </div>

      {/* Total */}
      <div className="flex font-medium justify-between pb-10">
        <h5>Total</h5>
        <h5>#{(totalPrice ?? 0).toFixed(2)}</h5>
      </div>

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

          <p className="text-sm font-normal text-center text-[#6F6E6C] italic pt-.5">
            You will earn {totalItems * 2} points from this purchase
          </p>
        </>
      )}
    </div>
  );
};

export default Receipt;
