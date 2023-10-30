"use client";

import ProductDisplayingCard from "@/components/Card/ProductDisplayingCard";
import { useEffect, useState } from "react";

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
  }, [products]);
  return (
    <div className="m-w-screen-md xl:w-4/5 mx-auto mt-4">
      <h1 className="ml-8 font-bold text-5xl">รายการสินค้า</h1>
      <div className="flex flex-wrap gap-2 m-4">
        {products.length !== 0 &&
          products.map((product) => (
            <div key={product.id}>
              <ProductDisplayingCard
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
