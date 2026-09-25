import { useEffect, useState } from "react";
import CoolingOffRing from "./CoolingOffRing";
import { UI, SPEECH_LOCALES } from "../data/uiStrings";




const LEVEL_BADGE = {
  safe: "bg-primary-pale text-positive-deep",
  caution: "bg-warning/25 text-warning-content",
  high_risk: "bg-negative-bg text-white",
};
const LEVEL_RING_TONE = { safe: "positive", caution: "warning", high_risk: "negative" };
const LEVEL_LABEL = { safe: "Low risk", caution: "Caution", high_risk: "High risk" };

function speak(text, lang) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = SPEECH_LOCALES[lang] || "en-IN";
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
}

export default function RiskSheet({ result, lang, fontClass, onConfirm, onCancel, onReset }) {
  const [coolingDone, setCoolingDone] = useState(!result.requires_cooling_off);
  const [showDetails, setShowDetails] = useState(false);
  const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    setCoolingDone(!result.requires_cooling_off);
    setShowDetails(false);
  }, [result]);

  return (
    <div className="rounded-wlg border border-ink/10 bg-canvas p-5 space-y-4 animate-[slideUp_0.35s_ease]">
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(12px);} to { opacity:1; transform: translateY(0);} }`}</style>

      <div className="flex items-center justify-between gap-3">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${LEVEL_BADGE[result.risk_level]}`}>
          {LEVEL_LABEL[result.risk_level]}
        </span>
        <span className="text-xs font-body text-mute">score {result.risk_score}/100</span>
      </div>

      <p className={`${fontClass} text-2xl font-semibold leading-snug text-ink tracking-tight`}>{result.headline}</p>
      <p className={`${fontClass} text-base leading-relaxed text-body`}>{result.explanation}</p>

      {speechSupported && (
        <button
          onClick={() => speak(`${result.headline}. ${result.explanation}`, lang)}
          className="text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink transition-colors"
        >
          {UI.listen[lang] || UI.listen.en}
        </button>
      )}

      {result.matched_patterns.length > 0 && (
        <div>
          <button
            onClick={() => setShowDetails((s) => !s)}
            className="text-xs font-semibold text-mute hover:text-ink underline underline-offset-2"
          >
            {UI.showDetails[lang] || UI.showDetails.en} ({result.matched_patterns.length})
          </button>
          {showDetails && (
            <ul className="mt-2 space-y-2">
              {result.matched_patterns.map((m) => (
                <li key={m.id} className="text-xs text-body bg-canvas-soft rounded-wmd p-3 border border-ink/5">
                  <span className="font-semibold text-ink">{m.title}</span>
                  <br />
                  {m.detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="pt-3 border-t border-ink/10 flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={onCancel}
          className="px-4 py-2.5 rounded-wxl text-sm font-semibold bg-canvas-soft text-ink hover:bg-ink/10 transition-colors"
        >
          {UI.cancelPayment[lang] || UI.cancelPayment.en}
        </button>

        {!coolingDone ? (
          <div className="flex items-center gap-3">
            <CoolingOffRing
              seconds={result.cooling_off_seconds}
              tone={LEVEL_RING_TONE[result.risk_level]}
              onComplete={() => setCoolingDone(true)}
            />
            <span className={`${fontClass} text-xs text-mute max-w-[10rem]`}>
              {UI.waitToProceed[lang] || UI.waitToProceed.en}
            </span>
          </div>
        ) : result.risk_level === "safe" ? (
          <button
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-wxl text-sm font-semibold bg-primary text-on-primary hover:bg-primary-active transition-colors"
          >
            {UI.confirmPay[lang] || UI.confirmPay.en}
          </button>
        ) : (
          
          
          <button
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-wxl text-sm font-semibold bg-canvas border border-ink text-ink hover:bg-canvas-soft transition-colors"
          >
            {UI.proceedAnyway[lang] || UI.proceedAnyway.en}
          </button>
        )}
      </div>

      <button onClick={onReset} className="text-xs text-mute hover:text-ink underline underline-offset-2">
        {UI.startOver[lang] || UI.startOver.en}
      </button>
    </div>
  );
}
