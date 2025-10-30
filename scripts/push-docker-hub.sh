#!/bin/bash

# Script to push CineBook images to Docker Hub
# Usage: bash scripts/push-docker-hub.sh <docker_hub_username>

set -e

if [ -z "$1" ]; then
    DOCKERHUB_USERNAME="fkdjshsus"
    echo "📝 Using default username: $DOCKERHUB_USERNAME"
else
    DOCKERHUB_USERNAME=$1
fi

REGISTRY="${DOCKERHUB_USERNAME}"

echo "🚀 Docker Hub Push Script"
echo "========================"
echo "Docker Hub Username: $REGISTRY"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if logged in to Docker Hub
echo -e "${YELLOW}Checking Docker Hub login...${NC}"
if ! docker info | grep -q "Username"; then
    echo -e "${YELLOW}Not logged in. Please login to Docker Hub:${NC}"
    docker login
fi

# Tag and push frontend
echo ""
echo -e "${YELLOW}Tagging frontend image...${NC}"
docker tag moviefebe-frontend:latest $REGISTRY/cinebook-frontend:latest
docker tag moviefebe-frontend:latest $REGISTRY/cinebook-frontend:$(date +%Y%m%d)

echo -e "${YELLOW}Pushing frontend image...${NC}"
docker push $REGISTRY/cinebook-frontend:latest
docker push $REGISTRY/cinebook-frontend:$(date +%Y%m%d)
echo -e "${GREEN}✓ Frontend pushed successfully${NC}"

# Tag and push backend
echo ""
echo -e "${YELLOW}Tagging backend image...${NC}"
docker tag moviefebe-backend:latest $REGISTRY/cinebook-backend:latest
docker tag moviefebe-backend:latest $REGISTRY/cinebook-backend:$(date +%Y%m%d)

echo -e "${YELLOW}Pushing backend image...${NC}"
docker push $REGISTRY/cinebook-backend:latest
docker push $REGISTRY/cinebook-backend:$(date +%Y%m%d)
echo -e "${GREEN}✓ Backend pushed successfully${NC}"

echo ""
echo -e "${GREEN}✅ All images pushed successfully!${NC}"
echo ""
echo "Your images are now available at:"
echo "  • Frontend: https://hub.docker.com/r/$REGISTRY/cinebook-frontend"
echo "  • Backend: https://hub.docker.com/r/$REGISTRY/cinebook-backend"
echo ""
echo "To use these images, update your docker-compose.yml:"
echo "  frontend:"
echo "    image: $REGISTRY/cinebook-frontend:latest"
echo "  backend:"
echo "    image: $REGISTRY/cinebook-backend:latest"
