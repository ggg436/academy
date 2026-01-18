"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuthModal } from "@/store/use-auth-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, X } from "lucide-react";
import { signIn } from "next-auth/react";
import { login, register, loginAsGuest } from "@/actions/auth";
import Link from "next/link";

export const AuthModal = () => {
  const { isOpen, mode, close, open } = useAuthModal();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Signup form state
  const [signupData, setSignupData] = useState({
    age: "",
    name: "",
    email: "",
    password: "",
  });

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Convert age to firstName/lastName for registration (using name field)
      const nameParts = signupData.name.trim().split(" ") || ["", ""];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "User";

      const result = await register({
        email: signupData.email,
        password: signupData.password,
        firstName,
        lastName,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        close();
        // Reset form
        setSignupData({ age: "", name: "", email: "", password: "" });
        // Refresh and redirect
        router.refresh();
        router.push("/learn");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login({
        email: loginData.email,
        password: loginData.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        close();
        // Reset form
        setLoginData({ email: "", password: "" });
        // Refresh and redirect
        router.refresh();
        router.push("/learn");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/learn" });
  };

  const handleGuestContinue = async () => {
    setIsLoading(true);
    try {
      await loginAsGuest();
      close();
      // Redirect to learn page (guest mode is already enabled in auth.config)
      router.push("/learn");
    } catch (err) {
      setError("Could not continue as guest");
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLogin = () => {
    open("login");
    setError("");
  };

  const switchToSignup = () => {
    open("signup");
    setError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-[500px] bg-white p-0 overflow-hidden rounded-lg border-0 shadow-2xl [&>button]:hidden">
        <div className="relative p-8">
          {/* Close button */}
          <button
            onClick={close}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-[#58CC02] text-lg font-semibold mb-2">
              Gharti Academy
            </h2>
            {mode === "signup" ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create your profile
                </h1>
                <p className="text-gray-600 text-sm">
                  Join thousands of learners mastering programming languages
                </p>
              </>
            ) : (
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Log In
              </h1>
            )}
          </div>

          {/* Forms */}
          {mode === "signup" ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Age"
                  value={signupData.age}
                  onChange={(e) =>
                    setSignupData({ ...signupData, age: e.target.value })
                  }
                  className="h-12 border-gray-300 rounded-lg"
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  placeholder="Name (optional)"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  className="h-12 border-gray-300 rounded-lg"
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  placeholder="Email or username"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  className="h-12 border-gray-300 rounded-lg"
                  disabled={isLoading}
                />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    className="h-12 border-gray-300 rounded-lg pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#58CC02] hover:bg-[#4db302] text-white font-semibold rounded-lg uppercase tracking-wide"
              >
                CREATE ACCOUNT
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Email or username"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="h-12 border-gray-300 rounded-lg"
                  disabled={isLoading}
                />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="h-12 border-gray-300 rounded-lg pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    FORGOT?
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#58CC02] hover:bg-[#4db302] text-white font-semibold rounded-lg uppercase tracking-wide"
              >
                LOG IN
              </Button>
            </form>
          )}

          {/* Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="default"
              className="w-full h-12 border-gray-300 rounded-lg flex items-center justify-center gap-2"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-900 font-semibold">GOOGLE</span>
              </div>
            </Button>
            <Button
              type="button"
              onClick={handleGuestContinue}
              disabled={isLoading}
              variant="default"
              className="w-full h-12 border-gray-300 rounded-lg flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5 text-[#58CC02]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-gray-900 font-semibold">
                CONTINUE AS GUEST
              </span>
            </Button>
          </div>

          {/* Sign in/Sign up link */}
          <div className="mt-6 text-center text-sm">
            {mode === "signup" ? (
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={switchToLogin}
                  className="text-blue-600 hover:underline font-medium"
                >
                  SIGN IN
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={switchToSignup}
                  className="text-blue-600 hover:underline font-medium"
                >
                  SIGN UP
                </button>
              </p>
            )}
          </div>

          {/* Legal text */}
          <div className="mt-6 text-xs text-gray-500 space-y-2">
            <p>
              By signing in to Gharti Academy, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              This site is protected by reCAPTCHA Enterprise and the{" "}
              <Link
                href="https://policies.google.com/privacy"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Google Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="https://policies.google.com/terms"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              apply.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
