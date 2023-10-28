'use client'

import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import { useSession } from 'next-auth/react';
import SignInButton from "../../components/Auth/SigninButton";
import SignOutButton from "../../components/Auth/SignoutButton";

export default function Header() {
  const { data: session } = useSession()
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case">
            Home
          </Link>
          {session && <>
            <Link href="/dashboard/addproduct" className="btn btn-ghost normal-case">
              Add Product
            </Link>
            <Link href="/dashboard/editproduct" className="btn btn-ghost normal-case">
              Edit Product
            </Link>
            <Link href="/wallet" className="btn btn-ghost normal-case">
              Wallet
            </Link>
            <Link href="/history" className="btn btn-ghost normal-case">
              History
            </Link>
          </>
          }
        </div>
        <div className="flex-none gap-4">
          {session ?
            <SignOutButton />
            :
            <>
              <Link href="/auth/register" className="btn btn-primary normal-case">
                สมัคร
              </Link>
              <SignInButton />
            </>
          }
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}