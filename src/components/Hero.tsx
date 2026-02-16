export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="text-6xl mb-6">💖</div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent leading-tight">
          MOMMY AI
        </h1>
        <p className="text-xl md:text-2xl text-pink-200/80 mb-4 font-light">
          Your Crypto Mom on Solana
        </p>
        <p className="text-base md:text-lg text-purple-200/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          The warmest AI on the blockchain. MOMMY watches over your crypto
          journey with care, wisdom, and a little tough love when you need it.
          Powered by <span className="text-pink-300 font-semibold">$MOMMY</span>{" "}
          on Solana.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#tokenomics"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-pink-400 hover:to-purple-400 transition-all shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40"
          >
            View Tokenomics
          </a>
          <a
            href="https://x.com/AIMommyBot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-pink-400/30 text-pink-200 font-semibold hover:bg-pink-500/10 transition-all"
          >
            Follow @AIMommyBot
          </a>
        </div>
      </div>
    </section>
  );
}
