import Image from "next/image";
// import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import SessionTip from '@/app/components/SessionTip'
import { useSession, signIn, signOut } from "next-auth/react"
import { authOptions } from "@/lib/auth";
import SessionTip from "@/app/components/SessionTip";
import UserProfile from "@/app/components/UserProfile";


export default async function Home() {
  // サーバーセッション
  const session = await getServerSession(authOptions);

  const getUserList = async () => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json()
    return json.users
  }

  let userList = []
  if (session != null) {
    userList = await getUserList();
  }

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
      <SessionTip session={session} />
    </>
  )
}
