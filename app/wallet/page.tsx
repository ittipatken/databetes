"use client";

import { useEffect, useState } from "react";
import WalletBox from "@/components/Wallet/WalletBox";
import { useSession } from "next-auth/react";
import SigninForm from "@/components/Auth/SigninForm";

type AccountType = {
  id: number;
  name: string;
  email: string;
  lastname: string;
  amount: number;
};

export default function Home() {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState<AccountType | null>(null);

  useEffect(() => {
    if (session) {
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
    }
  }, [session]); // Include 'session' as a dependency

  return (
    <>
      {session ? (
        <div className="flex flex-wrap m-4">
          <WalletBox name={accounts?.name} amount={accounts?.amount} />
        </div>
      ) : (
        <SigninForm />
      )}
    </>
  );
}
