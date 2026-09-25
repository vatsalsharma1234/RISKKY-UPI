import { LANGUAGES } from "../data/uiStrings";

export default function LanguageSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {LANGUAGES.map((l) => {
        const active = l.code === value;
        return (
          <button
            key={l.code}
            onClick={() => onChange(l.code)}
            className={`${l.font} px-4 py-2 rounded-full text-sm font-semibold border transition-colors
              ${active
                ? "bg-ink text-canvas-soft border-ink"
                : "bg-canvas text-body border-ink/15 hover:border-ink/40"}`}
            aria-pressed={active}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
