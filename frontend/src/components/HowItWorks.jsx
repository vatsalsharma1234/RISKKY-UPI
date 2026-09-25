const STEPS = [
  { key: "start", label: "Scan or enter", desc: "A QR scan, a typed handle, or a collect request arrives.", highlight: false },
  { key: "pause", label: "This tool's moment", desc: "Rules + a small classifier score the transaction's shape and explain it in your language, before you act.", highlight: true },
  { key: "act", label: "You decide", desc: "Confirm, or cancel. The decision always stays with you.", highlight: false },
];

export default function HowItWorks() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="font-display text-4xl font-extrabold text-ink tracking-tight">Why this exists</h2>
      <p className="text-body mt-4 max-w-2xl leading-relaxed text-lg">
        Google Pay carries roughly a third of India's UPI volume, and as of late 2025 hadn't yet
        adopted the government's phone-number-level Fraud Risk Indicator. That signal, even fully
        rolled out, says nothing about what a specific transaction looks like in context (a collect
        request disguised as a refund, a QR code with a pre-filled amount, a caller asking for screen-share access).
        This project targets that different, narrower gap. It focuses on the ten seconds before a PIN is entered, 
        explained in plain language rather than financial jargon.
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {STEPS.map((s) => (
          <div key={s.key} className={`relative pl-5 border-l-2 ${s.highlight ? "border-primary" : "border-ink/15"}`}>
            <span className={`absolute -left-[7px] top-0 w-3 h-3 rounded-full ${s.highlight ? "bg-primary" : "bg-ink/25"}`} />
            <p className={`text-xs font-bold uppercase tracking-wide ${s.highlight ? "text-ink-deep" : "text-mute"}`}>
              {s.highlight ? "You are here" : s.key === "start" ? "Before" : "After"}
            </p>
            <p className="font-display font-extrabold text-ink mt-1.5 text-lg">{s.label}</p>
            <p className="text-sm text-body mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-wxl bg-canvas-soft p-5">
          <p className="font-display font-extrabold text-ink text-sm">Rules engine</p>
          <p className="text-body text-sm mt-1.5 leading-relaxed">Ten explainable checks written directly from documented 2025–2026 UPI scam patterns.</p>
        </div>
        <div className="rounded-wxl bg-canvas-soft p-5">
          <p className="font-display font-extrabold text-ink text-sm">Blended classifier</p>
          <p className="text-body text-sm mt-1.5 leading-relaxed">A logistic-regression model trained on synthetic data generalises across feature combinations the rules don't individually cover.</p>
        </div>
        <div className="rounded-wxl bg-primary-pale p-5">
          <p className="font-display font-extrabold text-ink text-sm">Vernacular layer</p>
          <p className="text-ink-deep text-sm mt-1.5 leading-relaxed">Explanations in seven Indian languages, read aloud (not a legal disclaimer in translation).</p>
        </div>
      </div>
    </section>
  );
}
