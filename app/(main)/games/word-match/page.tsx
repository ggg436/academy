import Link from "next/link";

export default function WordMatchPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <img src="/learn.svg" alt="Word Match" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Word Match</h1>
      </div>
      <div className="rounded-2xl border-2 border-b-4 bg-white p-6">
        <p className="text-neutral-600">Game coming soon. Match terms with their correct definitions.</p>
      </div>
      <Link href="/games" className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 15l-5-5 5-5v10z"/></svg>
        Back to Games
      </Link>
    </div>
  );
} 