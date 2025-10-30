# 🚀 CineBook DevOps Guide

Complete DevOps implementation for the CineBook movie booking system with containerization, CI/CD, monitoring, and deployment configurations.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Docker Setup](#docker-setup)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Monitoring](#monitoring)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+
- Git

### Local Development with Docker

```bash
# Clone the repository
git clone <repo-url>
cd Movie\ fe+be

# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:

- Frontend: http://localhost
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

---

## 🐳 Docker Setup

### Project Structure

```
├── backend/
│   ├── Dockerfile          # Backend container
│   ├── .env.example        # Environment template
│   └── src/
├── frontend/
│   ├── Dockerfile          # Frontend container
│   ├── nginx.conf          # Nginx configuration
│   ├── .env.example        # Environment template
│   └── src/
├── docker-compose.yml      # Local development
├── docker-compose.prod.yml # Production
├── k8s/                    # Kubernetes manifests
└── scripts/               # Deployment scripts
```

### Building Docker Images

```bash
# Build backend image
docker build -f backend/Dockerfile -t cinebook-backend:latest .

# Build frontend image
docker build -f frontend/Dockerfile -t cinebook-frontend:latest .

# Build all services
docker-compose build
```

### Running Services Individually

```bash
# Backend only
docker run -p 5000:5000 --env-file backend/.env cinebook-backend:latest

# Frontend only
docker run -p 80:80 cinebook-frontend:latest

# MongoDB
docker run -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=cinebook \
  -e MONGO_INITDB_ROOT_PASSWORD=changeme mongo:7
```

### Health Checks

```bash
# Check backend health
curl http://localhost:5000/api/health

# Check frontend health
curl http://localhost/health

# Check detailed backend health
curl http://localhost:5000/api/health/detailed
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

Located in `.github/workflows/`:

#### 1. **ci-cd.yml** - Main Pipeline

- Code quality checks (linting)
- Backend tests
- Frontend tests and build
- Security scanning
- Docker image building and pushing
- Automated deployment

**Triggers:**

- Push to `main` or `develop`
- Pull requests

**Jobs:**

- `code-quality`: ESLint validation
- `backend-tests`: Jest tests with MongoDB
- `frontend-tests`: Vitest tests and Vite build
- `security-scan`: npm audit and Snyk
- `build-images`: Docker image creation
- `deploy-staging`: Deploy to staging (develop branch)
- `deploy-production`: Deploy to production (main branch)

#### 2. **dependency-updates.yml** - Weekly Updates

- Scheduled weekly dependency checks
- Automated PR creation for updates
- Runs every Monday at 8 AM UTC

#### 3. **code-analysis.yml** - Code Quality

- CodeQL analysis
- SonarCloud integration
- Security vulnerabilities detection

### Monitoring Workflow Status

```bash
# View workflow runs
gh run list

# View specific workflow
gh run view <RUN_ID>

# View logs
gh run view <RUN_ID> --log
```

### Adding Secrets to GitHub

Required secrets for CI/CD:

```bash
gh secret set SNYK_TOKEN
gh secret set SONAR_TOKEN
gh secret set DOCKER_REGISTRY_TOKEN
```

---

## 🧪 Testing

### Backend Tests

```bash
# Run tests
cd backend
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

Test files: `backend/src/__tests__/**/*.test.js`

### Frontend Tests

```bash
# Run tests
cd frontend
npm test

# Watch mode (not available in template)
npm run test:watch

# Coverage with UI
npm run test:coverage
npm run test:ui
```

Test files: `frontend/src/__tests__/**/*.test.js`

### Test Coverage

Coverage thresholds in configurations:

- **Backend**: 50% minimum (Jest)
- **Frontend**: Configured in vitest.config.js

---

## 📦 Deployment

### 1. Render.com (Recommended for Beginners)

```bash
# Deploy using render.yaml
# Simply push to GitHub and Render auto-deploys

# Manual deployment
./scripts/deploy-render.sh
```

### 2. Railway.app

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
./scripts/deploy-railway.sh
```

### 3. Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy
./scripts/deploy-swarm.sh

# Check stack
docker stack ps cinebook
```

### 4. Kubernetes

```bash
# Setup
kubectl create namespace cinebook

# Deploy
./scripts/deploy-k8s.sh

# Check pods
kubectl get pods -n cinebook

# View logs
kubectl logs -n cinebook -f deployment/backend
```

### Environment Variables for Deployment

Create `.env` file with:

```env
# Application
NODE_ENV=production
PORT=5000

# Database
MONGO_ROOT_USER=cinebook
MONGO_ROOT_PASSWORD=your-secure-password
MONGO_DB_NAME=cinebook_db

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Payment Gateway
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_PUBLIC_KEY=pk_live_your_key

# Frontend
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_STRIPE_PUBLIC_KEY=pk_live_your_key
```

---

## 📊 Monitoring

### Health Check Endpoints

```
GET /api/health           # Basic health
GET /api/health/detailed  # Detailed with services
GET /api/ready            # Readiness for load balancers
GET /api/live             # Liveness for restart policies
```

### Docker Health Checks

Automatically configured in Dockerfiles:

- Backend: Every 30 seconds, timeout 10s, 3 retries
- Frontend: Every 30 seconds, timeout 10s, 3 retries

### Viewing Logs

```bash
# Docker Compose
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Docker
docker logs -f <container-id>

# Kubernetes
kubectl logs -f deployment/backend -n cinebook

# Application logs (local)
tail -f logs/2025-10-30.log
tail -f logs/error-2025-10-30.log
```

### Recommended Monitoring Tools

- **Prometheus + Grafana**: Metrics visualization
- **ELK Stack**: Centralized logging
- **Datadog**: Full observability
- **New Relic**: APM and monitoring
- **CloudWatch**: AWS native monitoring

---

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **Secrets Management**:

   ```bash
   # Use GitHub Secrets for CI/CD
   # Use Kubernetes Secrets for orchestration
   # Use Docker secrets for Swarm
   ```

3. **Docker Security**:

   - Use specific version tags (not `latest`)
   - Run as non-root user (configured in Dockerfiles)
   - Use multi-stage builds (optimized images)
   - Scan images for vulnerabilities

4. **Network Security**:

   - Enable HTTPS/TLS (configured in nginx.conf)
   - Rate limiting enabled
   - Security headers configured
   - CORS properly configured

5. **Code Security**:
   - Regular dependency updates
   - Security scanning (npm audit, Snyk)
   - Code analysis (CodeQL, SonarCloud)

---

## 🆘 Troubleshooting

### Docker Issues

```bash
# Check container status
docker ps -a

# View container logs
docker logs <container-id>

# Inspect container
docker inspect <container-id>

# Restart service
docker-compose restart backend

# Rebuild and restart
docker-compose up -d --build
```

### Port Already in Use

```bash
# Find process using port
lsof -i :5000
lsof -i :80

# Kill process
kill -9 <PID>
```

### Database Connection Issues

```bash
# Check MongoDB is running
docker-compose ps mongodb

# Test connection
docker exec -it cinebook-db mongosh

# View MongoDB logs
docker-compose logs mongodb
```

### Build Failures

```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache

# Check Docker disk space
docker system df
```

### Environment Variable Issues

```bash
# Verify .env file exists
cat .env

# Check variables in running container
docker exec <container-id> env | grep VAR_NAME

# Restart with new .env
docker-compose down
docker-compose up -d
```

---

## 📈 Performance Optimization

### Frontend Optimization

```bash
# Build optimization
npm run build

# Analyze bundle
npm run build -- --debug

# Nginx caching enabled for static assets
# Gzip compression enabled
```

### Backend Optimization

```bash
# MongoDB indexing
# Connection pooling configured
# Request logging enabled
```

### Docker Optimization

- Multi-stage builds for smaller images
- Alpine base images (smaller footprint)
- Layer caching optimized
- Health checks for quick startup detection

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React DevOps](https://create-react-app.dev/deployment/)

---

## 🤝 Contributing

When contributing to DevOps:

1. Update configurations alongside code changes
2. Test Docker builds locally before pushing
3. Run tests before creating PRs
4. Update this documentation for new features
5. Ensure all workflows pass in CI/CD

---

## 📝 License

Same as main project

---

**Last Updated:** October 30, 2025
**Maintainers:** DevOps Team
