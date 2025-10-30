#!/bin/bash

# Deploy script for Kubernetes
# Usage: ./deploy-k8s.sh

set -e

echo "🚀 Deploying CineBook to Kubernetes..."

# Set variables
NAMESPACE=${K8S_NAMESPACE:-cinebook}
IMAGE_TAG=${IMAGE_TAG:-latest}
REGISTRY=${DOCKER_REGISTRY:-localhost:5000}

# Create namespace
echo "📦 Creating namespace..."
kubectl create namespace $NAMESPACE || echo "Namespace already exists"

# Build images
echo "🔨 Building Docker images..."
docker build -f backend/Dockerfile -t $REGISTRY/cinebook-backend:$IMAGE_TAG .
docker build -f frontend/Dockerfile -t $REGISTRY/cinebook-frontend:$IMAGE_TAG .

# Push images
echo "📤 Pushing images..."
docker push $REGISTRY/cinebook-backend:$IMAGE_TAG
docker push $REGISTRY/cinebook-frontend:$IMAGE_TAG

# Apply Kubernetes manifests
echo "🚀 Applying Kubernetes manifests..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/services.yaml
kubectl apply -f k8s/ingress.yaml

echo "✅ Kubernetes deployment completed!"
echo "📍 Check deployment status: kubectl get pods -n $NAMESPACE"
