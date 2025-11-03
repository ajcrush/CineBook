#!/bin/bash

# CineBook Live Deployment Checklist
# Complete these steps in order

echo "================================"
echo "CineBook Live Deployment Guide"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}PHASE 1: MongoDB Atlas Setup${NC}"
echo "================================"
echo "[ ] 1. Go to https://www.mongodb.com/cloud/atlas"
echo "[ ] 2. Create free account (M0 tier)"
echo "[ ] 3. Create new project 'CineBook'"
echo "[ ] 4. Create cluster (free tier)"
echo "[ ] 5. Add database user: cinebook_user"
echo "[ ] 6. Get connection string (mongodb+srv://...)"
echo "[ ] 7. Add Network Access (Allow Anywhere)"
echo ""
echo -e "${YELLOW}Save MongoDB Connection String:${NC}"
echo "mongodb+srv://cinebook_user:PASSWORD@cluster0.xxxxx.mongodb.net/cinebook?retryWrites=true&w=majority"
echo ""

echo -e "${BLUE}PHASE 2: GitHub Setup${NC}"
echo "================================"
echo "[ ] 1. Create GitHub repository: github.com/YOUR_USERNAME/cinebook"
echo "[ ] 2. Push code:"
echo "      git remote add origin https://github.com/YOUR_USERNAME/cinebook.git"
echo "      git branch -M main"
echo "      git push -u origin main"
echo ""

echo -e "${BLUE}PHASE 3: Render Backend Deployment${NC}"
echo "================================"
echo "[ ] 1. Go to https://render.com"
echo "[ ] 2. Sign up with GitHub"
echo "[ ] 3. Click 'New +' → 'Web Service'"
echo "[ ] 4. Select your cinebook repository"
echo "[ ] 5. Configure:"
echo "      - Name: cinebook-backend"
echo "      - Environment: Node"
echo "      - Build Command: npm install"
echo "      - Start Command: npm start"
echo "      - Instance Type: Free"
echo ""
echo "[ ] 6. Click 'Create Web Service'"
echo "[ ] 7. Wait for deployment (5-10 minutes)"
echo ""
echo "[ ] 8. After deployment, go to 'Environment' tab"
echo "[ ] 9. Add these environment variables:"
echo ""
echo -e "${YELLOW}Environment Variables (Copy and add to Render):${NC}"
cat << 'EOF'
MONGO_URI=mongodb+srv://cinebook_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cinebook?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_12345_change_this
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret
NODE_ENV=production
EOF
echo ""
echo -e "${YELLOW}Save your Backend URL:${NC}"
echo "https://cinebook-backend-xxxxx.onrender.com"
echo ""

echo -e "${BLUE}PHASE 4: Update Frontend Env Variables${NC}"
echo "================================"
echo "[ ] 1. Update frontend/.env.production:"
echo "      VITE_API_BASE_URL=https://your-backend-url.onrender.com/api"
echo ""
echo "[ ] 2. Commit to GitHub:"
echo "      git add frontend/.env.production"
echo "      git commit -m 'Add production env variables'"
echo "      git push"
echo ""

echo -e "${BLUE}PHASE 5: Netlify Frontend Deployment${NC}"
echo "================================"
echo "[ ] 1. Go to https://app.netlify.com"
echo "[ ] 2. Sign up with GitHub"
echo "[ ] 3. Click 'Add new site' → 'Import an existing project'"
echo "[ ] 4. Select GitHub and your cinebook repository"
echo ""
echo "[ ] 5. Configure:"
echo "      - Branch: main"
echo "      - Build command: npm run build"
echo "      - Publish directory: frontend/dist"
echo ""
echo "[ ] 6. Click 'Advanced' before deploying"
echo "[ ] 7. Add environment variable:"
echo "      Name: VITE_API_BASE_URL"
echo "      Value: https://your-backend-url.onrender.com/api"
echo ""
echo "[ ] 8. Click 'Deploy site'"
echo "[ ] 9. Wait for deployment (2-5 minutes)"
echo ""
echo -e "${YELLOW}Save your Frontend URL:${NC}"
echo "https://your-site-name.netlify.app"
echo ""

echo -e "${BLUE}PHASE 6: Final Configuration${NC}"
echo "================================"
echo "[ ] 1. Go back to Render backend service"
echo "[ ] 2. Add environment variable:"
echo "      Name: FRONTEND_URL"
echo "      Value: https://your-site-name.netlify.app"
echo ""
echo "[ ] 3. Service will auto-redeploy"
echo ""

echo -e "${BLUE}PHASE 7: Testing${NC}"
echo "================================"
echo "[ ] 1. Open your Netlify frontend URL"
echo "[ ] 2. Open browser DevTools (F12)"
echo "[ ] 3. Check Network tab for API calls"
echo "[ ] 4. Test Login functionality"
echo "[ ] 5. Test Movie browsing"
echo "[ ] 6. Test Booking creation"
echo "[ ] 7. Test Payment (if configured)"
echo ""

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Your app is now live! 🚀"
echo ""
echo "Frontend: https://your-site.netlify.app"
echo "Backend: https://your-backend.onrender.com"
echo ""
