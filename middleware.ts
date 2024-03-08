// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log("req.nextauth.token", req.nextauth.token)

//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//   }
// )
// export const config = {
//   matcher: [
//     "/test",              // ルートパスを含める
//     "/((?!signin).*)" // '/signin' 以外のすべてのパスを含める
//   ],
// };


// export { default } from "next-auth/middleware";

// // const signInPage = options?.pages?.signIn ?? "/signin"
// export const config = {
//   matcher: [
//     "/",
//     "/((?!signin).*)"
//   ],
// };

// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const { pathname } = req.nextUrl;

//   // サインインページとAPIルートはスキップ
//   if (pathname.includes('/api') || pathname === '/signin') {
//     return NextResponse.next();
//   }
//   console.log("middleware⭐️", token)
//   // トークンがない場合はサインインページにリダイレクト
//   if (!token) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/signin';
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }


import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextApiResponse, NextApiRequest } from 'next';
import NextAuth, { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);


  if (!session) {
    // セッションが存在しない場合、サインインページにリダイレクト
    console.log("se⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️ssion情報⭐️", session)
    const signInUrl = `${process.env.NEXTAUTH_URL}/signin`; // リダイレクト先のURLを構築
    return NextResponse.redirect(signInUrl); // リダイレクトを実行
  }

  //   // セッションが存在する場合、NextAuthのハンドラーを実行
  return NextAuth(req, res, authOptions);
}