import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      {" "}
      <Link href="/admin/products/new-product">
        <Button>Add new product</Button>
      </Link>
    </header>
  );
};

export default Header;
