import Image from "next/image";
// import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import SessionTip from '@/app/components/SessionTip'
import { useSession, signIn, signOut } from "next-auth/react"
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionTip from "./components/SessionTip";
import UserProfile from "./components/UserProfile";
import { NextResponse } from "next/server";


export default async function Home() {
  // サーバーセッション
  const session = await getServerSession(authOptions);


  const getUserList = async () => {
    const res = await fetch('http://localhost:3000/api/user')
    const json = await res.json()
    return json.users
  }
  let userList = []
  if (session != null) {
    userList = await getUserList()
  }

  /**
   * 
   * sessionがない場合はsignページにリダイレクト
   */
  // const redirectSignin = () => {
  //   if (!session) {
  //     const signInUrl = `${process.env.NEXTAUTH_URL}/signin`; // リダイレクト先のURLを構築// リダイレクト先のURLを構築
  //     return (
  //       NextResponse.redirect(signInUrl)// リダイレクトを実行
  //     )
  //   }
  // }
  // redirectSignin()


  // if (session === "loading") {
  //   return <p>Hang on there...</p>
  // }

  // if (session === "authenticated") {
  //   return (
  //     <>
  //       <p>Signed in as {userEmail}</p>
  //       <button onClick={() => signOut()}>Sign out</button>
  //       <img src="https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png" />
  //     </>
  //   )
  // }

  return (
    <>
      <UserProfile />
    </>
  )
}
