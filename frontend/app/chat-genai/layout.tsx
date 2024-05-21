import type { Metadata } from "next";
import { AI } from './actions/action'
  
export const metadata: Metadata = {
  title: "AI Assistant",
  description: "UI to configure and use AI assistants",
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <AI>
          {children}
        </AI>
    </>
  );
}