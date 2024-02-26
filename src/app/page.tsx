import Image from "next/image";
// import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import SessionTip from '@/app/components/SessionTip'
import { useSession, signIn, signOut } from "next-auth/react"
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionTip from "./components/SessionTip";


export default async function Home() {
  // サーバーセッション
  const session = await getServerSession(authOptions);



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
