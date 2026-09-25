const SELECT_CLS = "w-full bg-canvas border border-ink text-ink rounded-wmd px-3.5 py-2.5 text-sm focus:border-ink focus:ring-2 focus:ring-primary/50 outline-none";
const LABEL_CLS = "text-xs font-semibold uppercase tracking-wide text-mute mb-1.5 block";
const TOGGLE_LABELS = [
  ["payee_handle_looks_personal", "'Business' handle looks personal"],
  ["qr_amount_prefilled_mismatch", "QR pre-filled amount looks wrong"],
  ["asked_to_install_remote_access_app", "Asked to install a screen-share app"],
  ["urgency_pressure", "Told to act immediately"],
];

export default function CustomBuilder({ payee, amount, context, onPayeeChange, onAmountChange, onContextChange }) {
  const set = (key, val) => onContextChange({ ...context, [key]: val });

  return (
    <div className="rounded-wxl border border-ink/10 bg-canvas-soft p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className={LABEL_CLS}>Payee</label>
          <input
            value={payee}
            onChange={(e) => onPayeeChange(e.target.value)}
            className={SELECT_CLS}
            placeholder="e.g. rahul.k@okaxis"
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Amount (₹)</label>
          <input
            type="number" min="0" value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className={SELECT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Direction</label>
          <select value={context.request_type} onChange={(e) => set("request_type", e.target.value)} className={SELECT_CLS}>
            <option value="pay">I am paying</option>
            <option value="collect">They are requesting money from me</option>
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>How it was framed</label>
          <select value={context.framing} onChange={(e) => set("framing", e.target.value)} className={SELECT_CLS}>
            <option value="normal">Normal payment</option>
            <option value="refund">A "refund"</option>
            <option value="verification">Account "verification"</option>
            <option value="prize_cashback">Prize / cashback</option>
            <option value="salary_advance">Salary / registration advance</option>
            <option value="donation">Donation</option>
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>Payee relationship</label>
          <select value={context.payee_relationship} onChange={(e) => set("payee_relationship", e.target.value)} className={SELECT_CLS}>
            <option value="saved_contact">Saved contact</option>
            <option value="verified_business">Verified business</option>
            <option value="new_first_time">New / first payment</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>How this started</label>
          <select value={context.entry_context} onChange={(e) => set("entry_context", e.target.value)} className={SELECT_CLS}>
            <option value="typed_manually">Typed manually</option>
            <option value="qr_scan_paying">Scanned a QR to pay</option>
            <option value="qr_scan_selling">Scanned a QR while trying to receive</option>
            <option value="payment_link">Clicked a payment link</option>
            <option value="phone_call_guided">A caller walked me through it</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {TOGGLE_LABELS.map(([key, text]) => (
          <label key={key} className="flex items-center gap-2.5 text-sm text-ink/85 cursor-pointer">
            <input
              type="checkbox"
              checked={context[key]}
              onChange={(e) => set(key, e.target.checked)}
              className="w-4 h-4 accent-ink"
            />
            {text}
          </label>
        ))}
      </div>
    </div>
  );
}
