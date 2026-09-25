import { UI } from "../data/uiStrings";
import RiskSheet from "./RiskSheet";

export default function PhoneMock({
  payee, amount, lang, fontClass,
  status, result, loading, error,
  onCheck, onConfirm, onCancel, onReset,
}) {
  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      {}
      <div className="rounded-wxl border border-ink bg-canvas p-6 flex flex-col gap-5 min-h-[440px]">
        <div className="flex items-center justify-between">
          <span className="font-display font-extrabold text-ink text-base tracking-tight">PaySaathi</span>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-mute font-semibold">{UI.payTo[lang] || UI.payTo.en}</p>
          <p className="font-body font-semibold text-ink text-base mt-1">{payee}</p>
        </div>

        <div className="text-center py-5">
          <span className="font-display text-5xl font-extrabold text-ink tracking-tight">₹{Number(amount).toLocaleString("en-IN")}</span>
        </div>

        {status === "idle" && (
          <button
            onClick={onCheck}
            disabled={loading}
            className="mt-auto w-full bg-primary hover:bg-primary-active disabled:opacity-60 text-on-primary font-semibold py-3.5 rounded-wxl transition-colors"
          >
            {loading ? (UI.checking[lang] || UI.checking.en) : (UI.checkPayment[lang] || UI.checkPayment.en)}
          </button>
        )}

        {error && (
          <p className="text-xs text-white bg-negative-bg rounded-wmd p-3">{error}</p>
        )}

        {status === "result" && result && (
          <RiskSheet
            result={result}
            lang={lang}
            fontClass={fontClass}
            onConfirm={onConfirm}
            onCancel={onCancel}
            onReset={onReset}
          />
        )}

        {status === "confirmed" && (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-primary-pale border border-positive text-positive-deep flex items-center justify-center mx-auto text-xl font-bold">✓</div>
            <p className="mt-3 font-semibold text-ink">Payment confirmed (demo)</p>
            <button onClick={onReset} className="mt-3 text-xs text-mute hover:text-ink underline underline-offset-2">
              {UI.startOver[lang] || UI.startOver.en}
            </button>
          </div>
        )}

        {status === "cancelled" && (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-canvas-soft border border-ink/20 text-mute flex items-center justify-center mx-auto text-xl">✕</div>
            <p className="mt-3 font-semibold text-ink">Payment cancelled</p>
            <button onClick={onReset} className="mt-3 text-xs text-mute hover:text-ink underline underline-offset-2">
              {UI.startOver[lang] || UI.startOver.en}
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-xs text-mute mt-3">{UI.demoNote[lang] || UI.demoNote.en}</p>
    </div>
  );
}
