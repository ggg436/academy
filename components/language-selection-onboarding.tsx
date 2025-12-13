"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

const languages = [
  { 
    code: "en", 
    name: "English", 
    flag: "🇺🇸",
    learners: "49M learners",
    description: "Learn programming in English"
  },
  { 
    code: "ne", 
    name: "Nepali", 
    flag: "🇳🇵",
    learners: "12M learners",
    description: "नेपालीमा प्रोग्रामिङ सिक्नुहोस्"
  },
  { 
    code: "mai", 
    name: "Maithili", 
    flag: "🇮🇳",
    learners: "8M learners",
    description: "मैथिलीमा प्रोग्रामिङ सिक्नुहोस्"
  },
  { 
    code: "new", 
    name: "Newari", 
    flag: "🇳🇵",
    learners: "5M learners",
    description: "नेवारीमा प्रोग्रामिङ सिक्नुहोस्"
  },
];

export function LanguageSelectionOnboarding() {
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const { language, setLanguage } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('has-completed-language-selection');
    if (!hasCompletedOnboarding) {
      setShow(true);
      // Animate progress bar
      setTimeout(() => setProgress(33), 100);
    }
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage as any);
      localStorage.setItem('has-completed-language-selection', 'true');
      setProgress(100);
      setTimeout(() => {
        setShow(false);
      }, 300);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header with progress bar */}
      <div className="w-full px-6 pt-6 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => {
                localStorage.setItem('has-completed-language-selection', 'true');
                setShow(false);
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex-1">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Mascot with speech bubble */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="bg-white rounded-2xl p-4 shadow-xl mb-4 relative">
                  <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
                  <p className="text-lg font-semibold text-gray-800">
                    What would you like to learn?
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/mascot.svg"
                    alt="Gharti Academy Mascot"
                    width={120}
                    height={120}
                    className="animate-float"
                  />
                </div>
              </div>
            </div>

            {/* Language selection grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105 ${
                      selectedLanguage === lang.code
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-gray-300 bg-white hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-4xl">{lang.flag}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">
                          {lang.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {lang.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lang.learners}
                        </p>
                      </div>
                      {selectedLanguage === lang.code && (
                        <div className="text-green-500 text-xl">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="w-full px-6 pb-8">
        <div className="max-w-4xl mx-auto flex justify-end">
          <Button
            size="lg"
            variant="secondary"
            onClick={handleContinue}
            disabled={!selectedLanguage}
            className={`px-8 uppercase ${
              selectedLanguage 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

