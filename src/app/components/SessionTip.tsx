"use client"

import { signIn, signOut } from "next-auth/react"
import type { Session } from "next-auth"

// ログイン、ログアウト機能用の仮コンポーネント
export default function SessionTip({ session }: { session: Session | null }) {
  // クライアントセッション（これを使う場合は引数不要）
  // const { data: session, status } = useSession()

  console.log(session)
  if (!session)
    return (
      <>
        <p>未ログイン</p>
        <button
          onClick={() => signIn()}
          className="flex w-full justify-center border-2 border-b border-red-300 hover:border-red-400 bg-red-200 hover:bg-red-300 pb-6 pt-8 backdrop-blur-2xl dark:border-red-800 dark:hover:border-red-900 dark:bg-red-800/50 dark:hover:bg-red-900/30 lg:static lg:w-auto lg:rounded-xl lg:p-4"
        >
          Sign In
        </button>
      </>
    )

  return (
    <>
      <p>ログイン中</p>
      <button
        onClick={() => signOut()}
        className="flex w-full justify-center border-2 border-b border-green-300 bg-green-200 pb-6 pt-8 backdrop-blur-2xl dark:border-green-800 dark:bg-green-800/30 lg:static lg:w-auto lg:rounded-xl lg:p-4 hover:border-green-400 hover:bg-green-300 dark:hover:border-green-900 dark:hover:bg-green-900/30"
      >
        Sign Out
      </button>
    </>
  )
}
