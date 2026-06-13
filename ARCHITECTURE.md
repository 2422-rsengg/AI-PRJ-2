# Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    USER BROWSER (React App)                     │
│                  (http://localhost:3000)                        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Components                                               │  │
│  │ ├─ LoginPage (Authentication)                           │  │
│  │ ├─ Dashboard (Main UI)                                  │  │
│  │ ├─ StatsCharts (Data Visualization)                     │  │
│  │ ├─ PolicyholdersTable (Data List)                       │  │
│  │ └─ RecommendationModal (AI Integration)                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ State Management (AuthContext)                          │  │
│  │ ├─ Token Storage                                         │  │
│  │ ├─ User Info                                            │  │
│  │ └─ Auth Actions                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                        ↓ (HTTPS Requests)                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              FastAPI Backend Server (Python)                    │
│                (http://localhost:8000)                          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ API Routes                                               │  │
│  │ ├─ POST /api/auth/login (JWT Token Generation)          │  │
│  │ ├─ GET /api/policyholders/ (Data Retrieval)             │  │
│  │ ├─ GET /api/policyholders/stats (Aggregation)           │  │
│  │ └─ POST /api/recommend/ (AI Recommendation)             │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Services Layer                                           │  │
│  │ ├─ DataService (CSV Loading & Processing)               │  │
│  │ └─ LLMService (Claude API Integration)                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Data Layer                                               │  │
│  │ └─ policyholders.csv (50 Sample Records)                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                        ↓ (HTTPS + API Key)                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│           Claude AI API (Anthropic)                             │
│         (api.anthropic.com)                                     │
│                                                                 │
│  Model: claude-3-5-sonnet-20241022                              │
│  - Generates personalized recommendations                       │
│  - Creates professional communication drafts                    │
│  - 500 token limit per request                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Login Flow
```
User Input → LoginPage.jsx → axios.post('/auth/login')
         ↓
    FastAPI /auth/login
         ↓
    JWT Token Generation (PyJWT)
         ↓
    Token Stored in localStorage
         ↓
    User Redirected to Dashboard
```

### 2. Dashboard Load Flow
```
Dashboard Component Mounts → PrivateRoute Check
         ↓
    Token Validation
         ↓
    Parallel Requests:
    ├─ GET /policyholders/ (List of all policyholders)
    └─ GET /policyholders/stats (Aggregated statistics)
         ↓
    DataService.load_data() → Reads CSV
         ↓
    Data Processing:
    ├─ Age distribution calculation
    ├─ Salary range grouping
    └─ Renewal status counting
         ↓
    JSON Response → React State Update → UI Render
```

### 3. Recommendation Generation Flow
```
User clicks "Get Recommendation" → RecommendationModal Opens
         ↓
    Customer Data Collected
         ↓
    POST /api/recommend/ with customer JSON
         ↓
    LLMService.generate_recommendation()
         ↓
    Anthropic API Call (Claude):
    - Prompt: Personalized renewal recommendation
    - Model: claude-3-5-sonnet-20241022
    - Max tokens: 500
         ↓
    Response Parsing & JSON Extraction
         ↓
    Recommendation + Communication Draft Generated
         ↓
    Response Returned to Frontend → Displayed in Modal
```

## Authentication Flow

```
┌─────────────────────────────────┐
│  Login Credentials              │
│  (username: demo, password: ...) │
└────────────┬────────────────────┘
             │
             ↓
    ┌────────────────────┐
    │ Validate Credentials│
    │ (config.py)        │
    └────────────┬───────┘
                 │
             ✓ Valid?
                 │
             ┌───┴────┐
             ↓        ↓
          YES        NO
             │        │
             ↓        │
    ┌──────────────┐  │
    │ Create Token │  │
    │ (JWT)        │  │
    │ Expires: 30m │  │
    └──────┬───────┘  │
           │          ↓
           │    Return 401 Error
           ↓
    Return access_token + user info
           │
           ↓
    Store in localStorage
           │
           ↓
    Set Authorization Header:
    "Bearer {access_token}"
           │
           ↓
    All subsequent requests include token
```

## Database Schema (CSV)

```
Columns:
├─ name (String)              # Customer name
├─ age (Integer)              # Age (25-75)
├─ salary (Float)             # Annual salary
├─ policy_number (String)     # Unique policy ID
├─ policy_type (String)       # Auto/Home/Life
├─ renewal_date (String)      # YYYY-MM-DD
├─ claims_count (Integer)     # Number of claims
└─ status (String)            # Active/Pending

Example Record:
John Smith, 35, 75000, POL001, Auto, 2024-06-15, 0, Active
```

## API Contract

### Request/Response Examples

#### 1. Login
```
POST /api/auth/login
{
  "username": "demo",
  "password": "demo123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": {
    "username": "demo",
    "role": "admin"
  }
}
```

#### 2. Get Policyholders
```
GET /api/policyholders/
Headers: Authorization: Bearer {token}

Response: [
  {
    "id": 1,
    "name": "John Smith",
    "age": 35,
    "salary": 75000,
    "policy_number": "POL001",
    "policy_type": "Auto",
    "renewal_date": "2024-06-15",
    "claims_count": 0,
    "status": "Active"
  },
  ...
]
```

#### 3. Get Stats
```
GET /api/policyholders/stats
Headers: Authorization: Bearer {token}

Response:
{
  "total_policyholders": 50,
  "age_distribution": {
    "25-30": 8,
    "31-40": 12,
    ...
  },
  "salary_distribution": {
    "<50K": 5,
    "50-100K": 20,
    ...
  },
  "renewal_status_counts": {
    "Active": 42,
    "Pending": 8
  }
}
```

#### 4. Generate Recommendation
```
POST /api/recommend/
Headers: Authorization: Bearer {token}
{
  "customer_name": "John Smith",
  "age": 35,
  "salary": 75000,
  "policy_type": "Auto",
  "claims_count": 0,
  "renewal_date": "2024-06-15"
}

Response:
{
  "recommendation": "John is a low-risk customer with no claims...",
  "communication_draft": "Dear John, we're pleased to offer...",
  "generated_at": "2024-06-13T10:30:45.123456"
}
```

## Error Handling Strategy

```
Client Request
    │
    ├─ Network Error
    │   └─ User sees: "Connection failed"
    │
    ├─ Invalid Request
    │   └─ Pydantic validation error → 422 Unprocessable Entity
    │
    ├─ Authentication Error
    │   └─ Invalid token → 401 Unauthorized → Redirect to login
    │
    ├─ Authorization Error
    │   └─ Insufficient permissions → 403 Forbidden
    │
    ├─ Resource Not Found
    │   └─ 404 Not Found
    │
    └─ Server Error
        ├─ CSV not found → 500 Internal Server Error
        ├─ Claude API error → 500 Internal Server Error
        └─ Retry logic with exponential backoff
```

## Performance Considerations

### Frontend
- ✅ Component memoization where needed
- ✅ Async data loading with loading states
- ✅ CSS-in-JS for optimized styling
- ✅ React Router for SPA navigation (no full page reloads)

### Backend
- ✅ CSV data cached in memory (DataService._df)
- ✅ Async request handling
- ✅ Token validation on protected endpoints
- ✅ Fast statistical calculations with Pandas

### Network
- ✅ Minimal payload sizes (JSON)
- ✅ Gzip compression enabled by default
- ✅ Token-based auth (no session overhead)
- ✅ CORS headers for cross-origin requests

## Scalability Path

### Short Term (100-1000 users)
- Current architecture sufficient
- Add database (PostgreSQL) for persistence
- Implement caching layer (Redis)

### Medium Term (1000-10k users)
- Microservices architecture
- Separate auth service
- Async task queue (Celery) for Claude API calls
- Load balancing

### Long Term (10k+ users)
- Multi-region deployment
- Database sharding
- API rate limiting & throttling
- Advanced caching strategies
- CDN for static assets

## Technology Stack Rationale

| Technology | Why | Alternative |
|-----------|-----|-------------|
| React | Modern, component-based, large ecosystem | Vue, Svelte |
| FastAPI | Fast, async, automatic API docs | Django, Flask |
| Claude API | State-of-the-art LLM, free tier | GPT-4, LLaMA |
| JWT | Stateless auth, scalable | Sessions, OAuth |
| Pandas | Efficient data processing | NumPy, Polars |
| Vite | Fast build tool, hot reload | Webpack, Create React App |

---

**Status:** Ready for Production Deployment ✅
