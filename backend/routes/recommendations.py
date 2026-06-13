"""Recommendations routes"""
import traceback
from datetime import datetime
from fastapi import APIRouter, HTTPException, status
from backend.models import RecommendationRequest, RecommendationResponse
from backend.services.llm_service import LLMService
from backend.auth import verify_token

router = APIRouter(prefix="/api/recommend", tags=["recommendations"])


@router.post("/", response_model=RecommendationResponse)
async def generate_recommendation(request: RecommendationRequest, authorization: str = None):
    """Generate renewal recommendation using Claude AI"""
    
    if authorization:
        token = authorization.replace("Bearer ", "")
        payload = verify_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )
    
    try:
        llm_service = LLMService()
        result = llm_service.generate_recommendation(request.dict())
        
        return RecommendationResponse(
            recommendation=result.get("recommendation", ""),
            communication_draft=result.get("communication_draft", ""),
            generated_at=datetime.utcnow()
        )
    except Exception as e:
        # Prints the raw exception trace directly to your Uvicorn terminal console
        print("\n=== !!! RAW ANTHROPIC SERVICE ERROR !!! ===")
        traceback.print_exc()
        print("============================================\n")
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating recommendation: {str(e)}"
        )