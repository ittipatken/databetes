'use client';

import SigninForm from "@/components/Auth/SigninForm";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const { data: session } = useSession();
    const router = useRouter()
    if (session) {
        router.replace('/')
    }
    return (
        <>
            <SigninForm />
        </>
    )
}