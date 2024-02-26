import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from '@/providers/NextAuth'
import { Suspense } from "react";
import UserProfile from "@/app/components/UserProfile";
import JotaiProvider from "@/app/components/JotaiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <JotaiProvider>
            <UserProfile />
            {/* <Header /> */}
            <Suspense fallback={<div >loading...</div>}>{children}</Suspense>
          </JotaiProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
