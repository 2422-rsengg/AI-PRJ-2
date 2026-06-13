# Implementation Checklist & Testing Guide

## Pre-Launch Checklist

### Backend Setup ✓
- [ ] Python 3.8+ installed
- [ ] Virtual environment created
- [ ] Dependencies installed from requirements.txt
- [ ] .env file created with ANTHROPIC_API_KEY
- [ ] CSV file exists at backend/data/policyholders.csv
- [ ] App starts without errors: `python -m uvicorn app:app --reload`
- [ ] FastAPI docs accessible at http://localhost:8000/docs

### Frontend Setup ✓
- [ ] Node.js 16+ installed
- [ ] Dependencies installed: `npm install`
- [ ] .env file created (if needed)
- [ ] Dev server starts: `npm run dev`
- [ ] App accessible at http://localhost:3000

### Environment Configuration ✓
- [ ] Backend .env has ANTHROPIC_API_KEY
- [ ] Backend .env has SECRET_KEY (can be any string)
- [ ] Frontend can reach backend at http://localhost:8000
- [ ] CORS is properly configured

## Test Scenarios

### Test 1: Login Flow
**Purpose:** Verify authentication system works
```
1. Go to http://localhost:3000
2. Try login with wrong credentials (demo/wrong)
   → Should show error message
3. Login with correct credentials (demo/demo123)
   → Should redirect to dashboard
   → Token should be saved in localStorage
4. Refresh page
   → Should remain logged in
```
**Status:** ☐ PASS ☐ FAIL

### Test 2: Dashboard Load
**Purpose:** Verify data loading from backend
```
1. After login, dashboard should load
2. Wait for data to load (spinner disappears)
3. Verify:
   ☐ Total policyholders shows 50
   ☐ Age distribution shows counts
   ☐ Salary distribution shows counts
   ☐ Renewal status shows Active/Pending counts
```
**Status:** ☐ PASS ☐ FAIL

### Test 3: Policyholders Table
**Purpose:** Verify table displays all data correctly
```
1. Scroll down to see policyholders table
2. Verify:
   ☐ At least 50 rows visible (with pagination)
   ☐ All columns display: Name, Age, Salary, Policy Type, Renewal Date, Claims, Status
   ☐ Salary displays with $ and commas
   ☐ Status badges are color-coded (Active=green, Pending=orange)
3. Click on different rows to see data
```
**Status:** ☐ PASS ☐ FAIL

### Test 4: Recommendation Generation
**Purpose:** Verify Claude AI integration
```
1. Click "Get Recommendation" button on any row
2. Modal should open with customer info
3. Click "Generate Recommendation"
4. Wait for API response (30-60 seconds)
5. Verify:
   ☐ Recommendation text appears (2-3 sentences)
   ☐ Communication draft appears (3-4 sentences)
   ☐ No error messages
   ☐ Generated at timestamp shows
6. Click "Generate Another" to test multiple generations
```
**Status:** ☐ PASS ☐ FAIL

### Test 5: Logout
**Purpose:** Verify logout functionality
```
1. Click "Logout" button in header
2. Verify:
   ☐ Redirected to login page
   ☐ Token removed from localStorage
   ☐ Cannot access dashboard by going to /dashboard
   ☐ Required to login again
```
**Status:** ☐ PASS ☐ FAIL

### Test 6: Error Handling
**Purpose:** Verify error messages display correctly
```
1. Without starting backend:
   ☐ Frontend login should fail gracefully
   ☐ Error message should display
   
2. With invalid API key in backend/.env:
   ☐ Recommendation generation should fail
   ☐ Error message should display: "Failed to generate recommendation"

3. Network error simulation:
   ☐ Disconnect internet
   ☐ Try to load data
   ☐ Error message should display
```
**Status:** ☐ PASS ☐ FAIL

