# Monitoring and Observability Guide

## Health Checks

The application exposes several health check endpoints:

### 1. Basic Health Check

```bash
GET /api/health
```

Response:

```json
{
  "status": "OK",
  "timestamp": "2025-10-30T10:00:00.000Z",
  "uptime": 3600.5,
  "environment": "production"
}
```

### 2. Detailed Health Check

```bash
GET /api/health/detailed
```

Response:

```json
{
  "status": "OK",
  "timestamp": "2025-10-30T10:00:00.000Z",
  "uptime": 3600.5,
  "environment": "production",
  "services": {
    "database": "OK",
    "cache": "OK"
  }
}
```

### 3. Readiness Check (for load balancers)

```bash
GET /api/ready
```

### 4. Liveness Check (for restart policies)

```bash
GET /api/live
```

## Monitoring Setup

### Docker Health Checks

Health checks are configured in Dockerfiles:

**Backend:**

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
```

**Frontend:**

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/health
```

### Logging

Application logs are saved in the `logs/` directory:

- `YYYY-MM-DD.log` - General application logs
- `error-YYYY-MM-DD.log` - Error logs

## Recommended Monitoring Solutions

### 1. Prometheus & Grafana

```bash
# Install Prometheus metrics for Node.js
npm install prom-client
```

### 2. ELK Stack (Elasticsearch, Logstash, Kibana)

- Centralized logging
- Real-time analysis
- Log visualization

### 3. Datadog

```bash
# Install Datadog agent
npm install dd-trace
```

### 4. New Relic

```bash
# Install New Relic agent
npm install newrelic
```

## Docker Compose Monitoring

Monitor containers:

```bash
# View container logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# View container stats
docker stats
```

## Performance Monitoring in Kubernetes

If using Kubernetes, configure:

- Resource limits
- Horizontal Pod Autoscaling (HPA)
- Vertical Pod Autoscaling (VPA)
- NetworkPolicy for security
