"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductDisplayingCard(props: any) {
  const router = useRouter()
  const [isBuying, setIsBuying] = useState(false);
  const { data: session } = useSession();
  const quantity = 1
  const handleClick = async () => {
    if (session) {
      setIsBuying(true);
      setTimeout(() => {
        setIsBuying(false);
      }, 3000);
      try {
        const res = await fetch("/api/buyproducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: props.id,
            quantity,
            amount: props.price * quantity,
          }),
        });

        if (res.ok) {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push('/auth/signin');
    }
  }

  const handleDetail = (description: string) => {
    router.push(`/detail/${description}`)
  }
  return (
    <>
      <div className="card w-80 h-52 bg-base-300 shadow-xl flex-auto m-1">
        <div className="card-body">
          <h2 className="card-title">{props.name}</h2>
          <div className="card-actions flex flex-col">
            <button className="btn btn-outline" onClick={() => handleDetail(props.description)}>รายละเอียด</button>
            <button className="btn btn-primary" onClick={handleClick}>ราคา {props.price} Blub</button>
          </div>
        </div>
      </div>
      {isBuying &&
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>สั่งซื้อเสร็จสิ้น</span>
          </div>
        </div>
      }
    </>
  );
}