### Test 7: API Endpoints
**Purpose:** Test all backend endpoints directly
```bash
# 1. Test Login
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo123"}'
# Should return access_token

# 2. Get Policyholders (replace TOKEN with actual token)
curl "http://localhost:8000/api/policyholders/" \
  -H "Authorization: Bearer TOKEN"
# Should return array of 50 policyholders

# 3. Get Stats
curl "http://localhost:8000/api/policyholders/stats" \
  -H "Authorization: Bearer TOKEN"
# Should return statistics

# 4. Generate Recommendation
curl -X POST "http://localhost:8000/api/recommend/" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"John Smith","age":35,"salary":75000,"policy_type":"Auto","claims_count":0,"renewal_date":"2024-06-15"}'
# Should return recommendation and draft
```
**Status:** ☐ PASS ☐ FAIL

### Test 8: Performance
**Purpose:** Verify acceptable performance
```
1. Dashboard load time: < 3 seconds
2. Policyholders table render: < 1 second
3. Recommendation generation: < 60 seconds (Claude API)
4. Page responsiveness: No freezing during data loading

Performance Metrics:
☐ Network tab shows reasonable request sizes
☐ No console errors
☐ UI remains responsive during loading
```
**Status:** ☐ PASS ☐ FAIL

### Test 9: Responsive Design
**Purpose:** Verify mobile compatibility
```
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes:
   ☐ Mobile (375x667)
   ☐ Tablet (768x1024)
   ☐ Desktop (1920x1080)
4. Verify:
   ☐ Layout adapts properly
   ☐ Text is readable
   ☐ Buttons are clickable
   ☐ Table scrolls horizontally if needed
```
**Status:** ☐ PASS ☐ FAIL

## Debugging Guide

### Backend Issues

#### App won't start
```bash
# Check Python version
python --version  # Should be 3.8+

# Check dependencies
pip install --upgrade -r requirements.txt

# Check CSV file exists
ls backend/data/policyholders.csv

# Run with verbose logging
python -m uvicorn app:app --reload --log-level debug
```

#### API returns 500 error
```bash
# Check backend logs for specific error
# Common causes:
# 1. CSV file not found
# 2. ANTHROPIC_API_KEY not set
# 3. Missing dependencies

# Verify CSV
head backend/data/policyholders.csv

# Test CSV loading
python -c "import pandas; print(pandas.read_csv('backend/data/policyholders.csv').shape)"
```

#### Claude API error
```bash
# Verify API key
echo $ANTHROPIC_API_KEY

# Check API key format (starts with sk-ant-)
# Test with curl:
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01"
```

### Frontend Issues

#### Page won't load
```bash
# Check Node version
node --version  # Should be 16+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check port 3000
netstat -ano | findstr :3000
```

#### API calls failing
```bash
# Check browser console (F12)
# Look for CORS errors - may need to update backend CORS

# Test backend is running
curl http://localhost:8000

# Check frontend .env if using custom API URL
cat frontend/.env
```

## Production Deployment Checklist

- [ ] Backend SECRET_KEY changed (not default)
- [ ] ANTHROPIC_API_KEY set securely (not in git)
- [ ] CORS_ORIGINS updated for production domain
- [ ] Database migration (if using DB instead of CSV)
- [ ] Frontend API_URL set to production backend
- [ ] HTTPS enabled on both frontend and backend
- [ ] Error logging configured
- [ ] Rate limiting implemented
- [ ] Security headers set
- [ ] Database backups configured
- [ ] Monitoring and alerting set up

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS error | Backend not allowing frontend origin | Update ALLOWED_ORIGINS in config.py |
| 401 Unauthorized | Token expired or missing | Login again, clear localStorage |
| 404 Not Found | Endpoint path incorrect | Check route definitions |
| 500 Server Error | Missing CSV or API key | Check .env and CSV file exists |
| Slow recommendations | Claude API rate limit | Add retry logic, implement queue |
| Table not showing | Data loading failed | Check console for API errors |
| Modal not closing | Recommendation still loading | Wait for completion or refresh |

---

**Last Updated:** June 2024
**Status:** Ready for Testing ✅
