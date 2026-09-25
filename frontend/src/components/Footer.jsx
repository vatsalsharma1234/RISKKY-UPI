export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-sm text-canvas-soft/80 max-w-2xl leading-relaxed">
          Scam-pattern rules are sourced from public 2025–2026 reporting. 
          <br />
          No real payments are processed anywhere in this project.
        </p>
        <p className="text-xs text-canvas-soft/45 mt-4">
          Backend: FastAPI + Scikit-Learn on Render. Frontend: React + Vite + Tailwind on Vercel.
        </p>
      </div>
    </footer>
  );
}
