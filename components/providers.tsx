"use client";

import { ReactNode } from "react";
import { FirebaseAuthProvider } from "@/contexts/firebase-auth-context";
import { LanguageProvider } from "@/contexts/language-context";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import Chatbot from "@/components/chatbot";
import FirebaseAnalytics from "@/components/firebase-analytics";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <FirebaseAuthProvider>
      <LanguageProvider>
        <Toaster />
        <ExitModal />
        <HeartsModal />
        <PracticeModal />
        {children}
        <Chatbot />
        <FirebaseAnalytics />
      </LanguageProvider>
    </FirebaseAuthProvider>
  );
} 