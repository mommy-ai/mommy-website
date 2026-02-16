import Navbar from "@/components/Navbar";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="scanlines warm-bg h-screen flex flex-col">
      <Navbar />
      <Chat />
    </main>
  );
}
