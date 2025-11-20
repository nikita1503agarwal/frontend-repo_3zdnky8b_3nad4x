import { useEffect, useMemo, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

function Section({ title, children }) {
  return (
    <section className="bg-slate-800/60 border border-white/10 rounded-xl p-4">
      <h3 className="text-slate-100 font-medium mb-3">{title}</h3>
      {children}
    </section>
  );
}

export default function AgentsPanel({ view }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(null);
  }, [view]);

  const onBreedingPlan = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/agents/breeding/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: e?.message || "Failed" });
    } finally {
      setLoading(false);
    }
  };

  const onHealthCheck = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const rabbit_tag = form.get("rabbit_tag");
    const symptoms = (form.get("symptoms") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setLoading(true);
    try {
      const res = await fetch(`${API}/agents/health/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rabbit_tag, symptoms }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: e?.message || "Failed" });
    } finally {
      setLoading(false);
    }
  };

  if (view === "breedingPlan") {
    return (
      <Section title="Breeding Planner Agent">
        <button onClick={onBreedingPlan} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500">
          {loading ? "Calculating..." : "Suggest Pairs"}
        </button>
        {result && (
          <div className="mt-4 space-y-2 text-slate-200 text-sm">
            <div className="opacity-80">Suggested: {result?.summary?.suggested_count ?? 0}</div>
            <ul className="list-disc pl-6">
              {(result?.suggested_pairs || []).map((p, i) => (
                <li key={i}>{p.doe_tag} × {p.buck_tag} → Kindling {p.expected_kindling}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    );
  }

  if (view === "healthCheck") {
    return (
      <Section title="Health/Doctor Agent">
        <form onSubmit={onHealthCheck} className="space-y-3">
          <input name="rabbit_tag" placeholder="Rabbit tag (optional)" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-slate-100" />
          <input name="symptoms" placeholder="Comma-separated symptoms (e.g., sneezing, nasal discharge)" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-slate-100" />
          <button className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500">
            {loading ? "Checking..." : "Run Check"}
          </button>
        </form>
        {result && (
          <div className="mt-4 text-slate-200 text-sm space-y-2">
            {result.error && <div className="text-rose-400">{result.error}</div>}
            {result.overall_severity && <div>Severity: <span className="font-medium">{result.overall_severity}</span></div>}
            <ul className="list-disc pl-6 space-y-1">
              {(result.probable_conditions || []).map((f, i) => (
                <li key={i}>{f.condition} — {f.severity}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    );
  }

  return (
    <Section title="Welcome">
      <p className="text-slate-300 text-sm">Pick an action to get started on the left. You can generate breeding suggestions or run a quick health check.</p>
    </Section>
  );
}
