"use client";
import React from "react";

type Props = {
  language: string; // e.g., "c", "cpp", "python"
  height?: number;
};

// Renders OneCompiler embedded editor via iframe. Reference: https://onecompiler.com/
export default function OneCompilerEmbed({ language, height = 560 }: Props) {
  // Basic embed URL. If OneCompiler supports additional query params (theme, hide UI), they can be appended here.
  const src = `https://onecompiler.com/embed/${encodeURIComponent(language)}`;

  return (
    <div className="w-full border-2 border-b-4 rounded-xl overflow-hidden bg-white">
      <iframe
        title={`OneCompiler ${language} playground`}
        src={src}
        className="w-full"
        style={{ height }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
} 