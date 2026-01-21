import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

function CartButton() {
  const numItemsInCart = 3; // This would typically come from application state
  return (
    <Button
      asChild
      size="icon"
      variant="outline"
      className="flex place-items-center relative"
    >
      <Link href="/cart">
        <span className="absolute -top-3 -right-3 rounded-full bg-primary  w-6 h-6 flex items-center justify-center text-white text-xs">
          {numItemsInCart}
        </span>
        <FaShoppingCart />
      </Link>
    </Button>
  );
}

export default CartButton;
