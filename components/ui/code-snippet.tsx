"use client";

import { useState } from "react";

function base64EncodeUtf8(input: string): string {
  try {
    const bytes = new TextEncoder().encode(input);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  } catch {
    // Fallback
    return btoa(unescape(encodeURIComponent(input)));
  }
}

type Props = {
  code: string;
  language?: string; // e.g., "python", "output"
  title?: string; // optional header label
  isOutput?: boolean; // render as output style
  className?: string;
  onRun?: (code: string) => void; // optional run handler
  hideHeader?: boolean; // optionally hide the header (useful when an external "Output:" label exists)
};

export const CodeSnippet = ({ code, language = "python", title, isOutput = false, className, onRun, hideHeader = false }: Props) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const buildRunnerHref = () => {
    const lang = (language || "python").toLowerCase();
    const encoded = encodeURIComponent(base64EncodeUtf8(code));
    return `/runner?lang=${lang}&code=${encoded}`;
  };

  const handleRun = () => {
    if (onRun) {
      onRun(code);
      return;
    }
    window.open(buildRunnerHref(), "_blank", "noopener,noreferrer");
  };

  const handleOpenNewTab = () => {
    window.open(buildRunnerHref(), "_blank", "noopener,noreferrer");
  };

  const headerClass = "flex items-center justify-between px-3 py-2 bg-gray-100 text-neutral-800 border-b border-gray-200";
  const containerClass = "mb-3 rounded-lg overflow-hidden border border-gray-200 shadow-sm " + (className || "");
  const langPillClass = "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/70 border border-neutral-300 text-neutral-700";
  const copyBtnClass = "text-[11px] px-2 py-1 rounded border border-neutral-300 text-neutral-700 hover:bg-white active:scale-[.98] transition";
  const codeClass = "m-0 p-4 text-sm leading-relaxed overflow-x-auto bg-white text-neutral-700 font-sans";

  return (
    <div className={containerClass}> 
      {!hideHeader && (
        <div className={headerClass}>
          <div className="flex items-center gap-2">
            <span className={langPillClass}>{isOutput ? "output" : language}</span>
            {title && <span className="text-xs text-neutral-700">{title}</span>}
          </div>
          {!isOutput && (
            <div className="flex items-center gap-2">
              <button onClick={handleOpenNewTab} className={copyBtnClass} aria-label="Open in new tab">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </button>
              <button onClick={handleRun} className={copyBtnClass} aria-label="Run snippet">
                ▶ Run
              </button>
              <button onClick={onCopy} className={copyBtnClass} aria-label="Copy code">
                {copied ? "Copied" : "Copy code"}
              </button>
            </div>
          )}
        </div>
      )}
      <pre className={codeClass}> 
        <code>{code}</code>
      </pre>
    </div>
  );
}; 