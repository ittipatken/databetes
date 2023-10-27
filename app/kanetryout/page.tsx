"use client";

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

type userdatatype = {
  id  : number
  email : string
  name : string     
  lastname : String
  products: ProductType[]
} 

  const [userinfo, setUserinfo] = useState<userdatatype[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setUserinfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //first หาทางดึงเ
  let arrayofpay : number[] = products.map(p=>p.price)
  let sumpay = arrayofpay.reduce((sum, currentvalue) => sum + currentvalue, 0)
  

  return (
    <div>
    {userinfo.map((user) => (
      <div key={user.id}>
        <h2>User Information</h2>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
        <p>Last Name: {user.lastname}</p>
        {arrayofpay}
        <p>{sumpay}</p>
      </div>
    ))}
  </div>
  )}

