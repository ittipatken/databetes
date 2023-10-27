import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case">
            Home
          </Link>
          <Link href="/product" className="btn btn-ghost normal-case">
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
        <div className="flex-none gap-4">
          <button className="btn btn-accent normal-case text-xl">Login</button>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
