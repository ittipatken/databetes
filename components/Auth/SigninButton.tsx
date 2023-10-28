import Link from "next/link";

export default function SignInButton() {
  return (
    <>
      <Link href="/auth/signin">
        <button className="btn btn-accent normal-case">เข้าสู่ระบบ</button>
      </Link>
    </>
  );
}
