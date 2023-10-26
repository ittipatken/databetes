"use client";

import { useState } from "react";

import Letter from "@/components/Letter";
import Buttontohome from "@/components/Kcomponent/Buttontohome";
import GoWallet from "@/components/Kcomponent/Towallet";

export default function Product() {

  // This is a bad practice because if the value in the field changes, the entire page rerenders. We should use react-hook-form or useCallback
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const postRequest = async () => {
    try {
      if (!name) {
        throw ("error")
      }
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
      {/* <div className="bg-gradient-to-r from-yellow-300 to-rose-200">
        <header>
          <div
            className=" bg-gradient-to-r from-yellow-300 to-rose-200 justify-end"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <nav>
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  gap: "2px",
                }}
              >
                <li style={{ marginRight: "1px" }}>
                  <GoWallet />
                </li>
                <li>
                  <Buttontohome />
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div> */}
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col space-y-2 w-96 mx-auto mt-6">
          <div>
            <p>ชื่อสินค้า</p>
            <input
              type="text"
              id="name"
              name="ชื่อสินค้า"
              placeholder="ชื่อสินค้า"
              className="input input-bordered input-accent w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p>ราคา</p>
            <input
              type="number"
              id="price"
              name="ราคา"
              placeholder="ราคา"
              className="input input-bordered input-accent w-full"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
}
