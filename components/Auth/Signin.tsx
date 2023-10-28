'use client';

import { signIn } from 'next-auth/react';

export default function Signin() {
  return (
    <>
      <br />
      <div>
        <div>
          <h1 style={{ position: 'relative' }}>กรุณาเข้าสู่ระบบ</h1>
          <button onClick={async () => { await signIn(); }}>
            เข้าสู่ระบบ
          </button>
          <p>
            ฝ่ายเทคโนโลยีสารสนเทศ สโมสรนิสิตคณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
      </div>
    </>
  );
}