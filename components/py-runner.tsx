"use client";

import { useEffect, useRef, useState } from "react";

export default function PyRunner() {
  const codeRef = useRef<HTMLTextAreaElement | null>(null);
  const outRef = useRef<HTMLPreElement | null>(null);
  const runBtnRef = useRef<HTMLButtonElement | null>(null);
  const clearBtnRef = useRef<HTMLButtonElement | null>(null);
  const statusRef = useRef<HTMLSpanElement | null>(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    let pyodide: any = null;
    let running = false;

    const els = {
      runBtn: runBtnRef.current!,
      clearBtn: clearBtnRef.current!,
      status: statusRef.current!,
      code: codeRef.current!,
      out: outRef.current!,
    };

    function writeOut(text = "") {
      if (els.out) els.out.textContent += text as string;
    }
    function writeLine(text = "") {
      writeOut(text + "\n");
    }

    async function jsInput(promptText: string) {
      const resp = await new Promise<string>((resolve) => {
        const div = document.createElement("div");
        div.style.marginTop = "8px";
        const label = document.createElement("span");
        label.textContent = promptText || "Input:";
        label.style.marginRight = "8px";
        const field = document.createElement("input");
        field.type = "text";
        field.placeholder = "type and press Enter";
        field.style.minWidth = "60%";
        field.addEventListener("keydown", (e) => {
          if ((e as KeyboardEvent).key === "Enter") {
            const v = field.value;
            div.remove();
            writeLine(v);
            resolve(v);
          }
        });
        div.appendChild(label);
        div.appendChild(field);
        els.out.appendChild(div);
        field.focus();
      });
      return resp;
    }

    async function boot() {
      if (!statusRef.current) return;
      const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      const s = document.createElement("script");
      s.src = PYODIDE_URL;
      await new Promise((res, rej) => {
        s.onload = res as any; s.onerror = rej as any; document.head.appendChild(s);
      });
      // @ts-ignore
      pyodide = await (window as any).loadPyodide({
        stdin: jsInput,
        stdout: (t: any) => writeOut(String(t)),
        stderr: (t: any) => writeOut(String(t)),
      });
      if (statusRef.current) statusRef.current.textContent = "Python ready";
      if (runBtnRef.current) runBtnRef.current.disabled = false;
      setBooted(true);
    }

    async function runCode() {
      if (!pyodide || running) return;
      running = true;
      if (runBtnRef.current) runBtnRef.current.disabled = true;
      if (statusRef.current) statusRef.current.textContent = "Running…";
      try {
        await pyodide.runPythonAsync(codeRef.current?.value || "");
        if (outRef.current && !outRef.current.textContent?.endsWith("\n")) writeLine();
      } catch (err) {
        writeLine("\nTraceback (most recent call last):");
        writeLine(String(err));
      } finally {
        if (statusRef.current) statusRef.current.textContent = "Python ready";
        if (runBtnRef.current) runBtnRef.current.disabled = false;
        running = false;
      }
    }

    // Wire events
    const runClick = () => runCode();
    const clearClick = () => { if (outRef.current) outRef.current.textContent = ""; };
    runBtnRef.current?.addEventListener("click", runClick);
    clearBtnRef.current?.addEventListener("click", clearClick);
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.shiftKey) { e.preventDefault(); runCode(); }
    };
    codeRef.current?.addEventListener("keydown", keyHandler);

    boot();

    return () => {
      runBtnRef.current?.removeEventListener("click", runClick);
      clearBtnRef.current?.removeEventListener("click", clearClick);
      codeRef.current?.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <h1 className="text-base font-bold mb-3">Python Runner (in your browser)</h1>
      <div className="flex items-center gap-2 mb-3">
        <button ref={runBtnRef} disabled className="px-3 py-2 rounded-lg bg-slate-200 text-slate-700">▶ Run (Shift+Enter)</button>
        <button ref={clearBtnRef} className="px-3 py-2 rounded-lg bg-slate-200 text-slate-700">🧹 Clear Output</button>
        <span ref={statusRef} className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700">Loading Python…</span>
        <span className="opacity-80 text-sm">Optional package: <code>micropip</code> to install wheels</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            ref={codeRef}
            spellCheck={false}
            className="w-full h-[260px] rounded-xl p-3 bg-slate-900 text-slate-100 font-mono text-sm"
            defaultValue={`print("Hello from Python! 😊")\n\n# Example: using the standard library\nfrom math import sqrt\nprint("sqrt(144) =", sqrt(144))\n\n# Example: capturing input()\nname = input("Your name? ")\nprint("Hi,", name)\n\n# Example: installing a PyPI package (pure-Python wheels) via micropip\n# (uncomment to try; requires internet access)\n# import micropip\n# await micropip.install("emoji")\n# import emoji\n# print(emoji.emojize(":snake: Python via Pyodide"))`}
          />
          <div className="opacity-80 text-sm mt-2">Tip: Use <kbd>Shift</kbd>+<kbd>Enter</kbd> to run. Input prompts will appear below the output.</div>
        </div>
        <div>
          <pre ref={outRef} aria-live="polite" className="min-h-[120px] rounded-xl p-3 bg-slate-900 text-slate-100 whitespace-pre-wrap break-words" />
        </div>
      </div>
    </div>
  );
} 