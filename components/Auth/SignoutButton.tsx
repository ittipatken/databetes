'use client';

import { signOut } from 'next-auth/react';

export default function Signout() {
  return (
    <button onClick={async () => { await signOut(); }}>
      ออกจากระบบ
    </button>
  );
}