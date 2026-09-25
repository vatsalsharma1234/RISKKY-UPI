import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import TransactionContext, AnalysisResponse
from .rules_engine import evaluate_rules
from .model import predict_probability
from .translations import HEADLINES, PATTERN_SUMMARIES, SAFE_LINE, COOLING_OFF_LABEL, LANG_NAMES

app = FastAPI(
    title="Vernacular UPI Risk Companion API",
    description=(
        "Portfolio prototype: explains UPI transaction risk in the user's "
        "own language, at the moment before confirmation. Not affiliated "
        "with Google, NPCI, or any bank. Does not process real payments."
    ),
    version="1.0.0",
)

                                                        
                                                     
_origins_env = os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173")
ALLOWED_ORIGINS = [o.strip() for o in _origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


def _blend_score(rule_score: int, model_proba: float) -> int:
    """60/40 blend of the explainable rules score and the model probability,
    matching the report's 'rules + ML' design rather than trusting either
    signal alone."""
    blended = 0.6 * rule_score + 0.4 * (model_proba * 100)
    return int(round(min(max(blended, 0), 100)))


def _risk_level(score: int) -> str:
    if score >= 60:
        return "high_risk"
    if score >= 30:
        return "caution"
    return "safe"


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/languages")
def languages():
    return LANG_NAMES


@app.post("/api/analyze", response_model=AnalysisResponse)
def analyze(ctx: TransactionContext):
    rule_score, matched = evaluate_rules(ctx)
    model_proba = predict_probability(ctx)
    final_score = _blend_score(rule_score, model_proba)
    level = _risk_level(final_score)

    lang = ctx.language
    headline = HEADLINES[level][lang]

    if matched:
                                                                                
        top = sorted(matched, key=lambda m: -m.severity)[:3]
        lines = [PATTERN_SUMMARIES[m.id][lang] for m in top if m.id in PATTERN_SUMMARIES]
        explanation = " ".join(lines)
    else:
        explanation = SAFE_LINE[lang]

    requires_cooling_off = level == "high_risk" or (level == "caution" and final_score >= 45)
    cooling_off_seconds = 3 if level == "high_risk" else (2 if requires_cooling_off else 0)

    return AnalysisResponse(
        risk_score=final_score,
        risk_level=level,
        requires_cooling_off=requires_cooling_off,
        cooling_off_seconds=cooling_off_seconds,
        headline=headline,
        explanation=explanation,
        matched_patterns=matched,
        model_probability=round(model_proba, 3),
        language=lang,
    )
