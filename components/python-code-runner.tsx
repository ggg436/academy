"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  initialCode: string;
  height?: number;
  fontSizePx?: number;
};

function base64EncodeUtf8(input: string): string {
  try {
    const bytes = new TextEncoder().encode(input);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  } catch {
    return btoa(unescape(encodeURIComponent(input)));
  }
}

export default function PythonCodeRunner({ initialCode, height = 560, fontSizePx }: Props) {
  const [code, setCode] = useState<string>(initialCode);
  const [stdinText, setStdinText] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    setCode(initialCode);
    setOutput("");
  }, [initialCode]);

  const run = async () => {
    try {
      setIsRunning(true);
      setOutput("⚡ Running your code...");
      // Judge0 CE public endpoint for Python 3 (language_id: 71)
      const createRes = await fetch("https://ce.judge0.com/submissions?base64_encoded=true&wait=false", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: base64EncodeUtf8(code),
          language_id: 71,
          stdin: base64EncodeUtf8(stdinText || ""),
        }),
      });
      const createData = await createRes.json();
      const token = createData.token as string;

      // Poll for the result
      let result: any = null;
      for (let i = 0; i < 30; i++) {
        const res = await fetch(`https://ce.judge0.com/submissions/${token}?base64_encoded=true`);
        result = await res.json();
        if (result.status && result.status.id >= 3) break; // 1: In Queue, 2: Processing
        await new Promise(r => setTimeout(r, 700));
      }

      const decode = (s?: string | null) => (s ? atob(s) : "");
      const out = [decode(result.compile_output), decode(result.stdout), decode(result.stderr)]
        .filter(Boolean)
        .join("\n");
      setOutput(out || "✨ Program completed successfully (no output)");
    } catch (e: any) {
      setOutput(`❌ Run failed: ${e?.message || e}`);
    } finally {
      setIsRunning(false);
    }
  };

  const reset = () => {
    setCode(initialCode);
    setStdinText("");
    setOutput("");
  };

  const openInNewTab = () => {
    const href = `/runner?lang=python&code=${encodeURIComponent(base64EncodeUtf8(code))}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full">
      {/* Main Code Editor and Output */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Python Source Editor - Light Theme */}
        <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wide text-slate-700">PYTHON SOURCE</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">main.py</span>
          </div>

          {/* Code Area */}
          <textarea
            className="w-full bg-white text-slate-800 font-mono text-sm p-4 outline-none resize-none leading-relaxed"
            style={{ height, fontSize: fontSizePx || 14 }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            placeholder="# Write your Python code here..."
          />
        </div>

        {/* Output Panel - Light Theme */}
        <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200">
          {/* Output Header */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold tracking-wide text-slate-700">OUTPUT</span>
            </div>
            {output && (
              <span className="text-[10px] font-mono text-slate-500">
                {output.split('\n').length} line{output.split('\n').length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Output Content */}
          <pre
            className="w-full bg-slate-50 p-4 text-sm font-mono text-slate-800 leading-relaxed overflow-auto custom-scrollbar"
            style={{ height, fontSize: fontSizePx || 14 }}
          >
            {output || <span className="text-slate-400 italic">No output yet. Click "Run Code" to execute.</span>}
          </pre>
        </div>
      </div>

      {/* Input Section (Conditional) */}
      {(() => {
        const lower = (code || "").toLowerCase();
        const needsInput = lower.includes("input(") || lower.includes("sys.stdin") || lower.includes("stdin.read");
        if (!needsInput) return null;
        return (
          <div className="mt-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 overflow-hidden">
              <div className="bg-amber-50 px-4 py-3 border-b border-amber-100 flex items-center gap-2">
                <span className="text-amber-600">⚡</span>
                <span className="text-xs font-bold tracking-wide text-amber-800">PROGRAM INPUT</span>
                <span className="text-xs text-amber-600 ml-auto">stdin</span>
              </div>
              <textarea
                className="w-full h-32 font-mono text-sm p-4 outline-none resize-y bg-amber-50/30 focus:bg-white transition-colors"
                placeholder="Type your input here (one value per line)&#10;Example:&#10;John&#10;25"
                value={stdinText}
                onChange={(e) => setStdinText(e.target.value)}
                style={{ fontSize: fontSizePx && fontSizePx - 1 }}
              />
            </div>
          </div>
        );
      })()}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 justify-end items-center">
        <Button
          variant="ghost"
          type="button"
          onClick={openInNewTab}
          className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open in New Tab
        </Button>

        <Button
          variant="secondary"
          type="button"
          onClick={reset}
          disabled={isRunning}
          className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-semibold px-5"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </Button>

        <Button
          type="button"
          onClick={run}
          disabled={isRunning}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-green-500/30 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isRunning ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Run Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
} 
