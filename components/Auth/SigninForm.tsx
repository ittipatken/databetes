'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SigninForm() {
    const [chulaId, setChulaId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            chulaId,
            password,
            redirect: false,
        },);

        if (result?.error) {
            setChulaId('');
            setPassword('');
        }
    };
    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="hero-content flex-col mx-auto">
                    <div className="text-center lg:text-left">
                        <h1 className="text-center text-3xl">เข้าสู่ระบบ</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="flex flex-col space-y-2 w-96">
                            <div>
                                <p>Chula ID</p>
                                <input
                                    type="number"
                                    placeholder="Chula ID"
                                    className="input input-bordered input-accent w-full"
                                    value={chulaId}
                                    onChange={(e) => setChulaId(e.target.value)}
                                />
                            </div>
                            <div>
                                <p>รหัสผ่าน</p>
                                <input
                                    type="password"
                                    placeholder="รหัสผ่าน"
                                    className="input input-bordered input-accent w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                เข้าสู่ระบบ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
        </>
    );
}