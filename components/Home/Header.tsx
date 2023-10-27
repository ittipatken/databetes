import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
    <>
      <div className="navbar bg-secondary">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case">Home</Link>
          <Link href="/wallet" className="btn btn-ghost normal-case">Wallet</Link>
          <Link href="/paymenthistory" className="btn btn-ghost normal-case">History</Link>
          <Link href="/tester" className="btn btn-ghost normal-case">Tester</Link>
        </div>
        <div className="flex-none gap-4">
          <button className="btn btn-accent normal-case text-xl">Login</button>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
