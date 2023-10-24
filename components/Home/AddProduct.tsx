"use client";

import Link from "next/link";
import React from "react";

const AddToCart = () => {
  return (
    <div>
      <Link href="/product">
        <button
          className="btn btn-outline btn-error mx-7"
          onClick={() => console.log("Click")}
        >
          Add Product
        </button>
      </Link>
    </div>
  );
}

export default AddToCart;
