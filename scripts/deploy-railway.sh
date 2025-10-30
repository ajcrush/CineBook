#!/bin/bash

# Deploy script for Railway.app
# Usage: ./deploy-railway.sh

set -e

echo "🚀 Deploying CineBook to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Install it: npm install -g @railway/cli"
    exit 1
fi

# Authenticate with Railway
echo "🔐 Authenticating with Railway..."
railway login

# Build and deploy
echo "📦 Building and deploying..."
railway up

echo "✅ Deployment completed!"
echo "📍 View your deployment: railway status"
