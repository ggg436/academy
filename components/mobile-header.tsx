import Link from "next/link";
import Image from "next/image";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-green-500 border-b fixed top-0 w-full z-50">
      <Link href="/learn" className="flex items-center gap-x-2">
        <Image src="/mascot.svg" height={24} width={24} alt="Mascot" />
        <span className="text-white font-bold text-lg">Softcode</span>
      </Link>
    </nav>
  );
};
