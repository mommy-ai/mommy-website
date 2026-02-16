const allocations = [
  { label: "Liquidity Pool (locked)", pct: 50, color: "from-pink-500 to-pink-400" },
  { label: "Community Rewards & Airdrops", pct: 20, color: "from-purple-500 to-purple-400" },
  { label: "Development Fund (vested 12mo)", pct: 15, color: "from-fuchsia-500 to-fuchsia-400" },
  { label: "Marketing & Partnerships", pct: 10, color: "from-rose-500 to-rose-400" },
  { label: "Team (locked 6mo, vested 12mo)", pct: 5, color: "from-violet-500 to-violet-400" },
];

const stats = [
  { label: "Token Name", value: "$MOMMY" },
  { label: "Chain", value: "Solana (SPL)" },
  { label: "Total Supply", value: "1,000,000,000" },
  { label: "Mint Authority", value: "Renounced ✅" },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Tokenomics
        </h2>
        <p className="text-center text-purple-200/60 mb-16 text-lg">
          Fair, transparent, community-first 💛
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-pink-400/10 text-center"
            >
              <div className="text-sm text-purple-300/60 mb-1">{s.label}</div>
              <div className="text-lg font-bold text-pink-200">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Allocation bars */}
        <div className="space-y-5">
          {allocations.map((a) => (
            <div key={a.label}>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-purple-200/80">{a.label}</span>
                <span className="text-pink-300 font-semibold">{a.pct}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${a.color}`}
                  style={{ width: `${a.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Security badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {[
            "Contract Verified",
            "Liquidity Locked",
            "No Mint Authority",
            "No Freeze Authority",
          ].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 text-sm"
            >
              ✅ {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
