"use client";

import { useEffect, useState } from "react";
import WalletBox from "@/components/Wallet/WalletBox";
import { useSession } from "next-auth/react";

type AccountType = {
  id: number;
  name: string;
  email: string;
  lastname: string;
  amount: number;
};

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    const [accounts, setAccounts] = useState<AccountType>();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/account", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          setAccounts(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
    return (
      <>
        <div className="flex flex-wrap m-4">
          <WalletBox name={accounts?.name} amount={accounts?.amount} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>please log in</h1>
      </>
    );
  }
}
