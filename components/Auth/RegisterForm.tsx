'use client';

import { useState } from 'react';

export default function SigninForm() {
    const [chulaId, setChulaId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === passwordConfirmation) {
            // register
        }
        else {
            console.log('unmatch password')
        }
    };
    return (
        <>
            <h1 className="text-center text-3xl">สมัคร</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2 w-96 mx-auto mt-6">
                    <div>
                        <p>Chula ID</p>
                        <input
                            type="number"
                            id="name"
                            name="Chula ID"
                            placeholder="Chula ID"
                            className="input input-bordered input-accent w-full"
                            value={chulaId}
                            onChange={(e) => setChulaId(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>รหัสผ่าน</p>
                        <input
                            type="text"
                            id="password"
                            name="รหัสผ่าน"
                            placeholder="รหัสผ่าน"
                            className="input input-bordered input-accent w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>ยืนยันรหัสผ่าน</p>
                        <input
                            type="text"
                            id="password"
                            name="รหัสผ่าน"
                            placeholder="รหัสผ่าน"
                            className="input input-bordered input-accent w-full"
                            value={password}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        สมัคร
                    </button>
                </div>
            </form>
        </>
    );
}