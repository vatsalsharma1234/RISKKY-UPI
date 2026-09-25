"""
Rules engine — the deterministic half of the "rules + ML" risk scorer.

Every rule here is written against a documented, current (2025-2026) UPI
scam shape rather than a guess:

  - Collect-request-as-refund / registration-fee-refund   -> The420.in,
    ScamDekho, PhishBowl (2026): fraudsters send a 'collect' request and
    tell the victim entering their PIN will make them *receive* money.
  - Pre-filled QR amount mismatch                          -> FakeOut,
    Technews12 (2026): QR pre-fills an inflated amount the user doesn't
    notice before authorising.
  - QR-swap while the user is trying to SELL/receive       -> ScamDekho,
    ScanTotal (2026): a buyer on OLX/Quikr asks the seller to scan a code
    to 'accept' payment; scanning + PIN entry actually pays the scammer.
  - Fake customer-care / remote-access app                 -> Technews12
    (2026): "KYC will expire" calls that guide the victim to install
    AnyDesk/TeamViewer.
  - Urgency pressure                                       -> a consistent
    thread across all of the above; behavioural-fraud research links
    imposed urgency to reduced scrutiny before authorising a payment.

None of these rules can, by themselves, prove fraud — they flag *shape*,
the same way a spam filter flags shape rather than proving intent. The
scoring is deliberately conservative and explainable rather than a black
box, in keeping with the project's design goal: explain risk, don't just
declare it.
"""
from .schemas import TransactionContext, MatchedPattern

                                                   
RULES: list[tuple[str, int, str, str, callable]] = [
    (
        "collect_framed_as_refund",
        5,
        "A 'collect' request dressed up as a refund",
        "This is technically a request for YOU to pay. Genuine refunds "
        "never arrive by asking you to enter your PIN — banks and apps "
        "credit refunds automatically.",
        lambda c: c.request_type == "collect" and c.framing in ("refund", "prize_cashback", "salary_advance"),
    ),
    (
        "verification_micro_payment",
        4,
        "'Pay ₹1 to verify' pattern",
        "Real KYC or account verification never happens through a UPI "
        "payment of any amount, however small.",
        lambda c: c.framing == "verification",
    ),
    (
        "qr_amount_mismatch",
        4,
        "QR code amount doesn't match what you expected",
        "A scanned code pre-filled a different amount than you agreed to. "
        "Scammers rely on you not re-reading the amount before entering "
        "your PIN.",
        lambda c: c.qr_amount_prefilled_mismatch,
    ),
    (
        "qr_scan_while_selling",
        5,
        "Scanning a QR code to 'receive' money",
        "UPI QR codes only ever request a payment FROM the scanner. If "
        "you're trying to receive money (e.g. selling something), "
        "scanning a code and entering your PIN will pay the other "
        "person, not the reverse.",
        lambda c: c.entry_context == "qr_scan_selling",
    ),
    (
        "remote_access_request",
        5,
        "Asked to install a remote-access / screen-share app",
        "No genuine bank or UPI support process needs to see your screen. "
        "This is the single most common lead-in to an account takeover.",
        lambda c: c.asked_to_install_remote_access_app,
    ),
    (
        "unknown_payee_business_mismatch",
        3,
        "Handle looks personal, claims to be a business",
        "A verified merchant's UPI handle is normally consistent with "
        "their business name. A personal-looking handle collecting "
        "'business' payments is a common shopfront-QR-swap pattern.",
        lambda c: c.payee_handle_looks_personal,
    ),
    (
        "new_unknown_payee_large_amount",
        3,
        "Large payment to a new or unverified contact",
        "First-time, higher-value payments to unrecognised contacts carry "
        "materially more risk than repeat payments to saved contacts.",
        lambda c: c.payee_relationship in ("new_first_time", "unknown") and c.amount_inr >= 2000,
    ),
    (
        "urgency_pressure",
        2,
        "You were pressured to act immediately",
        "Urgency ('offer expires now', 'account will be blocked') is a "
        "deliberate tactic to stop you from pausing to check details.",
        lambda c: c.urgency_pressure,
    ),
    (
        "payment_link_entry",
        2,
        "Started from an external payment link",
        "Links sent over SMS/WhatsApp/email are a common phishing vector "
        "and not how legitimate merchants usually request payment.",
        lambda c: c.entry_context == "payment_link",
    ),
    (
        "phone_guided_entry",
        3,
        "A caller guided you through this payment",
        "Being talked through a live payment step-by-step by an unknown "
        "caller is a hallmark of fake customer-care fraud.",
        lambda c: c.entry_context == "phone_call_guided",
    ),
]


def evaluate_rules(ctx: TransactionContext) -> tuple[int, list[MatchedPattern]]:
    """Returns (raw rule score 0-100ish, matched pattern list)."""
    matched: list[MatchedPattern] = []
    score = 0
    for rule_id, severity, title, detail, predicate in RULES:
        if predicate(ctx):
            matched.append(MatchedPattern(id=rule_id, severity=severity, title=title, detail=detail))
            score += severity * 6                                       
    return min(score, 100), matched


def feature_vector(ctx: TransactionContext) -> list[float]:
    """Numeric features consumed by the ML classifier (see model.py)."""
    return [
        1.0 if ctx.request_type == "collect" else 0.0,
        1.0 if ctx.framing in ("refund", "prize_cashback", "salary_advance") else 0.0,
        1.0 if ctx.framing == "verification" else 0.0,
        1.0 if ctx.qr_amount_prefilled_mismatch else 0.0,
        1.0 if ctx.entry_context == "qr_scan_selling" else 0.0,
        1.0 if ctx.asked_to_install_remote_access_app else 0.0,
        1.0 if ctx.payee_handle_looks_personal else 0.0,
        1.0 if ctx.payee_relationship in ("new_first_time", "unknown") else 0.0,
        min(ctx.amount_inr / 10000.0, 5.0),
        1.0 if ctx.urgency_pressure else 0.0,
        1.0 if ctx.entry_context == "payment_link" else 0.0,
        1.0 if ctx.entry_context == "phone_call_guided" else 0.0,
    ]
