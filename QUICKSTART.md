# Getting Started with the Insurance Policy Renewal Engine

## Step 1: Get an Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up or log in
3. Navigate to API keys
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

## Step 2: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## Step 3: Configure Backend

```bash
# Create .env file
copy .env.example .env

# Edit .env file and add your API key:
# ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## Step 4: Start Backend

```bash
# From backend directory
python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000

# You should see:
# Uvicorn running on http://0.0.0.0:8000
# API docs available at http://localhost:8000/docs
```

## Step 5: Install Frontend Dependencies

```bash
# Open new terminal, go to frontend directory
cd frontend
npm install
```

## Step 6: Start Frontend

```bash
# From frontend directory
npm run dev

# You should see:
# Local: http://localhost:3000
```

## Step 7: Access the Application

1. Open browser and go to `http://localhost:3000`
2. Login with:
   - Username: `demo`
   - Password: `demo123`
3. Explore the dashboard and try generating recommendations!

## API Documentation

While running, check out:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Troubleshooting

### Port Already in Use
```bash
# For port 8000
netstat -ano | findstr :8000

# For port 3000
netstat -ano | findstr :3000
```

### Module Not Found
```bash
# Backend
pip install --upgrade -r requirements.txt

# Frontend
npm install
```

### API Key Error
- Verify ANTHROPIC_API_KEY is set in backend/.env
- Check the key starts with `sk-ant-`
- Ensure no extra spaces in the .env file

## Next Steps

1. **Customize** the sample data in `backend/data/policyholders.csv`
2. **Modify** the recommendation prompt in `backend/services/llm_service.py`
3. **Update** the UI styling in `frontend/src/styles/`
4. **Deploy** to your favorite cloud platform

## Project Structure Summary

```
backend/         - FastAPI server (port 8000)
├── app.py       - Main application
├── routes/      - API endpoints
├── services/    - Business logic & LLM integration
├── data/        - Sample CSV data
└── requirements.txt

frontend/        - React app (port 3000)
├── src/
│   ├── components/ - React components
│   ├── services/   - API client
│   └── styles/     - CSS styling
└── package.json
```

## Key Files to Know

- **Backend Logic**: `backend/services/llm_service.py`
- **API Routes**: `backend/routes/recommendations.py`
- **Frontend API**: `frontend/src/services/api.js`
- **Main Dashboard**: `frontend/src/components/Dashboard.jsx`

Happy coding! 🚀
