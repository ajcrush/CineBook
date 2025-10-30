# 🚀 Quick Reference Commands

## Initial Setup

```bash
# Initialize DevOps environment
bash scripts/setup.sh

# Or manual setup
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Docker Commands

### Development Environment

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Restart services
docker-compose restart backend
docker-compose restart frontend

# Rebuild images
docker-compose build --no-cache

# Scale services
docker-compose up -d --scale backend=3
```

### Build Images

```bash
# Build backend
docker build -f backend/Dockerfile -t cinebook-backend:latest .

# Build frontend
docker build -f frontend/Dockerfile -t cinebook-frontend:latest .

# Build all
docker-compose build

# Build without cache
docker-compose build --no-cache
```

### Container Management

```bash
# List containers
docker ps
docker ps -a

# View container logs
docker logs <container-id>
docker logs -f <container-id>

# Execute command in container
docker exec -it <container-id> /bin/bash
docker exec <container-id> npm test

# Stop/Start container
docker stop <container-id>
docker start <container-id>

# Remove container
docker rm <container-id>
```

### Clean Up

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Clean everything
docker system prune -a

# Full cleanup
bash scripts/clean.sh
```

## Database Operations

### Backup & Restore

```bash
# Backup database
bash scripts/backup.sh

# List backups
ls -lh backups/

# Restore from backup
bash scripts/restore.sh ./backups/cinebook_db_20251030_100000.archive.gz
```

### MongoDB Direct Commands

```bash
# Connect to MongoDB
docker exec -it cinebook-db mongosh

# Inside mongosh:
> use cinebook_db
> db.movies.find()
> db.users.find()
> db.bookings.find()
> db.showtimes.find()
```

## Testing

### Backend

```bash
# Install dependencies
cd backend && npm install

# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage

# Run specific test
npm test health.test.js

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Frontend

```bash
# Install dependencies
cd frontend && npm install

# Run tests
npm test

# Coverage
npm run test:coverage

# UI dashboard
npm run test:ui

# Lint
npm run lint

# Fix linting
npm run lint:fix

# Build
npm run build
```

## Deployment

### Render.com

```bash
bash scripts/deploy-render.sh
```

### Railway.app

```bash
bash scripts/deploy-railway.sh
```

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy
bash scripts/deploy-swarm.sh

# Check status
docker stack ps cinebook

# Update stack
docker stack deploy -c docker-compose.prod.yml cinebook
```

### Kubernetes

```bash
# Deploy
bash scripts/deploy-k8s.sh

# Check pods
kubectl get pods -n cinebook

# View logs
kubectl logs -n cinebook -f deployment/backend

# Port forward
kubectl port-forward -n cinebook svc/backend 5000:5000
kubectl port-forward -n cinebook svc/frontend 80:80

# Scale deployment
kubectl scale deployment backend --replicas=3 -n cinebook

# Update image
kubectl set image deployment/backend backend=new-image:tag -n cinebook

# Rollout status
kubectl rollout status deployment/backend -n cinebook

# Delete everything
kubectl delete namespace cinebook
```

## Health & Monitoring

### Health Checks

```bash
# Basic health
curl http://localhost:5000/api/health

# Detailed health
curl http://localhost:5000/api/health/detailed

# Readiness
curl http://localhost:5000/api/ready

# Liveness
curl http://localhost:5000/api/live

# Frontend health
curl http://localhost/health
```

### View Logs

```bash
# Docker logs
docker-compose logs -f backend

# Application logs (local development)
tail -f logs/2025-10-30.log
tail -f logs/error-2025-10-30.log

# Kubernetes logs
kubectl logs -f deployment/backend -n cinebook
```

## GitHub Actions

### Manual Workflow Triggers

```bash
# List workflows
gh workflow list

# View workflow runs
gh run list

# Trigger workflow
gh workflow run ci-cd.yml

# View run details
gh run view <RUN_ID>

# View run logs
gh run view <RUN_ID> --log

