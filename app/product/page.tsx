"use client";
import React, { useEffect, useState } from "react";

import Letter from "@/components/Letter";
import Buttontohome from "@/components/Kcomponent/Buttontohome";
import Productcard from "@/components/Home/ProductCard";

type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
};

export default function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [post, setPost] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

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

  useEffect(() => {
    fetchData();
  }, []);

  const postRequest = async () => {
    try {
      const res = await fetch("/api/getproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
        }),
      });

      if (res.ok) {
        setName("");
        setPrice(0);
        fetchData(); // Refetch the data after successful post
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postRequest();
  };

  return (
    <>
      <Buttontohome />
      <Letter />
      <Productcard />

      <div>
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>Price: {product.price}</p>
              <p>Description: {product.description}</p>
              <p>Quantity: {product.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
       <form onSubmit={handleFormSubmit}>
        <p>Name</p>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <p>Price</p>
        <input
          type="number"
          id="price"
          name="price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
