"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SigninForm from "@/components/Auth/RegisterForm";
import BuyHistory from "@/components/History/BuyHistory";
import ReceiveHistory from "@/components/History/ReceiveHistory";

interface TransactiondataType {
  amount: number;
  toUser: string;
  fromUser: string;
  id: number;
  //help here 1# ไม่เเน่ใจว่าถูกมั้ย
};

export default function History() {
  const { data: session } = useSession();
  const [transactiondata, setTransactiondata] = useState<TransactiondataType[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/transaction", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTransactiondata(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // const currentuserid = session?.user?.id;
  // const userrecieve = transactiondata.filter(
  //   (transactiondata.toUser = currentuserid)
  // );
  // const userpaid = transactiondata.filter(
  //   (transactiondata.fromUser = currentuserid)
  // );

  // help #2 บรรทัด 40-46 ผมจะให้ currentuserid เป็น id ของคนที่ login อยู่โดยใช้ session เ
  // ตั้งตัวเแปร userrecieve เป็นArray ที่รวม object จาก transactiondata ที่มี currentuser เป็นคนรับ (ตรงกับ toUser) โดยใช้ filter เทียบให้ตรงกับ currentuserid
  // userpaid เหมือนกันเเต่เป็น fromuser เพื่อสร้าง array ที่มี object เป็น transaction ที่มี current user เป็นคนจ่าย
  // ฝากเเก้หน่อยครับ 

  if (session) {
    return (
      <div className="max-w-6xl mx-auto">
        <BuyHistory />
        <ReceiveHistory />
      </div>
    );
  } else
    return (
      <>
        <SigninForm />
      </>
    );
}
/* help 3#
   บรรทัดที่ 56-60 เป็น block สีเเดง เขียนว่า paid history สีเเดง
   บรรทัดที่ 62-70 เเสดง block กรอบเเดง เเสดงทุก transaction ที่มี currentuser เป็น fromuser เเต่ว่าผมงงไม่รุใช้ key อะไร loop ดี prop ก็ไม่รู้ว่าดึงข้อมูลถูกที่มั้ย
   บรรทัดที่ 72-76 เป็น block สีเขียว เขียนว่า recieve history สีเขียว
   บรรทัดที่ 77-88 เหมือนบรรทัดที่ 66-68 เเต่เป็น block กรอบเขียวเเสดง transaction ที่มี currenyuser เป็น toUser ปัญหาเดียวกัน

   conclusion 
   1) "paid history"
   2) blocks of paid transaction (showing คนรับเเละจนBulbที่โอน)
   3) "recieve history"
   4) blocks of recieve transaction (showing คนจ่ายเเละจนBulbที่โอน)
*/