# Cancel run
gh run cancel <RUN_ID>
```

### Manage Secrets

```bash
# Set secret
gh secret set MY_SECRET

# List secrets
gh secret list

# Remove secret
gh secret delete MY_SECRET
```

## Environment Variables

### Update .env Files

```bash
# View current .env
cat .env
cat backend/.env
cat frontend/.env

# Edit .env
nano .env
# or
vim .env
# or use your editor
```

### Load Environment

```bash
# Load env for current shell
export $(cat .env | xargs)

# Verify
echo $NODE_ENV
echo $MONGO_URI
```

## Development Workflows

### Local Development

```bash
# Terminal 1: Start Docker services
docker-compose up -d

# Terminal 2: Backend development
cd backend
npm run dev

# Terminal 3: Frontend development
cd frontend
npm run dev

# Access:
# Frontend: http://localhost:5173 (dev server)
# Backend: http://localhost:5000
```

### Code Quality

```bash
# Backend
cd backend
npm run lint
npm run lint:fix
npm test

# Frontend
cd frontend
npm run lint
npm run lint:fix
npm test
```

### Build for Production

```bash
# Backend: Docker handles it
docker build -f backend/Dockerfile -t cinebook-backend:prod .

# Frontend: Build with Vite
cd frontend
npm run build

# Result: dist/ folder ready for deployment
```

## Troubleshooting

### Port Already in Use

```bash
# Find process
lsof -i :5000
lsof -i :80
lsof -i :27017

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=3000
```

### Container Won't Start

```bash
# Check logs
docker-compose logs backend

# Inspect container
docker inspect <container-id>

# Rebuild
docker-compose build --no-cache backend

# Remove and restart
docker-compose rm -f backend
docker-compose up -d backend
```

### Database Connection Issues

```bash
# Test MongoDB connection
docker exec -it cinebook-db mongosh

# Check MongoDB logs
docker-compose logs mongodb

# Verify connection string
echo $MONGO_URI

# Restart MongoDB
docker-compose restart mongodb
```

### Out of Disk Space

```bash
# Check disk usage
docker system df

# Clean up
docker system prune -a --volumes

# Remove old images
docker image prune -a
```

## Performance Debugging

### Monitor Container Resources

```bash
# Real-time stats
docker stats

# Specific container
docker stats cinebook-api

# CPU and Memory usage
docker ps --format "table {{.Names}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

### Check Network

```bash
# List networks
docker network ls

# Inspect network
docker network inspect cinebook-network

# Test connectivity
docker exec cinebook-api ping mongodb
```

### View Image Layers

```bash
# Inspect image
docker inspect cinebook-backend:latest

# View history
docker history cinebook-backend:latest

# Check size
docker images | grep cinebook
```

## Useful Aliases

Add to `~/.bashrc` or `~/.zshrc`:

```bash
# Docker
alias dc='docker-compose'
alias dcu='docker-compose up -d'
alias dcd='docker-compose down'
alias dcl='docker-compose logs -f'
alias dcb='docker-compose build'

# Project
alias cinema-dev='cd /Users/mohitsharma/Desktop/Movie\ fe+be && docker-compose up -d'
alias cinema-stop='cd /Users/mohitsharma/Desktop/Movie\ fe+be && docker-compose down'
alias cinema-logs='cd /Users/mohitsharma/Desktop/Movie\ fe+be && docker-compose logs -f'

# Kubernetes
alias k='kubectl'
alias kgp='kubectl get pods -n cinebook'
alias kl='kubectl logs -f -n cinebook'
```

Then use: `cinema-dev`, `cinema-logs`, etc.

## More Information

- Complete guide: `DEVOPS.md`
- Monitoring: `MONITORING.md`
- Architecture: `ARCHITECTURE.md`
- Checklist: `DEVOPS_CHECKLIST.md`
- Summary: `DEVOPS_SUMMARY.md`

---

**Last Updated**: October 30, 2025
**Version**: 1.0
