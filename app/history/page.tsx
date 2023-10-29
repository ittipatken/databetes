"use client";

import Paidhistory from "@/components/History/Paidhistory";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "inspector";
import Pleaselogin from "@/components/Home/Pleaselogin";
type TransactiondataType = {
  amount: number ;
  recieverEmail: string ;

  //help here 1#
};

export default function History() {
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

  const { data: session } = useSession();
  let currentuserid = session?.user.id
  const userrecieve = transactiondata.filter(transactiondata.receiverid = currentuserid)
  const userpaid = transactiondata.filter(transactiondata.senderid = currentuserid)

  if (session) {
    return (
      <>
        <div className="mt-4 md:mt-8">
        <a
          className="inline-block rounded bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-red-800 focus:outline-none focus:ring focus:ring-yellow-400 "
        >
          Paid history
        </a>
        </div>

        <div className="flex flex-wrap gap-4 m-3">
          {userpaid.map((userpaid) => (
            <div key={test.id}>
              <Paidhistory
                name={userpaid.name}
                price={userpaid.amount}
              />
            </div>
          ))}


        </div>

        <div className="mt-4 md:mt-8">
        <a
          className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Recieve history
        </a>
        </div>
        <div>

          
        </div>

      </>
    );
  } else return <>
  <Pleaselogin/>
  </>;


}
