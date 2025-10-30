# Checklist for Running CineBook DevOps Setup

## ✅ Initial Setup

- [ ] Clone repository and navigate to project
- [ ] Copy `.env.example` to `.env`
- [ ] Copy `backend/.env.example` to `backend/.env`
- [ ] Copy `frontend/.env.example` to `frontend/.env`
- [ ] Update `.env` files with your credentials
- [ ] Verify Docker and Docker Compose are installed
- [ ] Run `docker --version` to confirm

## ✅ Local Development

- [ ] Run `docker-compose up -d`
- [ ] Wait for all services to start (~30 seconds)
- [ ] Check health: `curl http://localhost:5000/api/health`
- [ ] Open http://localhost in browser
- [ ] Verify no errors in logs: `docker-compose logs`
- [ ] Test backend API endpoints
- [ ] Test frontend functionality

## ✅ Testing

### Backend

- [ ] Install dependencies: `cd backend && npm install`
- [ ] Run tests: `npm test`
- [ ] Check coverage: `npm test -- --coverage`
- [ ] Fix any failing tests
- [ ] Run linting: `npm run lint`

### Frontend

- [ ] Install dependencies: `cd frontend && npm install`
- [ ] Run tests: `npm test`
- [ ] Check coverage: `npm run test:coverage`
- [ ] Build project: `npm run build`
- [ ] Run linting: `npm run lint`

## ✅ Docker Optimization

- [ ] Review Dockerfile configurations
- [ ] Verify multi-stage builds work
- [ ] Check image sizes: `docker images`
- [ ] Test individual container builds
- [ ] Verify health checks pass

## ✅ GitHub Setup

- [ ] Create GitHub repository
- [ ] Push code to repository
- [ ] Add required secrets in GitHub:
  - [ ] `SNYK_TOKEN` (optional)
  - [ ] `SONAR_TOKEN` (optional)
  - [ ] Any deployment credentials
- [ ] Verify workflows in `.github/workflows/` are present
- [ ] Check Actions tab in GitHub for workflow status
- [ ] Wait for first CI/CD run to complete

## ✅ Deployment Configuration

Choose your deployment platform:

### Render.com

- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Set environment variables
- [ ] Update `render.yaml` with your settings
- [ ] Deploy and verify

### Railway.app

- [ ] Create Railway account
- [ ] Connect GitHub repository
- [ ] Set up railway.yaml
- [ ] Configure environment variables
- [ ] Deploy and monitor

### Kubernetes

- [ ] Install kubectl
- [ ] Access Kubernetes cluster
- [ ] Create namespace: `kubectl apply -f k8s/namespace.yaml`
- [ ] Deploy services: `./scripts/deploy-k8s.sh`
- [ ] Verify pods: `kubectl get pods -n cinebook`

### Docker Swarm

- [ ] Initialize swarm: `docker swarm init`
- [ ] Run deploy script: `./scripts/deploy-swarm.sh`
- [ ] Check status: `docker stack ps cinebook`

## ✅ Monitoring Setup

- [ ] Enable health checks (already configured)
- [ ] Set up log rotation
- [ ] Review monitoring.md
- [ ] Consider adding:
  - [ ] Prometheus for metrics
  - [ ] Grafana for visualization
  - [ ] ELK Stack for logging
  - [ ] Datadog or New Relic for APM

## ✅ Security

- [ ] Review `.env.example` templates
- [ ] Ensure no secrets in git: `git log --all --pretty=format: --name-only --diff-filter=D | sort -u | grep -E '\.(env|key|pem)$'`
- [ ] Configure HTTPS for production
- [ ] Update CORS origins
- [ ] Review security headers in nginx.conf
- [ ] Set up Secret management (1Password, Vault, etc.)
- [ ] Rotate keys regularly

## ✅ Performance

- [ ] Test build times
- [ ] Check Docker image sizes
- [ ] Verify caching is working
- [ ] Load test the application
- [ ] Monitor resource usage
- [ ] Optimize slow queries (if any)

## ✅ Documentation

- [ ] Update README.md with deployment info
- [ ] Document environment variables
- [ ] Create runbook for deployments
- [ ] Document backup procedures
- [ ] Create incident response guide

## ✅ Production Deployment

- [ ] Review all configurations
- [ ] Run security checklist
- [ ] Perform staging deployment first
- [ ] Get team approval
- [ ] Deploy to production
- [ ] Monitor logs and health checks
- [ ] Verify all functionality works
- [ ] Perform smoke tests

## ✅ Post-Deployment

- [ ] Set up monitoring alerts
- [ ] Configure backup strategy
- [ ] Document troubleshooting steps
- [ ] Create disaster recovery plan
- [ ] Schedule regular updates
- [ ] Plan for scaling strategy

## 📞 Support

- **Documentation**: See `DEVOPS.md` and `MONITORING.md`
- **Issues**: Check GitHub Issues
- **Logs**: Review `logs/` directory or container logs
- **Health**: Check `/api/health` endpoint

---

**Notes:**

- Keep all `.env` files secure and out of version control
- Regularly update dependencies
- Monitor security advisories
- Test deployments in staging first
- Document any customizations
