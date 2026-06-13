"""Backend configuration"""
import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

backend_dir = Path(__file__).resolve().parent
env_path = backend_dir / ".env"

# Explicitly load the .env file from the backend folder
load_dotenv(dotenv_path=env_path)

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Anthropic API
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
ANTHROPIC_MODEL = "claude-3-5-sonnet-20241022"  # Free tier model

# CORS Configuration
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3002",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",

]

# Data Configuration
CSV_FILE_PATH = os.path.join(os.path.dirname(__file__), "data", "policyholders.csv")

# Demo Credentials
DEMO_USERNAME = "demo"
DEMO_PASSWORD = "demo123"
