"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSaveProgressModal } from "@/store/use-save-progress-modal";
import { useAuthModal } from "@/store/use-auth-modal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const SaveProgressModal = () => {
  const { isOpen, close } = useSaveProgressModal();
  const { open: openAuthModal } = useAuthModal();

  const handleLogin = () => {
    close();
    openAuthModal("login");
  };

  const handleSignup = () => {
    close();
    openAuthModal("signup");
  };

  const handleLater = () => {
    // Store in localStorage that user dismissed the modal
    if (typeof window !== "undefined") {
      localStorage.setItem("saveProgressModalDismissed", "true");
    }
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-[500px] bg-white p-0 overflow-hidden rounded-lg border-0 shadow-2xl [&>button]:hidden">
        <div className="relative p-8">
          {/* Close button */}
          <button
            onClick={handleLater}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-[#58CC02] text-lg font-semibold mb-2">
              Gharti Academy
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Save Your Progress
            </h1>
            <p className="text-gray-600 text-sm">
              Login or sign up to save your learning progress and continue where you left off across all your devices.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSignup}
              className="w-full h-12 bg-[#58CC02] hover:bg-[#4db302] text-white font-semibold rounded-lg uppercase tracking-wide"
            >
              SIGN UP - IT'S FREE
            </Button>
            <Button
              onClick={handleLogin}
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 rounded-lg font-semibold"
            >
              LOG IN
            </Button>
            <Button
              onClick={handleLater}
              variant="ghost"
              className="w-full h-12 text-gray-600 hover:text-gray-900 font-medium rounded-lg"
            >
              I'll do it later
            </Button>
          </div>

          {/* Info text */}
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>
              Your progress will be saved locally, but won't sync across devices without an account.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
