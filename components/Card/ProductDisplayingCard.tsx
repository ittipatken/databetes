"use client";

import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductDisplayingCard(props: any) {
  const router = useRouter()
  const [isBuying, setIsBuying] = useState(false);
  const [statusText, setStatusText] = useState('');
  const { data: session } = useSession();
  const quantity = 1
  const handleClick = async () => {
    if (session) {
      setStatusText('กำลังซื้อ')
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
          setStatusText('สั่งซื้อสำเร็จ')
          console.log(res);
        } else {
          setStatusText('สั่งซื้อไม่สำเร็จ')
        }
      } catch (error) {
        setStatusText('สั่งซื้อไม่สำเร็จ')
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
      <div className="card w-80 h-52 bg-base-200 shadow-xl flex-auto m-1">
        <div className="card-body">
          <h2 className="card-title">{props.name}</h2>
          <div className="card-actions flex flex-col">
            <button className="btn btn-ghost" onClick={() => handleDetail(props.description)}>รายละเอียด <InformationCircleIcon className="h-5" /></button>
            <button className="btn btn-primary text-lg" onClick={handleClick}>{props.price} Blub</button>
          </div>
        </div>
      </div>
      {isBuying &&
        <div className="toast toast-end mb-10">
          {statusText === 'สั่งซื้อไม่สำเร็จ' ?
            <div className="alert alert-error">
              <span>{statusText}</span>
            </div>
            :
            <div className="alert alert-success">
               <span>{statusText}</span>
            </div>
          }
        </div>
      }
    </>
  );
}
