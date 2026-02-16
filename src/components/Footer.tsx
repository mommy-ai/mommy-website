export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💖</span>
          <span className="font-bold text-pink-200">MOMMY AI</span>
        </div>
        <div className="flex gap-6 text-sm text-purple-200/40">
          <a href="#tokenomics" className="hover:text-pink-300 transition-colors">
            Tokenomics
          </a>
          <a href="#roadmap" className="hover:text-pink-300 transition-colors">
            Roadmap
          </a>
          <a href="#community" className="hover:text-pink-300 transition-colors">
            Community
          </a>
        </div>
        <div className="text-sm text-purple-200/30">
          © {new Date().getFullYear()} MOMMY AI. Made with 💛
        </div>
      </div>
    </footer>
  );
}
