"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader, ChevronDown, Menu, X, BookOpen, Gamepad2, Trophy, ShoppingBag, Target, Rss, GraduationCap, Code, Video, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import { useTeamModal } from "@/store/use-team-modal";
import Link from "next/link";
import { logout } from "@/actions/auth";
import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { UserButton } from "@/components/auth/user-button";

// Auth Buttons Component to handle conditional rendering
const AuthButtons = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        <UserButton />
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-3">
      <Button
        size="sm"
        variant="secondary"
        className="px-5 relative overflow-hidden animate-air-flow"
        asChild
      >
        <Link href="/learn">
          <span className="relative z-10">GET STARTED - IT'S FREE</span>
        </Link>
      </Button>
    </div>
  );
};
export const Header = ({ courses = [] }: { courses?: any[] }) => {
  const { open: openTeam } = useTeamModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { href: "/learn", label: "Learn", icon: GraduationCap },
    { href: "/games", label: "Games", icon: Gamepad2 },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/quests", label: "Quests", icon: Target },
    { href: "/feeds", label: "Feeds", icon: Rss },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] h-20 w-full px-4 sm:px-6 transition-shadow duration-300 bg-white ${scrolled ? 'shadow-md' : 'border-b border-slate-200'
        }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-full relative w-full">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Logo />
        </Link>

        {/* Center Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-6">
          {/* Courses Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900 font-medium transition-colors outline-none focus:outline-none focus-visible:outline-none"
                type="button"
              >
                Courses
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Available Courses</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/courses">
                <DropdownMenuItem className="cursor-pointer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  All Courses
                </DropdownMenuItem>
              </Link>
              {courses.map((course) => (
                <Link key={course.id} href={`/${course.id}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Code className="mr-2 h-4 w-4" />
                    {course.title}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Learn Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900 font-medium transition-colors outline-none focus:outline-none focus-visible:outline-none"
                type="button"
              >
                Learn
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Learning Resources</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/learn">
                <DropdownMenuItem className="cursor-pointer">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Start Learning
                </DropdownMenuItem>
              </Link>
              <Link href="/courses">
                <DropdownMenuItem className="cursor-pointer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Courses
                </DropdownMenuItem>
              </Link>
              <Link href="/videos">
                <DropdownMenuItem className="cursor-pointer">
                  <Video className="mr-2 h-4 w-4" />
                  Video Tutorials
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Direct Links */}
          <Link href="/games" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors">
            Games
          </Link>
          <Link href="/leaderboard" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors">
            Leaderboard
          </Link>
          <Link href="/team" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors">
            Our Team
          </Link>

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900 font-medium transition-colors outline-none focus:outline-none focus-visible:outline-none"
                type="button"
              >
                Resources
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Resources</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/shop">
                <DropdownMenuItem className="cursor-pointer">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop
                </DropdownMenuItem>
              </Link>
              <Link href="/quests">
                <DropdownMenuItem className="cursor-pointer">
                  <Target className="mr-2 h-4 w-4" />
                  Quests
                </DropdownMenuItem>
              </Link>
              <Link href="/feeds">
                <DropdownMenuItem className="cursor-pointer">
                  <Rss className="mr-2 h-4 w-4" />
                  Community Feeds
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/quizes">
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  Quizzes
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>

          <AuthButtons />

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 outline-none focus:outline-none focus-visible:outline-none"
                type="button"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {/* Mobile Language Selector */}
                <div className="sm:hidden">
                  <LanguageSelector />
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-2">
                  <div className="space-y-1">
                    <p className="px-2 text-sm font-semibold text-neutral-500">Courses</p>
                    <Link href="/courses" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-neutral-100 transition-colors">
                        <BookOpen className="h-4 w-4" />
                        <span>All Courses</span>
                      </div>
                    </Link>
                    {courses.map((course) => (
                      <Link key={course.id} href={`/${course.id}`} onClick={() => setMobileMenuOpen(false)}>
                        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-neutral-100 transition-colors">
                          <Code className="h-4 w-4" />
                          <span>{course.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1 pt-2">
                    <p className="px-2 text-sm font-semibold text-neutral-500">Learn</p>
                    {[
                      { href: "/learn", label: "Start Learning", icon: GraduationCap },
                      { href: "/courses", label: "Browse Courses", icon: BookOpen },
                      { href: "/videos", label: "Video Tutorials", icon: Video },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-neutral-100 transition-colors">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1 pt-2">
                    <p className="px-2 text-sm font-semibold text-neutral-500">Resources</p>
                    {navigationLinks.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-neutral-100 transition-colors">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    ))}
                    <Link href="/quizes" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-neutral-100 transition-colors">
                        <FileText className="h-4 w-4" />
                        <span>Quizzes</span>
                      </div>
                    </Link>
                    <Link href="/team" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-neutral-100 transition-colors">
                        <Users className="h-4 w-4" />
                        <span>Our Team</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t">
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full relative overflow-hidden animate-air-flow"
                      asChild
                    >
                      <Link href="/learn">
                        <span className="relative z-10">GET STARTED - IT'S FREE.</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
