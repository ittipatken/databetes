"use client";

import { useEffect, useState } from "react";
import ProductDisplayingCard from "@/components/Card/ProductDisplayingCard";
import AddToCart from "@/components/Home/AddToCart";

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
    <AddToCart />
      <div className="flex flex-wrap">
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
