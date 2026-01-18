"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";

interface GetStartedButtonProps {
  size?: "sm" | "lg";
}

export const GetStartedButton = ({ text = "Get Started", className }: { text?: string, className?: string }) => {
  return (
    <Button size="lg" variant="secondary" className={className} asChild>
      <Link href="/learn">
        {text}
      </Link>
    </Button>
  );
}
