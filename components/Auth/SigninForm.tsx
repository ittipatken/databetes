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
        <h1 className="text-center text-3xl">เข้าสู่ระบบ</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2 w-96 mx-auto mt-6">
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
        </>
    );
}