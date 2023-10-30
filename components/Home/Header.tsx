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
          {session &&
            <>
              <div className="hidden md:block">
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
              </div>
              <div className="dropdown md:hidden">
                <label tabIndex={0} className="btn btn-ghost normal-case m-1">Menu</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link href="/dashboard/addproduct" className="btn btn-ghost normal-case">
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/editproduct" className="btn btn-ghost normal-case">
                      Edit Product
                    </Link>
                  </li>
                  <li>
                    <Link href="/wallet" className="btn btn-ghost normal-case">
                      Wallet
                    </Link>
                  </li>
                  <li>
                    <Link href="/history" className="btn btn-ghost normal-case">
                      History
                    </Link>
                  </li>
                </ul>
              </div>
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