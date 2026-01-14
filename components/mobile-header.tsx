import Link from "next/link";
import { Logo } from "./logo";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-green-500 border-b fixed top-0 w-full z-50">
      <Link href="/learn" className="flex items-center gap-x-2">
        <Logo variant="white" className="text-xl" />
      </Link>
    </nav>
  );
};
