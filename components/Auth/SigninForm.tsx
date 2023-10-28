'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SigninForm() {
    const [chulaId, setChulaId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            chulaId,
            password,
            redirect: false,
        },);

        if (result?.error) {
            setError(true);
            setChulaId('');
            setPassword('');
        }
    };
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='border'>
                        <h1>กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้</h1>
                        <input
                            id="chulaid"
                            type="number"
                            name="chulaid"
                            value={chulaId}
                            className='border bg-gray-400'
                            onChange={(e) => { setChulaId(e.target.value); }}
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            name="pass"
                            value={password}
                            className='border bg-gray-400'
                            onChange={(e) => { setPassword(e.target.value); }}
                            required
                        />
                        <button type="submit">
                            เข้าสู่ระบบ
                        </button>
                        {error && <h1 color="red">ไม่สามารถเข้าสู่ระบบได้</h1>}
                    </div>
                </form>
            </div>
        </div>
    );
}