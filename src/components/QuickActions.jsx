import { HeartPulse, Stethoscope, Baby, Plus, Syringe } from "lucide-react";

export default function QuickActions({ onSelect }) {
  const actions = [
    { key: "addRabbit", label: "Add Rabbit", icon: Plus, color: "from-blue-500 to-indigo-500" },
    { key: "breedingPlan", label: "Breeding Plan", icon: Baby, color: "from-pink-500 to-rose-500" },
    { key: "healthCheck", label: "Health Check", icon: Stethoscope, color: "from-emerald-500 to-teal-500" },
    { key: "medication", label: "Medication", icon: Syringe, color: "from-amber-500 to-orange-500" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((a) => (
        <button
          key={a.key}
          onClick={() => onSelect(a.key)}
          className={`group rounded-xl p-4 bg-gradient-to-br ${a.color} text-white shadow hover:shadow-lg transition`}
        >
          <div className="flex items-center gap-3">
            <a.icon className="w-5 h-5" />
            <span className="font-medium">{a.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
