import React from "react";
import { ShoppingCart } from "lucide-react";
import EmptyCustomerDefault from "../shared/empty/EmptyCustomerDefault";

const EmptyWishlist = () => {
  return (
    <section className="">
      <EmptyCustomerDefault
        src="/empty-wishlist-icon.png"
        alt="icon of a wishlist"
        width={86}
        height={100}
        className=""
        subHeading="My Wishlist"
        contentOne="Your Wishlist is Empty."
        contentTwo="Explore Products"
        Icon={ShoppingCart}
        useCircle={false}
        quantity="0 items"
        href="/categories/fragrance"
      />
    </section>
  );
};

export default EmptyWishlist;
