'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SigninForm() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [chulaId, setChulaId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passowordMatched, setPasswordMatched] = useState(true);
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === passwordConfirmation) {
            setPasswordMatched(true)
            try {
                const res = await fetch("/api/account", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        name,
                        lastname,
                        chulaId,
                        password,
                    }),
                });

                if (res.ok) {
                    console.log(res)
                    setEmail('');
                    setName('');
                    setLastname('');
                    setChulaId('');
                    setPassword('');
                    setPasswordConfirmation('');
                    router.push('/auth/signin');
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log('unmatch password')
            setPasswordMatched(false)
        }
    };
    return (
        <>
            <h1 className="text-center text-3xl">สมัคร</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2 w-96 mx-auto mt-6">
                    <div>
                        <p>อีเมล</p>
                        <input
                            type="text"
                            placeholder="อีเมล"
                            className="input input-bordered input-accent w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>ชื่อ</p>
                        <input
                            type="text"
                            placeholder="ชื่อ"
                            className="input input-bordered input-accent w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>นามสกุล</p>
                        <input
                            type="text"
                            placeholder="นามสกุล"
                            className="input input-bordered input-accent w-full"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
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
                    <div>
                        <p>ยืนยันรหัสผ่าน</p>
                        <input
                            type="password"
                            placeholder="รหัสผ่าน"
                            className="input input-bordered input-accent w-full"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        สมัคร
                    </button>
                    {!passowordMatched && <p className="text-red-600">รหัสผ่านไม่ถูกต้อง</p>}
                </div>
            </form>
        </>
    );
}