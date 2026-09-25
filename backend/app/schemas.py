"""
Request/response models for the Vernacular UPI Risk Companion API.

Everything here models the *context* of a UPI transaction, never real
account numbers, VPAs tied to a real person, or PINs. This is a prototype
that reasons about transaction shape, not a payment processor.
"""
from typing import Literal, Optional
from pydantic import BaseModel, Field

RequestType = Literal["pay", "collect"]
Framing = Literal["normal", "refund", "verification", "prize_cashback", "salary_advance", "donation"]
PayeeRelationship = Literal["saved_contact", "verified_business", "new_first_time", "unknown"]
EntryContext = Literal["typed_manually", "qr_scan_paying", "qr_scan_selling", "payment_link", "phone_call_guided"]
Language = Literal["en", "hi", "ta", "te", "bn", "kn", "mr"]


class TransactionContext(BaseModel):
    request_type: RequestType = Field(..., description="Is this a 'pay' (I am sending) or a 'collect' (someone is requesting money FROM me)?")
    framing: Framing = Field("normal", description="How the request was described to the user")
    amount_inr: float = Field(..., ge=0, description="Transaction amount in INR")
    payee_relationship: PayeeRelationship = "unknown"
    entry_context: EntryContext = "typed_manually"
    payee_handle_looks_personal: bool = Field(
        False, description="True if a handle presented as a 'business' looks like a personal/random handle"
    )
    qr_amount_prefilled_mismatch: bool = Field(
        False, description="True if a scanned QR pre-filled an amount different from what the user expected"
    )
    asked_to_install_remote_access_app: bool = Field(
        False, description="True if the counterparty asked the user to install AnyDesk/TeamViewer/screen-share tools"
    )
    urgency_pressure: bool = Field(
        False, description="True if the user was pressured to act immediately ('offer expires', 'account will be blocked')"
    )
    language: Language = "en"


class MatchedPattern(BaseModel):
    id: str
    severity: int
    title: str
    detail: str


class AnalysisResponse(BaseModel):
    risk_score: int = Field(..., ge=0, le=100)
    risk_level: Literal["safe", "caution", "high_risk"]
    requires_cooling_off: bool
    cooling_off_seconds: int
    headline: str
    explanation: str
    matched_patterns: list[MatchedPattern]
    model_probability: float
    language: Language
