'use client'

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react'
import { useSession } from "next-auth/react";
import { useAtom } from 'jotai';
import { userAtom } from '@/store/userAtom';

// ログイン、ログアウト機能用の仮コンポーネント
export default function UserProfile() {
  // クライアントセッション
  const { data: session, status } = useSession()
  // セッションユーザーのemailを使用してユーザー情報を取得
  const [user, setUser] = useAtom(userAtom);
  if (session != null) {
    setUser(session.user?.email ?? null);
  }
// ローカルでどのようなユーザー情報を持たせるかは要検討

  if (session && session.user) {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <p>Email: {session.user.email}</p>
      </div>
    );
  }

  return <p>Not signed in</p>;
}

