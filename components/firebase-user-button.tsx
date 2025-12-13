"use client";
import { useState, useRef, useEffect } from "react";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings, CreditCard, BookOpen, Trophy } from "lucide-react";
import Link from "next/link";

export function FirebaseUserButton() {
  const { user, signOut } = useFirebaseAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
  };

  const getInitials = (displayName: string | null) => {
    if (!displayName) return "U";
    return displayName
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 rounded-full p-0"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
          <AvatarFallback className="bg-green-100 text-green-600 text-xs font-semibold">
            {getInitials(user.displayName)}
          </AvatarFallback>
        </Avatar>
      </Button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user.displayName || "User"}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          
          {/* Menu Items */}
          <div className="py-1">
            <Link href="/learn" onClick={() => setShowDropdown(false)}>
              <div className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
                <BookOpen className="h-4 w-4" />
                My Learning
              </div>
            </Link>
            
            <Link href="/leaderboard" onClick={() => setShowDropdown(false)}>
              <div className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
                <Trophy className="h-4 w-4" />
                Leaderboard
              </div>
            </Link>
            
            <Link href="/shop" onClick={() => setShowDropdown(false)}>
              <div className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                Shop
              </div>
            </Link>
            
            <div className="border-t border-gray-100 my-1"></div>
            
            <Link href="/settings" onClick={() => setShowDropdown(false)}>
              <div className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
                <Settings className="h-4 w-4" />
                Settings
              </div>
            </Link>
            
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
