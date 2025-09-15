"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthModal } from "@/store/use-auth-modal";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";

export const AuthModal = () => {
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { isOpen, mode, close, open } = useAuthModal();
  const { 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    signInAnonymously 
  } = useFirebaseAuth();

  useEffect(() => setIsClient(true), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await signInWithEmail(formData.email, formData.password);
      } else {
        await signUpWithEmail(formData.email, formData.password, formData.name);
      }
      close();
    } catch (error: any) {
      setError(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithGoogle();
      close();
    } catch (error: any) {
      setError(error.message || "Google authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousAuth = async () => {
    setLoading(true);
    setError("");

    try {
      await signInAnonymously();
      close();
    } catch (error: any) {
      setError(error.message || "Anonymous authentication failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <Image src="/mascot.svg" alt="Mascot" height={32} width={32} />
              <span className="text-lg font-bold text-green-600">Softcode</span>
            </div>
          </div>
          
          <DialogTitle className="text-center font-bold text-2xl text-gray-800">
            {mode === "login" ? "Log In" : "Create your profile"}
          </DialogTitle>
          
          {mode === "signup" && (
            <DialogDescription className="text-center text-sm text-gray-600">
              Join thousands of learners mastering programming languages
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === "signup" && (
              <>
                <Input
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
                
                <Input
                  type="text"
                  name="name"
                  placeholder="Name (optional)"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </>
            )}

            <Input
              type="email"
              name="email"
              placeholder="Email or username"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {mode === "login" && (
              <div className="text-right">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  FORGOT?
                </a>
              </div>
            )}

            <Button 
              type="submit" 
              size="lg"
              variant="secondary"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {mode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
            </Button>
          </form>

          <div className="flex items-center justify-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="space-y-3">
            <Button 
              variant="default" 
              className="w-full border-gray-300 hover:bg-gray-50"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="mr-2">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              GOOGLE
            </Button>

            <Button 
              variant="default" 
              className="w-full border-gray-300 hover:bg-gray-50"
              onClick={handleAnonymousAuth}
              disabled={loading}
            >
              <Image src="/mascot.svg" alt="Anonymous" width={20} height={20} className="mr-2" />
              Continue as Guest
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => open(mode === "login" ? "signup" : "login")}
              className="ml-1 p-0 h-auto font-medium text-blue-600 hover:text-blue-700 hover:bg-transparent"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>
              By signing in to Softcode, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms and Privacy Policy</a>.
            </p>
            <p>
              This site is protected by reCAPTCHA Enterprise and the{" "}
              <a href="#" className="text-blue-600 hover:underline">Google Privacy Policy</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> apply.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
