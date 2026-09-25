import { useEffect, useState } from "react";

const SIZE = 64;
const STROKE = 5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;

export default function CoolingOffRing({ seconds, onComplete, tone = "negative" }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
    if (seconds <= 0) {
      onComplete?.();
      return;
    }
    const start = Date.now();
    const total = seconds * 1000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const left = Math.max(0, total - elapsed);
      setRemaining(left / 1000);
      if (left <= 0) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 50);
    return () => clearInterval(interval);
    
  }, [seconds]);

  const progress = seconds > 0 ? remaining / seconds : 0;
  const offset = CIRC * progress;
  const color = tone === "negative" ? "#d03238" : "#b86700";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} stroke="#e8ebe6" strokeWidth={STROKE} fill="none" />
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          stroke={color} strokeWidth={STROKE} fill="none"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 60ms linear" }}
        />
      </svg>
      <span className="absolute font-display font-extrabold text-sm text-ink">
        {remaining > 0 ? remaining.toFixed(1) : "✓"}
      </span>
    </div>
  );
}
