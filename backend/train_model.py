"""
Trains the small logistic-regression risk classifier that the rules
engine's score is blended with.

Honest scope note (documented here and in the README): there is no public,
labelled, transaction-level UPI fraud dataset available to an individual
prototype-builder. So this script generates a *synthetic* training set
whose feature distributions are constructed directly from the documented
scam patterns in rules_engine.py (collect-as-refund, QR mismatch,
remote-access requests, etc.), each combined with randomised noise and a
probabilistic label. This mirrors a real fraud-modelling workflow (rules
first, from cases; model second, to generalise combinations rules don't
explicitly enumerate) without pretending to have real bank data.

Run: python train_model.py
Produces: app/model.joblib
"""
import random
import joblib
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

random.seed(42)
np.random.seed(42)

FEATURE_NAMES = [
    "is_collect",
    "framed_refund_like",
    "framed_verification",
    "qr_amount_mismatch",
    "qr_scan_selling",
    "remote_access_request",
    "handle_looks_personal",
    "new_or_unknown_payee",
    "amount_scaled",
    "urgency_pressure",
    "payment_link_entry",
    "phone_guided_entry",
]

N = 6000


def synth_row():
    is_collect = np.random.binomial(1, 0.25)
    framed_refund = np.random.binomial(1, 0.15)
    framed_verification = np.random.binomial(1, 0.08)
    qr_mismatch = np.random.binomial(1, 0.12)
    qr_selling = np.random.binomial(1, 0.10)
    remote_access = np.random.binomial(1, 0.06)
    handle_personal = np.random.binomial(1, 0.15)
    new_payee = np.random.binomial(1, 0.4)
    amount_scaled = min(np.random.exponential(0.5), 5.0)
    urgency = np.random.binomial(1, 0.18)
    link_entry = np.random.binomial(1, 0.10)
    phone_guided = np.random.binomial(1, 0.07)

                                                                    
                                                                          
                                                                       
                               
    latent = (
        2.6 * is_collect * framed_refund
        + 2.0 * framed_verification
        + 2.1 * qr_mismatch
        + 2.4 * qr_selling
        + 2.6 * remote_access
        + 1.1 * handle_personal
        + 0.7 * new_payee
        + 0.35 * amount_scaled
        + 0.8 * urgency
        + 0.6 * link_entry
        + 1.0 * phone_guided
        + np.random.normal(0, 0.6)
        - 3.0
    )
    prob = 1 / (1 + np.exp(-latent))
    label = np.random.binomial(1, prob)

    return [
        is_collect, framed_refund, framed_verification, qr_mismatch,
        qr_selling, remote_access, handle_personal, new_payee,
        amount_scaled, urgency, link_entry, phone_guided,
    ], label


def main():
    X, y = [], []
    for _ in range(N):
        row, label = synth_row()
        X.append(row)
        y.append(label)
    X = np.array(X)
    y = np.array(y)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    clf = LogisticRegression(max_iter=1000, class_weight="balanced")
    clf.fit(X_train, y_train)

    preds = clf.predict(X_test)
    print("Held-out synthetic-data performance (sanity check only):")
    print(classification_report(y_test, preds, target_names=["low_risk", "high_risk"]))

    joblib.dump({"model": clf, "feature_names": FEATURE_NAMES}, "app/model.joblib")
    print("Saved app/model.joblib")


if __name__ == "__main__":
    main()
