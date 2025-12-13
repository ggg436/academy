import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gharti Academy",
  description: "Gharti Academy – Learn, practice, and master web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
