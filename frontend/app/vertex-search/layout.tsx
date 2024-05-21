import type { Metadata } from "next";
import { AI } from "./actions/action";
  
export const metadata: Metadata = {
  title: "Vertex AI Search App",
  description: "UI to configure and use Vertex AI Search",
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