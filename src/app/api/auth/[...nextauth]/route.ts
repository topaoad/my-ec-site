import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import SlackProvider from 'next-auth/providers/slack';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // これがあるとエラーになる 原因調査中（2024/2/26）
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID ?? '',
      clientSecret: process.env.LINE_CLIENT_SECRET ?? '',
    }),
    // SlackProvider({
    //   clientId: process.env.SLACK_CLIENT_ID ?? '',
    //   clientSecret: process.env.SLACK_CLIENT_SECRET ?? '',
    // }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        // ユーザーIDをセッションに追加
        console.log("session情報⭐️", session)
      }
      return session;
    },
    // サインイン関数実行時にコールバックされる
    async signIn({ user, account }) {
      // Userテーブルにユーザー情報を格納
      console.log("user情報⭐️", user)
      console.log("account情報⭐️", account)

      const userData = {
        email: user.email,
        name: user.name,
        image: user.image,
      };

      // Userテーブルにデータを格納※メールアドレスが取得できる場合のみ
      if (user.email) {
        const createdUser = await prisma.user.upsert({
          where: { email: user.email },
          create: userData,
          update: userData,
        });

        // Accountテーブルにアカウント情報を格納
        if (account && account.providerAccountId) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            create: {
              userId: createdUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
            update: {
              userId: createdUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });
        }
      }
      return true;
    },

  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
