"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getUserSettings, updateUserSettings } from "@/actions/user-settings";

export type Language = "en" | "ne" | "mai" | "new";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const VALID_LANGUAGES: Language[] = ["en", "ne", "mai", "new"];

const isValidLanguage = (lang: string | null | undefined): lang is Language => {
  return lang !== null && lang !== undefined && VALID_LANGUAGES.includes(lang as Language);
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Hydrate from Firestore settings or localStorage on client
  useEffect(() => {
    (async () => {
      try {
        const settings = await getUserSettings();
        if (settings?.language && isValidLanguage(settings.language)) {
          setLanguageState(settings.language);
          localStorage.setItem("site-language", settings.language);
          return;
        }
      } catch (error) {
        // Silently handle authentication errors - user is not signed in
        console.log("User not authenticated, using localStorage fallback");
      }
      try {
        const local = localStorage.getItem("site-language");
        if (local && isValidLanguage(local)) {
          setLanguageState(local);
        }
      } catch {}
    })();
  }, []);

  const setLanguage = (lang: Language) => {
    // Validate language before setting
    if (!isValidLanguage(lang)) {
      console.warn(`Invalid language: ${lang}, defaulting to "en"`);
      lang = "en";
    }
    setLanguageState(lang);
    try { localStorage.setItem("site-language", lang); } catch {}
    updateUserSettings({ language: lang }).catch(() => {});
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
