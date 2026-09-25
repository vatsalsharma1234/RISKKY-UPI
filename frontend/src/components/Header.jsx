import { UI } from "../data/uiStrings";

export default function Header({ lang, fontClass }) {
  return (
    <div>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-body bg-canvas border border-ink/10 px-3 py-1.5 rounded-full">
        Not affiliated with Google, NPCI, or any bank
      </span>
      <h1 className="font-display font-extrabold text-ink mt-5 leading-[0.98] tracking-tight text-[2.75rem] sm:text-[3.5rem]">
        Riskky — UPI
        <br />
        Risk Companion
      </h1>
      <p className={`${fontClass} text-xl text-body mt-4 max-w-md`}>
        {UI.tagline[lang] || UI.tagline.en}
      </p>
    </div>
  );
}
