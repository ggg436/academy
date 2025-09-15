"use client";

import Image from "next/image";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { GetStartedButton } from "@/components/get-started-button";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthModal } from "@/store/use-auth-modal";
import { Testimonials } from "@/components/testimonials";
import { useLanguage } from "@/contexts/language-context";
import { Footer } from "./footer";

const strings: Record<string, { heroTitle: string; continue: string; getStarted: string } > = {
  en: {
    heroTitle: "Learn, practice, and master new languages with Softcode.",
    continue: "Continue Learning",
    getStarted: "Get Started",
  },
  ne: {
    heroTitle: "Softcode संग सिक्नुहोस्, अभ्यास गर्नुहोस् र नयाँ भाषामा निपूर्ण बन्नुहोस्।",
    continue: "पढाइ जारी राख्नुहोस्",
    getStarted: "सुरु गर्नुहोस्",
  },
  mai: {
    heroTitle: "Softcode सँग सिखू, अभ्यास करू आ नयका भासमे निपुण बनू।",
    continue: "पढ़ाई जारी रखू",
    getStarted: "शुरू करू",
  },
  new: {
    heroTitle: "Softcode सँग सिक, अभ्यास गर, नयां भाषाम निपुण बनौं।",
    continue: "अध्ययन आगाडि बढ़ाऔं",
    getStarted: "सुरु गरौं",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = strings[language] || strings.en;

  return (
    <>
      {/* Hero Section */}
      <div className="max-w-[988px] mx-auto w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2 min-h-[80vh]">
        <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
          <Image src="/hero.svg" fill alt="Hero" />
        </div>
        <div className="flex flex-col items-center gap-y-8">
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
            {t.heroTitle}
          </h1>
          <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
            <FirebaseAuthWrapper continueLabel={t.continue} getStartedLabel={t.getStarted} />
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <Testimonials />

      {/* Landing-only Footer */}
      <Footer />
    </>
  );
}

function FirebaseAuthWrapper({ continueLabel, getStartedLabel }: { continueLabel: string; getStartedLabel: string }) {
  const { user, loading } = useFirebaseAuth();
  const { open } = useAuthModal();

  if (loading) {
    return (
      <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
    );
  }

  if (user) {
    return (
      <Button size="lg" variant="secondary" className="w-full" asChild>
        <Link href="/learn">
          {continueLabel}
        </Link>
      </Button>
    );
  }

  return (
    <Button 
      size="lg" 
      variant="secondary" 
      className="w-full"
      onClick={() => open("signup")}
    >
      {getStartedLabel}
    </Button>
  );
}
