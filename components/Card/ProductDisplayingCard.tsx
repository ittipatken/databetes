"use client";

import { useRouter } from "next/navigation";

export default function ProductDisplayingCard(props: any) {
  const router = useRouter()
  const handleClick = () => {
    // buy product
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
            <button className="btn btn-primary" onClick={handleClick}>ราคา {props.price} blub</button>
          </div>
        </div>
      </div>
    </>
  );
}
