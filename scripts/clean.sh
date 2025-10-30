#!/bin/bash

# Stop and clean Docker environment
# Usage: bash scripts/clean.sh

set -e

echo "🧹 Cleaning Docker environment..."

# Stop all services
echo "Stopping services..."
docker-compose down -v

# Remove images
echo "Removing Docker images..."
docker rmi cinebook-backend:latest cinebook-frontend:latest || true

# Remove dangling images
echo "Cleaning up dangling images..."
docker image prune -f

# Remove logs
echo "Cleaning logs..."
rm -f logs/*.log

echo "✅ Cleanup completed!"
