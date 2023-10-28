'use client';

import RegisterForm from "@/components/Auth/RegisterForm";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function Register() {
    const { data: session } = useSession();
    const router = useRouter()
    if (session) {
        router.replace('/')
    }
    return (
        <>
            <RegisterForm />
        </>
    )
}