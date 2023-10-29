"use client";

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
