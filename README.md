# Riskky — UPI Risk Companion

[![Live App](https://img.shields.io/badge/Live-App-2ea44f?style=for-the-badge)](https://upi-risk-companion.vercel.app/)
![Frontend](https://img.shields.io/badge/frontend-react%20%2B%20vite-61DAFB)
![Backend](https://img.shields.io/badge/backend-fastapi-009688)
![Languages](https://img.shields.io/badge/languages-7-orange)
![Backend on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square)
![Frontend on Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

Explains UPI transaction risk in the user's own Indian language, in the moment before a payment is confirmed. No real payments are processed anywhere in this project.

Live: https://upi-risk-companion.vercel.app

## What this project does

Takes the context of a UPI transaction, the relationship with the payee, how the request was framed, the amount, how it was initiated, and a few risk flags, then runs it through a rules engine and a trained classifier together. Returns a risk score, a plain language explanation in the user's chosen language, the specific patterns that were matched, and whether a short cooling off period is required before the user can proceed. The frontend simulates a payment confirmation screen so this check happens at the exact point where a real PIN would be entered.

## What it tries to solve

Government level fraud signals, like the Fraud Risk Indicator, flag risky phone numbers, but say nothing about what a specific transaction looks like in context. Scams such as a collect request disguised as a refund, a QR code with a mismatched amount, or a fake verification call asking for remote access all succeed in that gap, especially for users who are not comfortable reading fast, English heavy financial jargon. This project targets that narrower problem: explaining risk in plain, local language, at the one moment that actually matters, before the PIN is entered.

## Highlights

- Ten explainable rules, written from documented UPI scam patterns, blended with a logistic regression classifier rather than a single black box score.
- The classifier is trained on synthetic data, and this is disclosed directly in the code, not glossed over.
- Risk explanations are delivered in seven Indian languages and read aloud through the browser's built in speech synthesis.
- Flagged transactions require a short cooling off period before the user can proceed, an interface level nudge, not just a warning label.
- The "proceed anyway" action deliberately avoids the brand's primary color, so overriding a warning never looks like the rewarded choice.
- Frontend and backend deploy independently on Vercel and Render, connected through environment variables rather than a shared config.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | FastAPI, scikit-learn |
| Hosting | Vercel (frontend), Render (backend) |
| Languages | English, Hindi, Tamil, Telugu, Bengali, Kannada, Marathi |

## Architecture

```
Frontend (Vercel)
React, Vite, Tailwind
  |
  |  POST /api/analyze
  v
Backend (Render)
FastAPI, rules engine, logistic regression classifier
  |
  |  risk score, localized explanation, matched patterns
  v
Frontend renders the result
```

## Repository layout

```
backend/
  app/
    main.py            API routes, CORS, risk score blending
    rules_engine.py    10 explainable rules from documented scam patterns
    model.py           loads the trained classifier
    translations.py    localized explanations, 7 languages
    schemas.py         request and response models
  train_model.py       generates synthetic data and trains the classifier
  requirements.txt
  render.yaml
  Procfile

frontend/
  src/
    App.jsx
    components/        PhoneMock, RiskSheet, CoolingOffRing, and others
    data/              presets.js (scenarios), uiStrings.js (translations)
    lib/api.js
  vercel.json
```

## What is real and what is synthetic

Rules are written from documented, current UPI scam patterns: collect requests framed as refunds, prefilled QR amount mismatches, fake verification flows, remote access requests, QR swap while selling. The classifier is a logistic regression model trained on synthetic data, since no public transaction level UPI fraud dataset exists for an individual to train on. Translations were written for this project and have not been reviewed by native speakers of each language.

## Local development

### Backend
```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python train_model.py
uvicorn app.main:app --reload --port 8000
```
Check `http://localhost:8000/api/health`, or `http://localhost:8000/docs` for the interactive API docs.

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Open the local URL Vite prints, usually `http://localhost:5173`.
# RISKKY-UPI
