"use client";
import { useEffect, useState } from "react";

interface Products {
  id: number
  productName: string
  amount: number
  quantity: number
}

export default function BuyHistory() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sellproducts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log(products);
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
            <th>ประวัติรับเงิน</th>
              <th>ชื่อสินค้า</th>
              <th>จำนวน</th>
              <th>ราคา</th>
            </tr>
          </thead>
          <tbody>
          {products.map((product) => (
            <tr key={product.id} className="bg-base-200">
              <th>{product.id}</th>
              <td>{product.productName}</td>
              <td>{product.amount}</td>
              <td>{product.quantity}</td>
            </tr>
        ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
