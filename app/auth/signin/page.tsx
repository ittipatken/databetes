'use client'; 

import SigninForm from "@/components/Auth/SigninForm";
import { useSession } from 'next-auth/react';

export default function SignIn() {
    const { data: session } = useSession();
    if(session){
        return(
            <>
            <h1> you are logged in as {JSON.stringify(session)}</h1>
            </>
        )
    }
    return(
        <>
        <SigninForm/>
        </>
    )
}