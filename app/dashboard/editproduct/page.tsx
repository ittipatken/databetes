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

export default function EditProduct() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/editproducts", {
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
    <div className="m-w-screen-md xl:w-3/4 mx-auto mt-4">
      <h1 className="ml-8 font-bold text-5xl">แก้ไขรายการสินค้า</h1>
      <div className="flex flex-wrap gap-2 m-4">
        {products.length !== 0 &&
          products.map((product) => (
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
    </div>
  );
}
