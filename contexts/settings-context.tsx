"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useLanguage } from "./language-context";
import { getUserSettings, updateUserSettings } from "@/actions/user-settings";

interface Settings {
  notifications: boolean;
  emailNotifications: boolean;
  soundEnabled: boolean;
  darkMode: boolean;
  language: string;
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: (key: keyof Settings, value: any) => Promise<void>;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings: Settings = {
  notifications: true,
  emailNotifications: true,
  soundEnabled: true,
  darkMode: false,
  language: "en",
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Guest mode: assume user is always "present" as guest
  const user = { id: "guest" };
  const { language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Try to load from server
        const serverSettings = await getUserSettings();
        if (serverSettings) {
          const merged = { ...defaultSettings, ...serverSettings, language: serverSettings.language || language };
          setSettings(merged);
          setLanguage(merged.language as any);
          localStorage.setItem("user-settings", JSON.stringify(merged));
        } else {
          // Fallback to localStorage
          const saved = localStorage.getItem("user-settings");
          if (saved) {
            const parsed = JSON.parse(saved);
            setSettings({ ...defaultSettings, ...parsed, language: parsed.language || language });
          } else {
            setSettings({ ...defaultSettings, language });
          }
        }
      } catch (error) {
        // Fallback to localStorage
        try {
          const saved = localStorage.getItem("user-settings");
          if (saved) {
            const parsed = JSON.parse(saved);
            setSettings({ ...defaultSettings, ...parsed, language: parsed.language || language });
          }
        } catch { }
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [language, setLanguage]);

  // Apply dark mode
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  const updateSetting = async (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    // Save to localStorage immediately
    localStorage.setItem("user-settings", JSON.stringify(newSettings));

    // Special handling for language
    if (key === "language") {
      setLanguage(value as any);
    }

    // Try to save to server
    try {
      await updateUserSettings(newSettings);
    } catch (error) {
      console.error("Failed to save settings to server:", error);
    }
  };


  const updateSettings = async (newSettings: Partial<Settings>) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);

    // Save to localStorage immediately
    localStorage.setItem("user-settings", JSON.stringify(merged));

    // Special handling for language
    if (newSettings.language) {
      setLanguage(newSettings.language as any);
    }

    // Try to save to server
    try {
      await updateUserSettings(merged);
    } catch (error) {
      console.error("Failed to save settings to server:", error);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

