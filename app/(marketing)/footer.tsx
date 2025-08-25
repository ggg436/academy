import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-center gap-6 h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/html.svg" 
            alt="HTML" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          HTML
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/css.svg" 
            alt="CSS" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          CSS
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/javascript.svg" 
            alt="JavaScript" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          JavaScript
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/python.svg" 
            alt="Python" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Python
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/react.svg" 
            alt="React" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          React
        </Button>
      </div>
    </footer>
  );
};
