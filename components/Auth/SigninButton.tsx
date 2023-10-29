import Link from "next/link";

export default function SignInButton() {
  return (
    <>
      <Link href="/auth/signin">
        <button className="btn btn-accent normal-case text-slate-100">เข้าสู่ระบบ</button>
      </Link>
    </>
  );
}
