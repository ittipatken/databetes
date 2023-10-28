"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function EditProductModal(props: any) {
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [quantity, setQuantity] = useState(props.quantity);
    const [description, setDescription] = useState(props.description);
    const { data: session } = useSession();
    const handleClick = async () => {
        try {
            const response = await fetch('/api/products', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    price,
                    quantity,
                    description,
                    // doesn't work
                    userId: session?.user?.email,
                }),
            });

            if (response.ok) {
               console.log(response)
            } else {
                console.log("error" + response)
                // Handle errors, e.g., show an error message.
            }
        } catch (error) {
            console.log(error)
            // Handle any network or request errors here.
        }
    }
    return (
        <>
            <dialog id="edit_product_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="flex flex-col space-y-3">
                        <h1 className="text-lg">แก้ไขสินค้า</h1>
                        <p className="text-slate-500">ชื่อสินค้า</p>
                        <input type="text" placeholder="ชื่อสินค้า" className="input w-full" value={name} onChange={(e) => setName(e.target.value)} />
                        <p className="text-slate-500">ราคา</p>
                        <input type="number" placeholder="ราคา" className="input w-full" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        <p className="text-slate-500">จำนวน</p>
                        <input type="number" placeholder="จำนวน" className="input w-full" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                        <p className="text-slate-500">รายละเอียด</p>
                        <input type="text" placeholder="รายละเอียด" className="input w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <button className="btn btn-secondary" onClick={handleClick}>แก้ไขข้อมูล</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
