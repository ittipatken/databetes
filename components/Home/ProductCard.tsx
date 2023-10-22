import React from "react";
import AddToCart from "./AddProduct";
import styles from "./ProductCard.module.css";

const Productcard = () => {
  return (
    <div className="p-5 my-5 bg-rose-300 text-white text-xl hover:bg-rose-400">
      <AddToCart />
    </div>
  );
};

export default Productcard;
