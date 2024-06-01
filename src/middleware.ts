// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {

//     // トークンがない場合はサインインページにリダイレクト
//     if (!req.nextauth.token) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/signin";
//       return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         // トークンが存在する場合は認証済みとみなす
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/",              // ルートパスを含める
//     "/((?!signin|api|_next/static|_next/image|favicon.ico).*)", // '/signin' とデータフェッチ用のapiなどは除外する
//   ],
// };



import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    console.log("req.nextauth.token", req.nextauth.token);

    if (!req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Authorized token:", token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",              // ルートパスを含める
    "/((?!signin|api|_next/static|_next/image|favicon.ico).*)", // '/signin' とデータフェッチ用のapiなどは除外する
  ],
};
