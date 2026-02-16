const phases = [
  {
    phase: "Phase 1",
    title: "Launch",
    emoji: "🚀",
    items: [
      "Token launch on pump.fun",
      "Raydium migration",
      "Community building",
      "Website launch",
    ],
    active: true,
  },
  {
    phase: "Phase 2",
    title: "AI Integration",
    emoji: "🤖",
    items: [
      "AI Mom chatbot goes live",
      "Token utility integration",
      "Holder-exclusive features",
      "Partnership announcements",
    ],
    active: false,
  },
  {
    phase: "Phase 3",
    title: "Staking",
    emoji: "💎",
    items: [
      "Staking rewards for $MOMMY holders",
      "Governance voting",
      "Enhanced AI capabilities",
      "Community events & rewards",
    ],
    active: false,
  },
  {
    phase: "Phase 4",
    title: "Expansion",
    emoji: "🌍",
    items: [
      "Cross-chain expansion",
      "Multi-platform AI presence",
      "Strategic partnerships",
      "Global community growth",
    ],
    active: false,
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Roadmap
        </h2>
        <p className="text-center text-purple-200/60 mb-16 text-lg">
          Where we&apos;re headed, sweetie 🗺️
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((p) => (
            <div
              key={p.phase}
              className={`relative rounded-2xl p-6 border transition-all hover:scale-105 ${
                p.active
                  ? "bg-gradient-to-b from-pink-500/15 to-purple-500/15 border-pink-400/30 shadow-lg shadow-pink-500/10"
                  : "bg-white/5 border-white/10 hover:border-pink-400/20"
              }`}
            >
              {p.active && (
                <span className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs font-bold text-white">
                  CURRENT
                </span>
              )}
              <div className="text-3xl mb-3">{p.emoji}</div>
              <div className="text-sm text-pink-300/60 font-semibold mb-1">
                {p.phase}
              </div>
              <h3 className="text-xl font-bold text-pink-100 mb-4">
                {p.title}
              </h3>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-purple-200/60 flex items-start gap-2"
                  >
                    <span className="text-pink-400 mt-0.5">♡</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
