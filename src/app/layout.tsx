import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import Providers from "@/components/Providers";
import {Toaster} from "react-hot-toast";

const inter = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocuAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ClerkProvider>
          <Providers>
              <html lang="en">
                  <body className={inter.className}>{children}</body>
                  <Toaster/>
              </html>
          </Providers>
      </ClerkProvider>
  );
}
