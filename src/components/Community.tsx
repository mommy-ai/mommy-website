const links = [
  {
    name: "Twitter",
    handle: "@AIMommyBot",
    url: "https://x.com/AIMommyBot",
    emoji: "🐦",
    desc: "Follow for updates, alpha, and mom jokes",
  },
  {
    name: "GitHub",
    handle: "mommy-ai",
    url: "https://github.com/mommy-ai",
    emoji: "💻",
    desc: "Open source — because mom has nothing to hide",
  },
];

export default function Community() {
  return (
    <section id="community" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Join the Family
        </h2>
        <p className="text-purple-200/60 mb-16 text-lg">
          Every good family sticks together 💕
        </p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-pink-400/10 hover:border-pink-400/30 transition-all hover:bg-white/10"
            >
              <div className="text-4xl mb-4">{l.emoji}</div>
              <div className="text-xl font-bold text-pink-200 mb-1 group-hover:text-pink-100">
                {l.name}
              </div>
              <div className="text-pink-300/60 text-sm mb-3">{l.handle}</div>
              <div className="text-purple-200/50 text-sm">{l.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
