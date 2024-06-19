import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "./api/auth";
import HeadBar from "@/app/head-bar/HeadBar";
import LoginGoogle from "./head-bar/Login";
import "./globals.css";
import SignInMessage from './components/base-ui/SignInMessage';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Designed for CE',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
            <SessionProvider session={session}>
                <HeadBar hideMenu={!session}>
                    <LoginGoogle />
                </HeadBar>
                {session &&
                    <> {children} </>
                }
                {!session &&
                    <SignInMessage callbackUrl={"/"}/>
                }
            </SessionProvider>
      </body>
    </html>
  );
}
