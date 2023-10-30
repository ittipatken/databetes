"use client";

import SigninForm from "@/components/Auth/SigninForm";
import { useSession } from "next-auth/react";
import { useState } from "react";
// import Letter from "@/components/Letter";
// import Buttontohome from "@/components/Kcomponent/Buttontohome";
// import GoWallet from "@/components/Kcomponent/Towallet";
export default function AddProduct() {
  // This is a bad practice because if the value in the field changes, the entire page rerenders. We should use react-hook-form or useCallback
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const { data: session } = useSession();

  const postRequest = async () => {
    try {
      if (!name) {
        throw "error";
      }
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          quantity,
          description,
        }),
      });

      if (res.ok) {
        setName("");
        setPrice(0);
        setQuantity(0);
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postRequest();
  };
  if (session) {
    return (
      <>
        <div className="min-h-screen">
          <div className="hero-content flex-col mx-auto">
            <div className="text-center lg:text-left">
              <h1 className="text-center text-3xl mt-3">เพิ่มสินค้า</h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
              <form onSubmit={handleFormSubmit} className="card-body">
                <div className="flex flex-col space-y-2 w-full mx-auto mt-6">
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
                  <div>
                    <p>ปริมาณ</p>
                    <input
                      type="number"
                      id="quantity"
                      name="ปริมาณ"
                      placeholder="ปริมาณ"
                      className="input input-bordered input-accent w-full"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <p>คำอธิบายเพิ่มเติม</p>
                    <input
                      type="text"
                      id="description"
                      name="คำอธิบายเพิ่มเติม"
                      placeholder="คำอธิบายเพิ่มเติม"
                      className="input input-bordered input-accent w-full"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    ส่ง
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div >
      </>
    );
  } return (
    <>
      <SigninForm />
    </>
  )
}

