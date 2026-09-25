"""
Loads the trained logistic-regression classifier and exposes a single
predict_probability(ctx) function. See train_model.py for how it's built
and why (synthetic data, honestly labelled as such).
"""
import os
import joblib
import numpy as np

from .rules_engine import feature_vector
from .schemas import TransactionContext

_MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")
_bundle = None


def _load():
    global _bundle
    if _bundle is None:
        _bundle = joblib.load(_MODEL_PATH)
    return _bundle


def predict_probability(ctx: TransactionContext) -> float:
    bundle = _load()
    clf = bundle["model"]
    x = np.array([feature_vector(ctx)])
    proba = clf.predict_proba(x)[0][1]
    return float(proba)
