"use client";

import Link from "next/link";
import React from "react";

const AddToCart = () => {
  return (
    <div>
      <Link href="/product">
        <div className="grid justify-items-stretch">
        <button
          className="btn btn-outline btn-error my-2 w-52 justify-self-end"
          onClick={() => console.log("Click")}
        >
          Add to Cart
        </button>
        </div>
      </Link>
    </div>
  );
}

export default AddToCart;
