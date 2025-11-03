# CineBook Deployment Guide - Render (Backend) + Netlify (Frontend)

Complete step-by-step guide to deploy your CineBook application to production.

---

## Table of Contents

1. [MongoDB Atlas Setup (Move from Local to Cloud)](#mongodb-atlas-setup)
2. [Backend Deployment on Render](#backend-deployment-on-render)
3. [Frontend Deployment on Netlify](#frontend-deployment-on-netlify)
4. [Post-Deployment Configuration](#post-deployment-configuration)
5. [Verification Checklist](#verification-checklist)

---

## MongoDB Atlas Setup

### Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Sign Up** (or Sign In if you have an account)
3. Create a free account (M0 tier - perfect for learning/small apps)
4. Complete email verification

### Step 2: Create a New Project

1. After login, click **Create a Project**
2. Name it `CineBook`
3. Click **Create Project**

### Step 3: Create a Cluster

1. Click **Create Deployment** or **Build a Database**
2. Choose **M0 (Free)** tier
3. Select your preferred cloud provider and region (choose closest to your app)
4. Click **Create Deployment**
5. Wait 5-10 minutes for cluster creation

### Step 4: Set Up Database Access

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Enter username: `cinebook_user`
4. Enter password: `[Generate strong password - save this!]`
5. Click **Add User**

### Step 5: Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (or enter specific IPs for security)
4. Click **Confirm**

### Step 6: Get MongoDB Connection String

1. Go to **Databases** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Drivers**
4. Copy the connection string
5. It will look like: `mongodb+srv://cinebook_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Replace `<password>` with your actual password
7. **SAVE THIS CONNECTION STRING** - you'll need it for Render

**Example Connection String:**

```
mongodb+srv://cinebook_user:your_strong_password@cluster0.abc123.mongodb.net/cinebook?retryWrites=true&w=majority
```

---

## Backend Deployment on Render

### Step 1: Prepare Your Backend

#### 1.1 Update `backend/package.json` start script

Make sure your `package.json` has the correct start script:

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

#### 1.2 Ensure Environment Variables Are Used

In `backend/src/index.js`, make sure:

- PORT is read from `process.env.PORT`
- MONGO_URI is read from `process.env.MONGO_URI`
- CORS is properly configured

```javascript
const PORT = process.env.PORT || 5000;
```

#### 1.3 Configure CORS for Frontend URL

Update your backend CORS configuration in `backend/src/index.js`:

```javascript
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
```

### Step 2: Push Code to GitHub

1. Initialize git (if not already done):

```bash
cd /Users/mohitsharma/Desktop/Movie\ fe+be
git init
git add .
git commit -m "Initial commit - ready for production deployment"
```

2. Create a GitHub repository:

   - Go to [GitHub](https://github.com/new)
   - Create a new repository named `cinebook`
   - Don't initialize with README (you already have one)

3. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/cinebook.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

### Step 3: Create Render Account & Deploy Backend

1. Go to [Render.com](https://render.com)
2. Click **Sign Up** (GitHub recommended)
3. Authorize Render to access your GitHub

### Step 4: Create Backend Service on Render

1. In Render dashboard, click **New +** → **Web Service**
2. Select your `cinebook` GitHub repository
3. Configure:

   - **Name**: `cinebook-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (or paid if needed)

4. Click **Create Web Service**
5. Wait for deployment to complete

### Step 5: Add Environment Variables to Render

1. After service is created, go to **Environment**
2. Add the following environment variables:

```
MONGO_URI=mongodb+srv://cinebook_user:YOUR_PASSWORD@cluster0.abc123.mongodb.net/cinebook?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_this_to_something_random
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=production
```

3. Click **Save**
4. Service will auto-redeploy with new variables

### Step 6: Get Your Backend URL

1. In Render, go to your service
2. At the top, you'll see your service URL (something like `https://cinebook-backend-xxxxx.onrender.com`)
3. **SAVE THIS URL** - you'll need it for frontend

---

## Frontend Deployment on Netlify

### Step 1: Prepare Your Frontend

#### 1.1 Create `.env.production` file

In `frontend/` directory, create `.env.production`:

```env
VITE_API_BASE_URL=https://cinebook-backend-xxxxx.onrender.com/api
```

Replace with your actual Render backend URL from Step 6 above.

#### 1.2 Verify Vite Config

Your `frontend/vite.config.js` should have:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

#### 1.3 Update API Service

In `frontend/src/services/api.js`, make sure it uses the environment variable:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### Step 2: Deploy Frontend on Netlify

#### 2.1 Create Netlify Account

1. Go to [Netlify](https://app.netlify.com)
2. Click **Sign up**
3. Choose **GitHub** for authentication
4. Authorize Netlify

#### 2.2 Connect GitHub Repository

1. In Netlify, click **Add new site** → **Import an existing project**
2. Choose **GitHub**
3. Select your `cinebook` repository

#### 2.3 Configure Build Settings

1. **Owner**: Select your account
2. **Repository**: `cinebook`
3. **Branch**: `main`
4. **Build command**: `npm run build`
5. **Publish directory**: `frontend/dist`

#### 2.4 Add Environment Variables

1. Before deploying, click **Advanced**
2. Click **New variable**
3. Add:

   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://cinebook-backend-xxxxx.onrender.com/api`

4. Click **Deploy site**

#### 2.5 Wait for Deployment

1. Netlify will build and deploy
2. Once complete, you'll get a URL like `https://cinebook-xxxxxx.netlify.app`
3. **SAVE THIS URL** - this is your live frontend!

---

## Post-Deployment Configuration

### Step 1: Update Backend CORS

1. Go back to **Render**
2. Update your backend's environment variable:

   - **FRONTEND_URL**: `https://cinebook-xxxxxx.netlify.app`

3. Service will auto-redeploy

### Step 2: Test API Connection

1. Go to your frontend URL
2. Open browser developer console (F12)
3. Check Network tab to ensure API calls are going to your Render backend
4. Test login functionality

### Step 3: Configure Custom Domain (Optional)

**For Netlify (Frontend):**

1. In Netlify, go to **Domain Management**
2. Click **Add domain**
3. Follow instructions to point your domain

**For Render (Backend):**

1. In Render, go to **Settings**
2. Click **Add Custom Domain**
3. Follow instructions

---

## Verification Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] MongoDB user credentials saved securely
- [ ] Code pushed to GitHub
- [ ] Render backend service deployed
- [ ] Environment variables added to Render
- [ ] Backend service is healthy (check logs in Render)
- [ ] Backend API endpoint responding (`/api/health`)
- [ ] Frontend `.env.production` created with correct backend URL
- [ ] Frontend deployed on Netlify
- [ ] Frontend loading and connecting to backend API
- [ ] Login functionality works
- [ ] Movie browsing works
- [ ] Booking creation works
- [ ] Payment processing works (if configured)
- [ ] Admin dashboard accessible (if configured)

---

## Troubleshooting

### Backend Not Connecting to MongoDB

**Problem**: Backend logs show MongoDB connection error

**Solution**:

1. Check MongoDB Atlas:
   - User credentials correct
   - IP whitelist includes "Allow anywhere" or your Render IP
   - Connection string has correct password
2. In Render, check environment variables in **Settings** → **Environment**

### Frontend Not Connecting to Backend

**Problem**: API calls failing in frontend

**Solution**:

1. Check CORS settings in backend code
2. Verify `VITE_API_BASE_URL` is correct in Netlify environment variables
3. Check browser console for exact error message
4. Make sure Render backend is running (check status in Render dashboard)

### Build Failing on Netlify

**Problem**: Deployment fails during build

**Solution**:

1. Check build logs in Netlify (**Deploys** → click failed build)
2. Ensure all dependencies are in `package.json`
3. Run `npm run build` locally to test
4. Check for TypeScript/ESLint errors

### Render Service Going to Sleep

**Problem**: API takes long time to respond after inactivity

**Solution**:

1. Upgrade to paid instance on Render
2. Or use a monitoring service (e.g., Uptime Robot) to ping health endpoint

---

## Environment Variables Summary

### Backend (Render) - Essential Variables

```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-netlify-site.netlify.app
NODE_ENV=production
PORT=3000 (Render assigns this automatically)
```

### Frontend (Netlify) - Essential Variables

```
VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
```

---

## Useful Commands

### Local Testing Before Deployment

```bash
# Test backend locally with production env vars
NODE_ENV=production npm start

# Test frontend build locally
npm run build
npm run preview
```

### Checking Logs

**Render Backend Logs**:

- In Render dashboard → Your service → **Logs** tab

**Netlify Frontend Logs**:

- In Netlify dashboard → Your site → **Deploys** tab → Click latest deploy

---

## Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Deploy backend on Render
3. ✅ Deploy frontend on Netlify
4. ✅ Test all functionality
5. ✅ Set up custom domains (optional)
6. ✅ Configure analytics/monitoring
7. ✅ Set up backup strategy for MongoDB

---

## Support Resources

- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [React/Vite Deployment Guide](https://vitejs.dev/guide/build.html)

Good luck with your deployment! 🚀
