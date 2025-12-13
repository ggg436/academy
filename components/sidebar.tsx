"use client";

import Link from "next/link";
import Image from "next/image";
import { FirebaseUserButton } from "@/components/firebase-user-button";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { memo } from "react";

type Props = {
  className?: string;
};

const SidebarComp = ({ className }: Props) => {
  return (
    <div className={cn(
      "hidden lg:flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn" prefetch={false}>
        <div className="pt-8 pb-7 flex items-center gap-x-3 -ml-2">
          <h1 className="text-3xl font-extrabold text-green-600 tracking-wide whitespace-nowrap">Gharti Academy</h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Learn"
          href="/learn"
          iconSrc="/learn.svg"
        />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem
          label="quests"
          href="/quests"
          iconSrc="/quests.svg"
        />
        <SidebarItem
          label="shop"
          href="/shop"
          iconSrc="/shop.svg"
        />
        <SidebarItem
          label="Shop Redeem"
          href="/shop-redeem"
          iconSrc="/shop.svg"
        />
        <SidebarItem
          label="quizes"
          href="/quizes"
          iconSrc="/quests.svg"
        />
        <SidebarItem
          label="games"
          href="/games"
          iconSrc="/games.svg"
        />
        <SidebarItem
          label="videos"
          href="/videos"
          iconSrc="/video.svg"
        />
        <SidebarItem
          label="feeds"
          href="/feeds"
          iconSrc="/learn.svg"
        />
      </div>
      <div className="p-4 pt-2 mb-6">
        <FirebaseUserButton />
      </div>
    </div>
  );
};

export const Sidebar = memo(SidebarComp);
