import { useState } from "react";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import ScenarioPicker from "./components/ScenarioPicker";
import CustomBuilder from "./components/CustomBuilder";
import PhoneMock from "./components/PhoneMock";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import { UI, pickFont } from "./data/uiStrings";
import { PRESETS } from "./data/presets";
import { analyzeTransaction } from "./lib/api";

const DEFAULT_CONTEXT = PRESETS[0].context;

export default function App() {
  const [lang, setLang] = useState("en");
  const [selectedPresetId, setSelectedPresetId] = useState(PRESETS[0].id);
  const [customMode, setCustomMode] = useState(false);
  const [payee, setPayee] = useState(PRESETS[0].payee);
  const [amount, setAmount] = useState(PRESETS[0].amount);
  const [context, setContext] = useState(DEFAULT_CONTEXT);

  const [status, setStatus] = useState("idle"); 
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fontClass = pickFont(lang);

  function selectPreset(preset) {
    setSelectedPresetId(preset.id);
    setCustomMode(false);
    setPayee(preset.payee);
    setAmount(preset.amount);
    setContext(preset.context);
    resetFlow();
  }

  function resetFlow() {
    setStatus("idle");
    setResult(null);
    setError(null);
  }

  async function handleCheck() {
    setLoading(true);
    setError(null);
    try {
      const payload = { ...context, amount_inr: Number(amount), language: lang };
      const data = await analyzeTransaction(payload);
      setResult(data);
      setStatus("result");
    } catch {
      setError(
        "Couldn't reach the risk-analysis service. If you're running this locally, make sure the backend is running; if it's deployed, check the API URL in the frontend's .env."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-canvas">
      {}
      <div className="bg-canvas-soft">
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
          <Header lang={lang} fontClass={fontClass} />

          <main className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-mute mb-2.5">
                  {UI.chooseLanguage[lang] || UI.chooseLanguage.en}
                </p>
                <LanguageSelector value={lang} onChange={setLang} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-mute mb-2.5">
                  {UI.chooseScenario[lang] || UI.chooseScenario.en}
                </p>
                <ScenarioPicker selectedId={customMode ? null : selectedPresetId} onSelect={selectPreset} lang={lang} fontClass={fontClass} />
              </div>

              <div>
                <button
                  onClick={() => { setCustomMode((v) => !v); resetFlow(); }}
                  className="text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink transition-colors"
                >
                  {customMode ? "▾" : "▸"} {UI.buildOwn[lang] || UI.buildOwn.en}
                </button>
                {customMode && (
                  <div className="mt-3">
                    <CustomBuilder
                      payee={payee}
                      amount={amount}
                      context={context}
                      onPayeeChange={(v) => { setPayee(v); resetFlow(); }}
                      onAmountChange={(v) => { setAmount(v); resetFlow(); }}
                      onContextChange={(c) => { setContext(c); resetFlow(); }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-10">
              <PhoneMock
                payee={payee}
                amount={amount}
                lang={lang}
                fontClass={fontClass}
                status={status}
                result={result}
                loading={loading}
                error={error}
                onCheck={handleCheck}
                onConfirm={() => setStatus("confirmed")}
                onCancel={() => setStatus("cancelled")}
                onReset={resetFlow}
              />
            </div>
          </main>
        </div>
      </div>

      {}
      <div className="bg-canvas">
        <HowItWorks />
      </div>

      <Footer />
    </div>
  );
}
