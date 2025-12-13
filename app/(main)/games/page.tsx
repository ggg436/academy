export default function GamesPage() {
  const games = [
    {
      id: "typing-race",
      title: "Typing Race",
      description: "Improve typing speed with real code snippets and accuracy tracking.",
      href: "/games/typing-race",
      icon: "/react.svg",
      accent: "from-blue-500 to-purple-500",
    },
    {
      id: "flash-cards",
      title: "Flash Cards",
      description: "Flip and recall key concepts quickly. Streaks and spaced repetition.",
      href: "/games/flash-cards",
      icon: "/learn.svg",
      accent: "from-green-500 to-teal-500",
    },
    {
      id: "code-quiz",
      title: "Code Quiz",
      description: "Test your programming knowledge with interactive quizzes.",
      href: "/games/code-quiz",
      icon: "/javascript.svg",
      accent: "from-yellow-500 to-orange-500",
    },
    {
      id: "word-match",
      title: "Word Match",
      description: "Match programming terms with their definitions.",
      href: "/games/word-match",
      icon: "/html.svg",
      accent: "from-red-500 to-pink-500",
    },
    {
      id: "code-quest",
      title: "Code Quest",
      description: "Adventure game with coding puzzles and story progression.",
      href: "/games/code-quest",
      icon: "/python.svg",
      accent: "from-indigo-500 to-purple-600",
    },
    {
      id: "debug-hero",
      title: "Debug Hero",
      description: "Fix bugs in code to become a debugging hero.",
      href: "/games/debug-hero",
      icon: "/javascript.svg",
      accent: "from-red-500 to-orange-500",
    },
    {
      id: "code-tycoon",
      title: "Code Tycoon",
      description: "Build a virtual tech company by solving coding challenges.",
      href: "/games/code-tycoon",
      icon: "/python.svg",
      accent: "from-purple-500 to-pink-500",
    },
    {
      id: "algo-arena",
      title: "Algo Arena",
      description: "Battle enemies with algorithms. Code efficiency = attack power!",
      href: "/games/algo-arena",
      icon: "/javascript.svg",
      accent: "from-indigo-500 to-purple-600",
    },
    {
      id: "build-run",
      title: "Build & Run",
      description: "Create real applications with drag-and-drop or code editing.",
      href: "/games/build-run",
      icon: "/html.svg",
      accent: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <img src="/games.svg" alt="Games" className="h-10 w-10" />
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800">Games</h1>
      </div>
      <p className="text-neutral-600 text-lg">Choose a game to practice coding skills and have fun while learning.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((g) => (
          <a
            key={g.id}
            href={g.href}
            className={
              "group relative rounded-2xl border-2 border-b-4 bg-white hover:bg-gray-50 transition shadow-sm overflow-hidden"
            }
          >
            <div className={`h-24 bg-gradient-to-br ${g.accent}`} />
            <div className="p-4">
              <div className="flex items-center gap-3">
                <img src={g.icon} alt="" className="h-8 w-8 rounded" />
                <h3 className="text-lg font-bold text-neutral-800 group-hover:underline">{g.title}</h3>
              </div>
              <p className="text-neutral-600 mt-2 text-sm leading-relaxed">{g.description}</p>
              <div className="mt-4 flex items-center gap-2 text-green-600 font-semibold">
                <span>Open</span>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M7 5l6 5-6 5V5z"/></svg>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-green-600/0 group-hover:ring-4 transition" />
          </a>
        ))}
      </div>
    </div>
  );
} 
