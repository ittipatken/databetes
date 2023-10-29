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
      <div className="overflow-x-auto m-5">
        <div className="mt-4 md:mt-8 rounded text-center bg-emerald-600 px-12 py-3 text-lg font-medium text-white">
          ประวัติรับเงิน
        </div>
        <table className="table">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>ประวัติรับเงิน</th>
              <th>ชื่อสินค้า</th>
              <th>ราคา</th>
              <th>จำนวน</th>
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
