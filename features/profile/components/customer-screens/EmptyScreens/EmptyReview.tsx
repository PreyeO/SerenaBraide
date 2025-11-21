import React from "react";
import EmptyCustomerDefault from "../../shared/empty-screens/EmptyCustomerDefault";
import { Stars } from "lucide-react";

const EmptyReview = () => {
  return (
    <section>
      <EmptyCustomerDefault
        src="/empty-payment-icon.png"
        alt="icon of a cards"
        width={100}
        height={100}
        className=""
        subHeading="Ratings & Reviews"
        contentOne="No reviews yet. Be the first to share your experience!"
        contentTwo="Write a review"
        Icon={Stars}
        useCircle={false}
      />
    </section>
  );
};

export default EmptyReview;
