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

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Hydrate from Firestore settings or localStorage on client
  useEffect(() => {
    (async () => {
      try {
        const settings = await getUserSettings();
        if (settings?.language) {
          setLanguageState(settings.language as Language);
          localStorage.setItem("site-language", settings.language);
          return;
        }
      } catch {}
      try {
        const local = localStorage.getItem("site-language");
        if (local) setLanguageState(local as Language);
      } catch {}
    })();
  }, []);

  const setLanguage = (lang: Language) => {
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