# 🚀 How to Run CineBook - Complete Guide

A step-by-step guide to run everything in the CineBook DevOps setup.

## 📊 Quick Overview

```
┌─────────────────────────────────────────┐
│   Local Development with Docker         │
│   (Easiest Way to Start)                │
└─────────────────────────────────────────┘
         ▼
┌─────────────────────────────────────────┐
│   Running Tests                         │
│   (Verify Everything Works)             │
└─────────────────────────────────────────┘
         ▼
┌─────────────────────────────────────────┐
│   Running Linters                       │
│   (Code Quality Checks)                 │
└─────────────────────────────────────────┘
         ▼
┌─────────────────────────────────────────┐
│   Production Deployment                 │
│   (Render/Railway/K8s/Swarm)            │
└─────────────────────────────────────────┘
```

---

## 🎯 Option 1: Run Everything with Docker Compose (Recommended for Beginners)

This is the **easiest way** to get everything running locally.

### Step 1: Initial Setup (First Time Only)

```bash
# Navigate to project directory
cd /Users/mohitsharma/Desktop/Movie\ fe+be

# Run automated setup script
bash scripts/setup.sh
```

This will:

- ✅ Check if Docker is installed
- ✅ Create environment files (.env)
- ✅ Build Docker images
- ✅ Install dependencies

**Alternatively, manual setup:**

```bash
# Copy environment templates
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with your settings (optional for local dev)
nano .env
```

### Step 2: Start All Services

```bash
# Start all services (frontend, backend, MongoDB)
docker-compose up -d

# Wait 30-40 seconds for services to start
sleep 40

# Check if all services are running
docker-compose ps
```

**Expected Output:**

```
NAME                COMMAND                  SERVICE      STATUS      PORTS
cinebook-db         "docker-entrypoint.s…"   mongodb      Up 30s      27017/tcp
cinebook-api        "dumb-init -- node s…"   backend      Up 25s      0.0.0.0:5000->5000/tcp
cinebook-frontend   "nginx -g daemon off;…"  frontend     Up 20s      0.0.0.0:80->80/tcp
```

### Step 3: Access Services

Open in your browser or terminal:

```bash
# Frontend (React App)
open http://localhost

# Backend API
curl http://localhost:5000/api/health

# Check detailed health
curl http://localhost:5000/api/health/detailed
```

**Expected Responses:**

```json
// GET http://localhost:5000/api/health
{
  "status": "OK",
  "timestamp": "2025-10-30T10:00:00.000Z",
  "uptime": 3600.5,
  "environment": "development"
}

// GET http://localhost/api/health/detailed
{
  "status": "OK",
  "services": {
    "database": "OK",
    "cache": "OK"
  }
}
```

### Step 4: View Logs

```bash
# View all logs (follow in real-time)
docker-compose logs -f

# View backend logs only
docker-compose logs -f backend

# View frontend logs only
docker-compose logs -f frontend

# View MongoDB logs only
docker-compose logs -f mongodb

# View last 50 lines
docker-compose logs --tail=50
```

### Step 5: Stop Services

```bash
# Stop all services (data is preserved)
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

---

## 🧪 Option 2: Run Tests

Testing is crucial before deployment.

### Backend Tests

```bash
# Navigate to backend
cd backend

# Install dependencies (first time only)
npm install

# Run all tests
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm test -- --coverage

# View coverage in terminal
cat coverage/coverage-summary.json

