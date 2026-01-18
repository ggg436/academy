import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gharti Academy",
  description: "Gharti Academy – Learn, practice, and master web development.",
};

import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={font.className}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
