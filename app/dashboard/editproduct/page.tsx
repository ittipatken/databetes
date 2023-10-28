"use client";

import { useEffect, useState } from "react";
import EditProductCard from "@/components/Card/EditProductCard";

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
      <div className="flex flex-wrap gap-2 m-4">
        {products.map((product) => (
          <div key={product.id}>
            <EditProductCard
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
            />
          </div>
        ))}
      </div>
    </>
  );
}
