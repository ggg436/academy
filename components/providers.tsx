"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/language-context";
import { SettingsProvider } from "@/contexts/settings-context";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { AuthModal } from "@/components/modals/auth-modal";
import { SaveProgressModal } from "@/components/modals/save-progress-modal";
import { SaveProgressPrompt } from "@/components/save-progress-prompt";
import Chatbot from "@/components/chatbot";

import { TextSelectionProvider } from "@/hooks/use-text-selection";
import { TextSelectionInstructions } from "@/components/text-selection-instructions";
import { LanguageSelector } from "@/components/language-selector";
import { TeamPopup } from "@/components/modals/team-popup";

import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

interface ProvidersProps {
  children: ReactNode;
  session?: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <LanguageProvider>
        <SettingsProvider>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          <AuthModal />
          <SaveProgressModal />
          <SaveProgressPrompt />
          <TextSelectionProvider>
            {children}
          </TextSelectionProvider>
          <Chatbot />
          <TextSelectionInstructions />
          <TeamPopup />
          {/* Mobile floating language selector above help button */}
          <div className="fixed bottom-20 left-5 z-40 lg:hidden">
            <LanguageSelector />
          </div>
        </SettingsProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}
