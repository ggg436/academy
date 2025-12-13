"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PythonCodeRunner from "@/components/python-code-runner";
import CCodeRunner from "@/components/c-code-runner";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function safeDecodeBase64Utf8(input: string | null): string {
  if (!input) return "";
  try {
    const raw = atob(input);
    const bytesArr: number[] = []; for (let i = 0; i < raw.length; i++) { bytesArr.push(raw.charCodeAt(i)); } const bytes = new Uint8Array(bytesArr);
    return new TextDecoder().decode(bytes);
  } catch {
    try {
      return decodeURIComponent(input);
    } catch {
      return input;
    }
  }
}

function RunnerInner() {
  const params = useSearchParams();
  const lang = (params.get("lang") || "python").toLowerCase();
  const codeParam = params.get("code");
  const initialCode = useMemo(() => safeDecodeBase64Utf8(codeParam), [codeParam]);

  const title = lang === "c" ? "C Code Playground" : "Python Code Playground";

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-neutral-800">{title}</h1>
        <div className="flex gap-2">
          <Button variant="secondaryOutline" onClick={() => window.history.back()}>Back</Button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {lang === "c" ? (
          <CCodeRunner initialCode={initialCode || "#include <stdio.h>\n\nint main(){\n  printf(\"Hello C\\n\");\n  return 0;\n}"} height={420} />
        ) : (
          <PythonCodeRunner initialCode={initialCode || "print('Hello, Python!')"} height={420} />
        )}
      </div>
    </div>
  );
}

export default function RunnerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-white" />}> 
      <RunnerInner />
    </Suspense>
  );
} 
