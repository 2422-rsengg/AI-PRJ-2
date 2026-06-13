"""Pydantic models for request/response validation"""
from pydantic import BaseModel
from typing import Optional,Any
from datetime import datetime


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict


class Policyholder(BaseModel):
    id: int
    name: str
    age: int
    salary: float
    policy_number: str
    policy_type: str
    renewal_date: str
    claims_count: int
    status: str


class PolicyholderStats(BaseModel):
    total_policyholders: int
    age_distribution: dict
    salary_distribution: dict
    renewal_status_counts: dict


class RecommendationRequest(BaseModel):
    policyholder_name: Optional[str] = None
    name: Optional[str] = None
    customer_name: Optional[str] = None
    
    age: Optional[int] = None
    policy_type: Optional[str] = None
    current_premium: Optional[Any] = None  # Any handles both string "$95,000" and numbers
    premium: Optional[Any] = None
    
    claims_count: Optional[Any] = None
    claims: Optional[Any] = None
    status: Optional[str] = None

class RecommendationResponse(BaseModel):
    recommendation: str
    communication_draft: str
    generated_at: datetime
