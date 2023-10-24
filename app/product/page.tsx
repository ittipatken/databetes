'use client'
import React, { useEffect, useState } from "react";

import Letter from "@/components/Letter";
import Buttontohome from "@/components/Kcomponent/Buttontohome";
import Productcard from "@/components/Home/ProductCard";

type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
};

export default function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getproducts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setProducts(data);
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

      <div>
        <h1>Products</h1>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>Price: {product.price}</p>
              <p>Description: {product.description}</p>
              <p>Quantity: {product.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
