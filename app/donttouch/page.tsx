"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Home/Header";
import ProductCard from "@/components/Home/ProductCard";
import ProductDisplayingCard from "@/components/card/ProductDisplayingCard";
type Payhist = {
  // Define the properties of the Payhist type
  // For example: id, amount, date, etc.
};
type Product = {
  // Define the properties of the Payhist type
  // For example: id, amount, date, etc.
};




type userdatatype = {
  id  : number
  email : string
  name : string     
  lastname : String
  products: Product[]
  remainbulb: Payhist[]


} 

export default function H() {
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
  
  return (
    <div>
    {userinfo.map((user) => (
      <div key={user.id}>
        <h2>User Information</h2>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
        <p>Last Name: {user.lastname}</p>
        <p>product: {user.products}</p>
      </div>
    ))}
  </div>
  )}
    