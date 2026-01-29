import React from "react";
import { UserCog } from "lucide-react";
import EmptyCustomerDefault from "../shared/empty/EmptyCustomerDefault";

const EmptySettings = () => {
  return (
    <section>
      <EmptyCustomerDefault
        src="/empty-payment-icon.png"
        alt="icon of a cards"
        width={100}
        height={100}
        className=""
        subHeading="Account Settings"
        contentOne="You haven’t set up any account preferences yet. Customize your settings to make your experience smoother."
        contentTwo="Update settings"
        Icon={UserCog}
        useCircle={false}
        href="/products"
      />
    </section>
  );
};

export default EmptySettings;
