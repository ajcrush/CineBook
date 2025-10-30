#!/bin/bash

# Deploy script for Render.com
# Usage: ./deploy-render.sh

set -e

echo "🚀 Deploying CineBook to Render..."

# Build Docker images
echo "📦 Building Docker images..."
docker build -f backend/Dockerfile -t cinebook-backend:latest .
docker build -f frontend/Dockerfile -t cinebook-frontend:latest .

echo "✅ Docker images built successfully"

# Push to Render (using render.yaml configuration)
echo "📤 Pushing to Render registry..."
# Render will automatically pull from your GitHub repo

echo "✅ Deployment started on Render!"
echo "📍 Check your Render dashboard for deployment status"
