"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  initialCode: string;
  height?: number;
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

export default function CCodeRunner({ initialCode, height = 560 }: Props) {
  const [code, setCode] = useState<string>(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    setCode(initialCode);
    setOutput("");
  }, [initialCode]);

  const run = async () => {
    try {
      setIsRunning(true);
      setOutput("Running...");
      // Use Judge0 CE public endpoint
      const createRes = await fetch("https://ce.judge0.com/submissions?base64_encoded=true&wait=false", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: btoa(code),
          language_id: 50, // C (GCC 9.2.0) common id in Judge0 CE
          stdin: btoa(""),
        }),
      });
      const createData = await createRes.json();
      const token = createData.token as string;
      // Poll for result
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
      setOutput(out || "(no output)");
    } catch (e: any) {
      setOutput(`Run failed: ${e?.message || e}`);
    } finally {
      setIsRunning(false);
    }
  };

  const reset = () => {
    setCode(initialCode);
    setOutput("");
  };

  const openInNewTab = () => {
    const href = `/runner?lang=c&code=${encodeURIComponent(base64EncodeUtf8(code))}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div className="flex-1 border-2 border-b-4 rounded-xl overflow-hidden">
          <div className="px-3 py-2 bg-slate-50 border-b text-xs font-bold tracking-wide text-slate-500">C Source</div>
          <textarea
            className="w-full h-full min-h[200px] font-mono text-sm p-3 outline-none resize-vertical"
            style={{ height }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="flex-1 border-2 border-b-4 rounded-xl overflow-hidden">
          <div className="px-3 py-2 bg-slate-50 border-b text-xs font-bold tracking-wide text-slate-500">Output</div>
          <pre className="w-full bg-white p-3 text-sm" style={{ height, overflow: "auto" }}>{output}</pre>
        </div>
      </div>
      <div className="mt-4 flex gap-2 justify-end">
        <Button variant="secondaryOutline" type="button" onClick={openInNewTab}>Open in new tab</Button>
        <Button variant="secondaryOutline" type="button" onClick={reset} disabled={isRunning}>Reset</Button>
        <Button variant="secondary" type="button" onClick={run} disabled={isRunning}>{isRunning ? "Running..." : "Run"}</Button>
      </div>
    </div>
  );
} 