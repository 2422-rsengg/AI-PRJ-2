"""Policyholders routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from backend.models import Policyholder, PolicyholderStats
from backend.services.data_service import DataService
from backend.auth import verify_token

router = APIRouter(prefix="/api/policyholders", tags=["policyholders"])


def verify_token_dependency(token: str) -> dict:
    """Dependency for verifying JWT token"""
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    return payload


@router.get("/", response_model=List[dict])
async def get_policyholders(authorization: str = None):
    """Get all policyholders"""
    if authorization:
        token = authorization.replace("Bearer ", "")
        verify_token_dependency(token)
    
    try:
        policyholders = DataService.get_all_policyholders()
        return policyholders
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error loading policyholders: {str(e)}"
        )


@router.get("/stats", response_model=dict)
async def get_stats(authorization: str = None):
    """Get policyholders statistics"""
    if authorization:
        token = authorization.replace("Bearer ", "")
        verify_token_dependency(token)
    
    try:
        stats = DataService.get_stats()
        return stats
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error calculating stats: {str(e)}"
        )
