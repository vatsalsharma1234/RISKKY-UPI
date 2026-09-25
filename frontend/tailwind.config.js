
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
        primary: "#9fe870",
        "on-primary": "#0e0f0c",
        "primary-active": "#cdffad",
        "primary-neutral": "#c5edab",
        "primary-pale": "#e2f6d5",
        ink: "#0e0f0c",
        "ink-deep": "#163300",
        body: "#454745",
        mute: "#868685",
        canvas: "#ffffff",
        "canvas-soft": "#e8ebe6",
        positive: "#2ead4b",
        "positive-deep": "#054d28",
        warning: "#ffd11a",
        "warning-deep": "#b86700",
        "warning-content": "#4a3b1c",
        negative: "#d03238",
        "negative-deep": "#a72027",
        "negative-darkest": "#a7000d",
        "negative-bg": "#320707",
        "accent-orange": "#ffc091",
        "accent-cyan": "#38c8ff",
      },
      fontFamily: {
        
        
        display: ["'Manrope'", "'Inter'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        deva: ["'Noto Sans Devanagari'", "'Inter'", "sans-serif"],
        tam: ["'Noto Sans Tamil'", "'Inter'", "sans-serif"],
        tel: ["'Noto Sans Telugu'", "'Inter'", "sans-serif"],
        ben: ["'Noto Sans Bengali'", "'Inter'", "sans-serif"],
        kan: ["'Noto Sans Kannada'", "'Inter'", "sans-serif"],
      },
      borderRadius: {
        
        wsm: "8px",
        wmd: "12px",
        wlg: "16px",
        wxl: "24px",
      },
      boxShadow: {
        modal: "0 24px 60px -20px rgba(14, 15, 12, 0.28)",
      },
    },
  },
  plugins: [],
}
