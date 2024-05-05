import { PrismaClient, Prisma, User } from "@prisma/client"
import { NextResponse } from "next/server"

//インスタンスを作成
const prisma = new PrismaClient()

// データベースに接続する関数　不要なようなので省略
// export const connect = async () => {
//   try {
//     //prismaでデータベースに接続
//     prisma.$connect();
//   } catch (error) {
//     return Error("DB接続失敗しました")
//   }
// }

// ユーザーデータを取得する関数
export const getUsers = async () => {
  // ユーザー情報のみを取得
  const users: User[] = await prisma.user.findMany()

  return users
}

// ユーザー情報とそのプロファイル情報を取得する
export const GET = async (req: Request) => {
  try {
    // await connect();
    // ユーザー情報と紐づくプロファイル情報を取得
    const users = await getUsers()

    console.log(users)
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 })
  } finally {
    //$disconnectは推奨されているので実行する
    await prisma.$disconnect()
  }
}
