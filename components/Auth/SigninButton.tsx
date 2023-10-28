"use client";

import { signIn } from "next-auth/react";

export default function SigninButton() {
    return (
        <button className="btn btn-accent normal-case text-xl" onClick={async () => { await signIn(); }}>Login</button>
    );
}
