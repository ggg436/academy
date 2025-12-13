"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  language: string; // e.g., "c", "cpp", "python"
  height?: number;
  initialCode?: string;
};

// Renders OneCompiler embedded editor via iframe. Reference: https://onecompiler.com/
export default function OneCompilerEmbed({ language, height = 560, initialCode }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const params = new URLSearchParams();
  // Enable message APIs so we can seed code
  params.set("theme", "light");
  params.set("hideLanguageSelection", "true");
  params.set("listenToEvents", "true");
  params.set("codeChangeEvent", "true");

  const query = params.toString();
  const src = `https://onecompiler.com/embed/${encodeURIComponent(language)}${query ? `?${query}` : ""}`;

  useEffect(() => {
    if (!initialCode) return;
    const frame = frameRef.current;
    if (!frame) return;

    const starter = {
      eventType: "populateCode",
      language,
      files: [
        {
          name: language === "python" ? "main.py" : language === "c" ? "main.c" : "main.txt",
          content: initialCode,
        },
      ],
    } as const;

    const handleLoad = () => {
      frame.contentWindow?.postMessage(starter, "*");
    };

    frame.addEventListener("load", handleLoad);
    // If already loaded, still try to post
    if (frame.contentDocument?.readyState === "complete") {
      handleLoad();
    }

    return () => frame.removeEventListener("load", handleLoad);
  }, [initialCode, language]);

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
      <iframe
        ref={frameRef}
        title={`OneCompiler ${language} playground`}
        src={src}
        className="w-full"
        style={{ height }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
} 
