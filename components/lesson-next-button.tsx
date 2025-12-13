"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type LessonNextButtonProps = {
  href?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function LessonNextButton({ href, label, onClick, disabled, className }: LessonNextButtonProps) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className || ""}`}>
      {href ? (
        <Button variant="secondary" size="lg" className="px-6" asChild>
          <Link href={href} prefetch={false}>{label}</Link>
        </Button>
      ) : (
        <Button variant="secondary" size="lg" className="px-6" onClick={onClick} disabled={disabled}>
          {label}
        </Button>
      )}
    </div>
  );
}
