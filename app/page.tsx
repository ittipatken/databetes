"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Home/Header";
import ProductCard from "@/components/Home/ProductCard";
import ProductDisplayingCard from "@/components/card/ProductDisplayingCard";

type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
};

export default function Home() {
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
      <Header />

        <ProductCard />

      <div>
        <ul>
          {products.map((product) => (
            <p key={product.id}>
              <ProductDisplayingCard
                name={product.name}
                description={product.description}
                price={product.price}
              />
            </p>
          ))}
        </ul>
      </div>
    </>
  );
}
