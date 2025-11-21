import React from "react";
import EmptyCustomerDefault from "../../shared/empty-screens/EmptyCustomerDefault";

const EmptyShipping = () => {
  return (
    <section className="">
      <EmptyCustomerDefault
        src="/empty-location-icon.png"
        alt="icon of a maps"
        width={153.33}
        height={100}
        className=""
        subHeading="Default Address"
        contentOne="No saved address. add address to make checkout faster and smoother."
        contentTwo="Add shipping address"
        useCircle
      />
    </section>
  );
};

export default EmptyShipping;
