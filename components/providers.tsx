"use client";

import { ReactNode } from "react";
import { FirebaseAuthProvider } from "@/contexts/firebase-auth-context";
import { LanguageProvider } from "@/contexts/language-context";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { AuthModal } from "@/components/modals/auth-modal";
import Chatbot from "@/components/chatbot";
import FirebaseAnalytics from "@/components/firebase-analytics";
import { TextSelectionProvider } from "@/hooks/use-text-selection";
import { TextSelectionInstructions } from "@/components/text-selection-instructions";
import { LanguageSelector } from "@/components/language-selector";

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
        <AuthModal />
        <TextSelectionProvider>
          {children}
        </TextSelectionProvider>
        <Chatbot />
        <FirebaseAnalytics />
        <TextSelectionInstructions />
        {/* Mobile floating language selector above help button */}
        <div className="fixed bottom-20 left-5 z-40 lg:hidden">
          <LanguageSelector />
        </div>
      </LanguageProvider>
    </FirebaseAuthProvider>
  );
}
