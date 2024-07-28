import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";

const inter = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocuAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
      </ClerkProvider>

  );
}
