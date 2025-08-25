import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { LanguageProvider } from "@/contexts/language-context";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Softcode",
  description: "Softcode – Learn, practice, and master web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <LanguageProvider>
            <Toaster />
            <ExitModal />
            <HeartsModal />
            <PracticeModal />
            {children}
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
