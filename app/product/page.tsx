"use client";

import Letter from "@/components/Letter";
import Buttontohome from "@/components/Kcomponent/Buttontohome";
import Productcard from "@/components/Home/ProductCard";
import { useEffect, useState } from "react";

export default function Product() {
  const [product, setProduct] = useState();
  let listItems
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getproducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Buttontohome />
      <Letter />
      <Productcard />
      <h1> Product is {product} </h1>
      
      <p>{listItems}</p>
    </>
  );
}
