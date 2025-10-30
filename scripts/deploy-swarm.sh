#!/bin/bash

# Deploy script for Docker Swarm
# Usage: ./deploy-swarm.sh

set -e

echo "🚀 Deploying CineBook to Docker Swarm..."

# Build images
echo "📦 Building Docker images..."
docker build -f backend/Dockerfile -t cinebook-backend:latest .
docker build -f frontend/Dockerfile -t cinebook-frontend:latest .

# Tag for registry (update with your registry)
REGISTRY=${DOCKER_REGISTRY:-localhost:5000}
docker tag cinebook-backend:latest $REGISTRY/cinebook-backend:latest
docker tag cinebook-frontend:latest $REGISTRY/cinebook-frontend:latest

# Push to registry
echo "📤 Pushing images to registry..."
docker push $REGISTRY/cinebook-backend:latest
docker push $REGISTRY/cinebook-frontend:latest

# Deploy stack
echo "🚀 Deploying stack..."
docker stack deploy -c docker-compose.prod.yml cinebook

echo "✅ Stack deployed successfully!"
echo "📍 Check stack status: docker stack ps cinebook"
