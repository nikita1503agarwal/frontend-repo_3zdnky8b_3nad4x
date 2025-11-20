import { Rabbit } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Rabbit className="w-6 h-6 text-blue-400" />
        <h1 className="text-white font-semibold tracking-tight">Rabbitry Manager</h1>
      </div>
    </header>
  );
}
