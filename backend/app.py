"""Main FastAPI application"""
from fastapi import FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.config import ALLOWED_ORIGINS
from backend.routes import auth, policyholders, recommendations

# Initialize FastAPI app
app = FastAPI(
    title="Insurance Policy Renewal Engine",
    description="API for automated policy renewal recommendations",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods including OPTIONS, POST, GET
    allow_headers=["*"],  # Allows all headers (like Content-Type and Authorization)
)

# Include routers
app.include_router(auth.router)
app.include_router(policyholders.router)
app.include_router(recommendations.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Insurance Policy Renewal Engine API",
        "version": "1.0.0",
        "endpoints": {
            "auth": "/api/auth/login",
            "policyholders": "/api/policyholders/",
            "stats": "/api/policyholders/stats",
            "recommend": "/api/recommend/"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
