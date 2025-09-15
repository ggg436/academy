"use client";
import Link from "next/link";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

type Props = {
  title: string;
  description: string;
  unitOrder?: number;
};

export const UnitBanner = ({
  title,
  description,
  unitOrder = 1,
}: Props) => {
  const { language } = useLanguage();
  const continueText = language === "ne" ? "जारी राख्नुहोस्" : language === "mai" ? "जारी रखू" : language === "new" ? "आगाडि बढाऔं" : "Continue";

  return (
    <div className="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">
          {title}
        </h3>
        <p className="text-lg">
          {description}
        </p>
      </div>
      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden xl:flex border-2 border-b-4 active:border-b-2"
        >
          <NotebookText className="mr-2" />
          {continueText}
        </Button>
      </Link>
    </div>
  );
};
