import Link from "next/link";

export default function CodeQuizPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <img src="/javascript.svg" alt="Code Quiz" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Code Quiz</h1>
      </div>
      <div className="rounded-2xl border-2 border-b-4 bg-white p-6">
        <p className="text-neutral-600">Timed multiple-choice questions on syntax and semantics.</p>
      </div>
      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
} 