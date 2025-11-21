import React from "react";
import EmptyCustomerDefault from "../../shared/empty-screens/EmptyCustomerDefault";

const EmptyOrders = () => {
  return (
    <section className="">
      <EmptyCustomerDefault
        src="/empty-orders-icon.png"
        alt="icon of a wishlist"
        width={89}
        height={100}
        className=""
        subHeading="My Orders"
        contentOne="You haven’t placed any orders yet. Once you place an order, it will appear here."
        contentTwo="Explore Products"
        useCircle
      />
    </section>
  );
};

export default EmptyOrders;
