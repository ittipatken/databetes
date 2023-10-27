import React from "react"
export default function Buyhistorybox (props:any) {
    return(
      <div gap-4 grid-cols-2> pls help
        <div className="card w-96 bg-orange-600 border-double border-8 border-black ">
    <div className="card-body">
      <h2 className="card-title">{props.name}</h2>
      <p>{props.description}</p>
      <div className="card-actions justify-end">
        <button className="btn bg-black text-white"> sold {props.price}
        </button>
      </div>
    </div>
  </div>
  </div>
    )
}