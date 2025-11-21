import React from "react";
import EmptyCustomerDefault from "../../shared/empty-screens/EmptyCustomerDefault";
import SecurePaymentInfo from "@/components/legal-sections/SecurePaymentInfo";

const EmptyPayment = () => {
  return (
    <section>
      <EmptyCustomerDefault
        src="/empty-payment-icon.png"
        alt="icon of a cards"
        width={100}
        height={100}
        className=""
        subHeading="Payment Card"
        contentOne="No cards saved. Add card to speed up future orders."
        contentTwo="Add payment method"
        useCircle
      />
      <SecurePaymentInfo />
    </section>
  );
};

export default EmptyPayment;
