"""Authentication routes"""
from fastapi import APIRouter, HTTPException, status
from backend.models import LoginRequest, TokenResponse
from backend.auth import create_access_token
from backend.config import DEMO_USERNAME, DEMO_PASSWORD

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(credentials: LoginRequest):
    """Login endpoint - validates credentials and returns JWT"""
    
    # Demo credential check
    if credentials.username != DEMO_USERNAME or credentials.password != DEMO_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create JWT token
    access_token = create_access_token(
        data={"sub": credentials.username, "role": "admin"}
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user={"username": credentials.username, "role": "admin"}
    )
