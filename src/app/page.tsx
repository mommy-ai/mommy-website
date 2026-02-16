import Hero from "@/components/Hero";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";

export default function Home() {
  return (
    <main>
      <Hero />
      <Tokenomics />
      <Roadmap />
      <Community />
      <Footer />
      <ChatBubble />
    </main>
  );
}
