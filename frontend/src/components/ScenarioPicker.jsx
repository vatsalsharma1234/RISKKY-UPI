import { PRESETS } from "../data/presets";

export default function ScenarioPicker({ selectedId, onSelect, lang, fontClass }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {PRESETS.map((p) => {
        const active = p.id === selectedId;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className={`text-left px-4 py-3.5 rounded-wlg border transition-colors ${fontClass}
              ${active
                ? "bg-primary-pale border-ink text-ink"
                : "bg-canvas border-ink/10 hover:border-ink/30 text-ink/85"}`}
          >
            <span className="text-sm font-semibold">{p.label[lang] || p.label.en}</span>
            <span className="block text-xs text-mute mt-0.5 font-body">₹{p.amount.toLocaleString("en-IN")} · {p.payee}</span>
          </button>
        );
      })}
    </div>
  );
}
