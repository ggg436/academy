"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  initialHtml: string;
  height?: number;
};

export default function HtmlRunner({ initialHtml, height = 520 }: Props) {
  const [html, setHtml] = useState<string>(initialHtml);
  const [srcDoc, setSrcDoc] = useState<string>(wrapDoc(initialHtml));

  const run = () => {
    setSrcDoc(wrapDoc(html));
  };

  const reset = () => {
    setHtml(initialHtml);
    setSrcDoc(wrapDoc(initialHtml));
  };

  // Allow Ctrl+Enter to run
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "enter") {
        e.preventDefault();
        run();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [html]);

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div className="flex-1 border-2 border-b-4 rounded-xl overflow-hidden">
          <div className="px-3 py-2 bg-slate-50 border-b text-xs font-bold tracking-wide text-slate-500">
            HTML
          </div>
          <textarea
            className="w-full h-full min-h[200px] font-mono text-sm p-3 outline-none resize-vertical"
            style={{ height }}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
        </div>
        <div className="flex-1 border-2 border-b-4 rounded-xl overflow-hidden">
          <div className="px-3 py-2 bg-slate-50 border-b text-xs font-bold tracking-wide text-slate-500">
            Preview
          </div>
          <iframe
            title="HTML Preview"
            className="w-full bg-white"
            style={{ height }}
            sandbox="allow-scripts"
            srcDoc={srcDoc}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2 justify-end">
        <Button variant="secondaryOutline" type="button" onClick={reset}>
          Reset
        </Button>
        <Button variant="secondary" type="button" onClick={run}>
          Run
        </Button>
      </div>
    </div>
  );
}

function wrapDoc(inner: string) {
  return `<!doctype html>\n<html>\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<title>Preview</title>\n<style>body{font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif;padding:16px;}</style>\n</head>\n<body>\n${inner}\n</body>\n</html>`;
} 