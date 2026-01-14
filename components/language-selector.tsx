"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

const languages = [
  { code: "en", name: "English", flagClass: "fi fi-us" },
  { code: "ne", name: "Nepali", flagClass: "fi fi-np" },
];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const selectedLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode as any);
    setIsOpen(false);
    console.log(`Language changed to: ${languageCode}`);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 normal-case"
      >
        <span 
          className={`${selectedLanguage.flagClass} text-base`}
          role="img"
          aria-label={`${selectedLanguage.name} flag`}
        />
        <span className="normal-case">{selectedLanguage.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 normal-case ${
                  selectedLanguage.code === language.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
                }`}
              >
                <span 
                  className={`${language.flagClass} text-lg`}
                  role="img"
                  aria-label={`${language.name} flag`}
                />
                <span className="normal-case">{language.name}</span>
                {selectedLanguage.code === language.code && (
                  <span className="ml-auto text-green-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 