# Run specific test file
npm test health.test.js
```

**Expected Output:**

```
PASS  src/__tests__/health.test.js
  API Health Check
    ✓ should return health status (25ms)
    ✓ should handle authentication (15ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

### Frontend Tests

```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Run all tests
npm test

# Generate coverage report
npm run test:coverage

# View with UI dashboard
npm run test:ui

# Watch mode
npm test -- --watch
```

### Full Testing Pipeline

```bash
# Run tests for both backend and frontend
cd backend && npm test && cd ../frontend && npm test
```

---

## 🔍 Option 3: Run Code Quality Checks

Keep your code clean and consistent.

### Linting (Code Quality)

```bash
# Backend linting
cd backend
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Frontend linting
cd frontend
npm run lint

# Fix frontend linting issues
npm run lint:fix
```

### Complete Quality Check

```bash
# Backend: Lint + Test
cd backend
npm run lint && npm test

# Frontend: Lint + Test + Build
cd frontend
npm run lint && npm test && npm run build
```

---

## 🏗️ Option 4: Run Locally Without Docker

If you prefer running services directly on your machine.

### Prerequisites

```bash
# Check Node.js version
node --version  # Should be v18+

# Check npm version
npm --version   # Should be v9+

# Install MongoDB locally or use Docker for just MongoDB
docker run -d -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=cinebook \
  -e MONGO_INITDB_ROOT_PASSWORD=changeme \
  mongo:7
```

### Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with MongoDB connection
nano .env

# Start backend
npm run dev  # Uses nodemon for auto-reload

# Or
npm start    # Regular start
```

**Backend should be available at:** `http://localhost:5000`

### Frontend

In a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local
nano .env.local

# Start frontend dev server
npm run dev

# Frontend will be available at: http://localhost:5173
```

---

## � Payment Gateway Configuration (Razorpay)

### Setup Razorpay Test Keys

#### Step 1: Get Razorpay Test Keys

1. Log in to your [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to **Settings** → **API Keys**
3. Copy your **Key ID** (starts with `rzp_test_`)
4. Copy your **Key Secret**

#### Step 2: Configure Backend (.env)

```bash
# In backend/.env
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
```

**⚠️ IMPORTANT:** Never commit `RAZORPAY_KEY_SECRET` to Git. Use `.env` for local dev and environment variables in production.

#### Step 3: Configure Frontend (.env.local)

```bash
# In frontend/.env.local
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

**Note:** Only the **Key ID** is exposed to the frontend (public). The **Key Secret** remains server-side only.

#### Step 4: Test Razorpay Integration

1. Start backend: `npm run dev` (from backend folder)
2. Start frontend: `npm run dev` (from frontend folder)
3. Go to Movies → Select seats → Checkout
4. Choose **"Razorpay (UPI/Wallet)"** payment method
5. You'll see Razorpay test checkout modal
6. Use test credentials from [Razorpay Test Card List](https://razorpay.com/docs/payments/payments/test-mode/)

#### Step 5: Test Card Details (Test Mode)

| Method          | Card Number           | Expiry          | CVV          |
| --------------- | --------------------- | --------------- | ------------ |
| **Credit Card** | `4111 1111 1111 1111` | Any future date | Any 3 digits |
| **Visa**        | `4111111111111111`    | 12/25           | 123          |
| **Mastercard**  | `5555555555554444`    | 12/25           | 123          |

**Test UPI:** `success@razorpay` (for UPI testing)

---

Preparing code for deployment.

### Backend Build

```bash
# Docker image
docker build -f backend/Dockerfile -t cinebook-backend:prod .

# Verify image
docker images | grep cinebook-backend

# Test the image locally
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e MONGO_URI=mongodb://user:pass@host/db \
  cinebook-backend:prod
```

### Frontend Build

```bash
# Navigate to frontend
cd frontend

# Build for production
npm run build

# Output goes to dist/ folder
ls -la dist/

# Preview the build
npm run preview

# Then open http://localhost:4173
```

### Docker Compose Production

```bash
# Build all images for production
docker-compose -f docker-compose.prod.yml build

# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 🚀 Option 6: Deploy to Production

Choose your platform and deploy.

### Render.com (Easiest)

```bash
# 1. Push code to GitHub
git add .
git commit -m "devops: complete setup"
git push origin main

# 2. Go to render.com and connect your GitHub repo
# 3. Render auto-deploys on every push

# Manual deployment
bash scripts/deploy-render.sh
```

### Railway.app

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
bash scripts/deploy-railway.sh

# Or manually
railway login
railway up
```

### Kubernetes

```bash
# 1. Ensure you have kubectl access
kubectl cluster-info

# 2. Create namespace
kubectl apply -f k8s/namespace.yaml

# 3. Deploy all services
bash scripts/deploy-k8s.sh

# 4. Check deployment status
kubectl get pods -n cinebook

# 5. Access services
kubectl port-forward -n cinebook svc/backend 5000:5000
kubectl port-forward -n cinebook svc/frontend 80:80
```

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy
bash scripts/deploy-swarm.sh

# Check status
docker stack ps cinebook

# View logs
docker service logs cinebook_backend
```

---

## 🔄 Complete Workflow - Step by Step

### First Time Setup (15 minutes)

```bash
# Step 1: Navigate to project
cd /Users/mohitsharma/Desktop/Movie\ fe+be

# Step 2: Run setup
bash scripts/setup.sh

# Step 3: Start services
docker-compose up -d

# Step 4: Wait for startup
sleep 40

# Step 5: Verify health
curl http://localhost:5000/api/health

# Step 6: Open browser
open http://localhost
```

### Daily Development

```bash
# Terminal 1: Start Docker services
docker-compose up -d

# Terminal 2: Backend development
cd backend
npm run dev

# Terminal 3: Frontend development
cd frontend
npm run dev

# Terminal 4: Run tests
cd backend
npm test
# or
cd frontend
npm test
```

### Before Committing

```bash
# Run linting
cd backend && npm run lint:fix
cd frontend && npm run lint:fix

# Run tests
cd backend && npm test
cd frontend && npm test

# Check build
cd frontend && npm run build

# Commit changes
git add .
git commit -m "feature: description"
git push
```

### Deployment

```bash
# Production deployment
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Or deploy to cloud
bash scripts/deploy-render.sh
# or
bash scripts/deploy-railway.sh
```

---

## 📋 All Available Commands

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild images
docker-compose build

# Remove everything
docker-compose down -v
```

### Backend Commands

```bash
cd backend

# Development
npm run dev

# Production
npm start

# Testing
npm test
npm run test:watch

# Linting
npm run lint
npm run lint:fix

# Install dependencies
npm install
```

### Frontend Commands

```bash
cd frontend

# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Testing
npm test
npm run test:coverage
npm run test:ui

# Linting
npm run lint
npm run lint:fix

# Install dependencies
npm install
```

### Database Commands

```bash
# Backup database
bash scripts/backup.sh

# Restore database
bash scripts/restore.sh ./backups/cinebook_db_*.archive.gz

# Connect to MongoDB
docker exec -it cinebook-db mongosh

# Inside mongosh
use cinebook_db
db.movies.find()
db.users.find()
db.bookings.find()
```

### Deployment Commands

```bash
# Render
bash scripts/deploy-render.sh

# Railway
bash scripts/deploy-railway.sh

# Kubernetes
bash scripts/deploy-k8s.sh

# Docker Swarm
bash scripts/deploy-swarm.sh
```

---

## 🆘 Troubleshooting While Running

### Services Won't Start

```bash
# Check if ports are in use
lsof -i :80
lsof -i :5000
lsof -i :27017

# Kill process (if needed)
kill -9 <PID>

# Rebuild everything
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Application Won't Load

```bash
# Check all services are running
docker-compose ps

# View logs for errors
docker-compose logs backend
docker-compose logs frontend

# Restart specific service
docker-compose restart backend
```

### Database Connection Failed

```bash
# Check MongoDB is running
docker-compose ps mongodb

# Connect to MongoDB
docker exec -it cinebook-db mongosh

# Verify connection string in .env
cat .env | grep MONGO_URI
```

### Tests Failing

```bash
# Make sure dependencies are installed
npm install

# Clear cache
rm -rf node_modules
npm install

# Run tests with verbose output
npm test -- --verbose

# Check for syntax errors
npm run lint
```

---

## ✅ Verification Checklist

After running everything, verify these:

```bash
# ✓ Check Frontend
curl http://localhost/health
# Should return: healthy

# ✓ Check Backend Health
curl http://localhost:5000/api/health
# Should return: { "status": "OK", ... }

# ✓ Check Backend Ready
curl http://localhost:5000/api/ready
# Should return: { "ready": true }

# ✓ Check Docker Containers
docker ps
# Should show 3 running containers

# ✓ Check Tests Pass
cd backend && npm test
cd frontend && npm test
# Should show: Tests passed

# ✓ Check Linting
cd backend && npm run lint
cd frontend && npm run lint
# Should show: No errors
```

---

## 🎯 Common Scenarios

### Scenario 1: "I want to start developing immediately"

```bash
# Quick start (5 minutes)
bash scripts/setup.sh
docker-compose up -d
open http://localhost
```

### Scenario 2: "I want to run tests before committing"

```bash
# Test everything
cd backend && npm install && npm test && npm run lint
cd frontend && npm install && npm test && npm run lint:fix && npm run build
```

### Scenario 3: "I want to deploy to production"

```bash
# Choose one:

# Option 1: Render (easiest)
bash scripts/deploy-render.sh

# Option 2: Railway
bash scripts/deploy-railway.sh

# Option 3: Kubernetes
bash scripts/deploy-k8s.sh
```

### Scenario 4: "Something is broken, let me clean up"

```bash
# Nuclear option - clean everything
docker-compose down -v
bash scripts/clean.sh

# Start fresh
bash scripts/setup.sh
docker-compose up -d
```

---

## 📊 Resource Usage

Monitor how much resources everything uses:

```bash
# Real-time stats
docker stats

# See container sizes
docker ps -s

# See image sizes
docker images
```

**Expected Resource Usage:**

- Backend: ~100-200MB RAM
- Frontend: ~50-100MB RAM
- MongoDB: ~200-300MB RAM
- Total: ~400-600MB RAM

---

## 🔐 Security Notes

Before running in production:

```bash
# 1. Change all default passwords in .env
nano .env

# 2. Generate strong JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 3. Enable HTTPS (configured in nginx.conf)

# 4. Set environment to production
NODE_ENV=production

# 5. Review security settings
cat frontend/nginx.conf | grep "add_header"
```

---

## 📈 Performance Tips

```bash
# 1. Use production docker-compose file
docker-compose -f docker-compose.prod.yml up -d

# 2. Enable caching
# Already configured in nginx.conf

# 3. Monitor performance
docker stats

# 4. Scale if needed
docker-compose up -d --scale backend=3

# 5. Use load balancer
# Nginx is already configured for this
```

---

## 🎓 Learning Resources

- **DEVOPS.md** - Detailed guide
- **QUICK_REFERENCE.md** - Command reference
- **ARCHITECTURE.md** - System design
- **MONITORING.md** - Monitoring setup

---

## 🚀 Next Steps

1. **Start Local Dev**: `bash scripts/setup.sh && docker-compose up -d`
2. **Run Tests**: `npm test` (in backend and frontend)
3. **Deploy**: Choose Render, Railway, K8s, or Swarm
4. **Monitor**: Setup monitoring in [MONITORING.md](./MONITORING.md)

---

## 💡 Pro Tips

```bash
# Tip 1: Make scripts executable and create aliases
chmod +x scripts/*.sh
alias cinema-dev="cd ~/path/to/project && docker-compose up -d"
alias cinema-logs="cd ~/path/to/project && docker-compose logs -f"

# Tip 2: Auto-format code before committing
npm run lint:fix

# Tip 3: Run tests in watch mode for development
npm run test:watch

# Tip 4: Use production builds for better performance
npm run build

# Tip 5: Monitor with docker stats in another terminal
docker stats
```

---

**Ready to run?** Start with: `bash scripts/setup.sh`

For detailed information, see [DEVOPS.md](./DEVOPS.md)

_Last Updated: October 30, 2025_
