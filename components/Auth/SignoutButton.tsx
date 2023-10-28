'use client';

import { signOut } from 'next-auth/react';

export default function Signout() {
  return (
      <button className="btn btn-warning normal-case" onClick={async () => { await signOut(); }}> ออกจากระบบ</button>
  );
}