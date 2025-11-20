import { useState } from "react";
import Header from "./components/Header";
import QuickActions from "./components/QuickActions";
import AgentsPanel from "./components/AgentsPanel";

function App() {
  const [view, setView] = useState(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="text-slate-300 text-sm">Quick Actions</div>
          <QuickActions onSelect={setView} />
        </div>
        <div className="md:col-span-2">
          <AgentsPanel view={view} />
        </div>
      </main>
    </div>
  );
}

export default App;
