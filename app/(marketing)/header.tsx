"use client";

import Image from "next/image";
import { Loader } from "lucide-react";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { FirebaseUserButton } from "@/components/firebase-user-button";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import { useAuthModal } from "@/store/use-auth-modal";

export const Header = () => {
  const { user, loading } = useFirebaseAuth();
  const { open } = useAuthModal();
  
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Softcode
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          {loading ? (
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          ) : user ? (
            <FirebaseUserButton />
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => open("login")}
              >
                Sign In
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => open("signup")}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
