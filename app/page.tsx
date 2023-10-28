"use client";

import { useEffect, useState } from "react";
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
        const response = await fetch("/api/products", {
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
      <div className="flex flex-wrap m-4">
        {products.map((product) => (
          <div key={product.id}>
            <ProductDisplayingCard
              name={product.name}
              description={product.description}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </>
  );
}
