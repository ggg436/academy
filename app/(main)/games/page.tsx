export default function GamesPage() {
  const games = [
    {
      id: "html",
      title: "HTML",
      description: "Practice games for tags, elements, and structure.",
      href: "/learn",
      icon: "/html.svg",
      accent: "from-orange-500 to-rose-500",
    },
    {
      id: "css",
      title: "CSS",
      description: "Master selectors, layout, and responsive design.",
      href: "/learn",
      icon: "/css.svg",
      accent: "from-sky-500 to-indigo-500",
    },
    {
      id: "python",
      title: "Python",
      description: "Sharpen syntax, control flow, and functions.",
      href: "/learn",
      icon: "/python.svg",
      accent: "from-emerald-500 to-teal-500",
    },
    {
      id: "javascript",
      title: "JavaScript",
      description: "Quizzes and challenges for JS fundamentals.",
      href: "/learn",
      icon: "/javascript.svg",
      accent: "from-amber-500 to-orange-500",
    },
    {
      id: "c",
      title: "C",
      description: "Pointers, arrays, and memory concepts.",
      href: "/learn",
      icon: "/c.svg",
      accent: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <img src="/games.svg" alt="Games" className="h-10 w-10" />
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800">Games</h1>
      </div>
      <p className="text-neutral-600 text-lg">Choose a course to play themed mini‑games and reinforce learning.</p>

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