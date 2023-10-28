"use client";

import BuyHistoryBox from "@/components/History/BuyHistoryBox";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  seller: number
};

export default function History() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { data: session } = useSession();

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
  if (session) {
    return (
      <>
          <div className="flex flex-wrap gap-2 m-3">
            {products.map((product) => (
              <div key={product.id}>
                <BuyHistoryBox
                  name={product.name}
                  price={product.price}
                  description={product.description} />
              </div>))}
          </div>
        </>
    )
  }
}