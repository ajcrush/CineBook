# 🎬 CineBook Live Deployment - Action Plan

## Your Goal

Deploy CineBook application:

- **Backend**: Render
- **Frontend**: Netlify
- **Database**: MongoDB Atlas (move from local)

---

## Master Checklist

### 📦 STEP 1: Prepare Your Code (30 minutes)

- [ ] **Test everything locally**

  ```bash
  cd backend && npm start
  cd frontend && npm run dev
  ```

  - Test login
  - Test movie browsing
  - Test booking creation
  - Check browser console for errors

- [ ] **Verify environment variables are set**

  - Backend: Check `.env` has all keys
  - Frontend: Check `.env.local` or `.env.development` has API URL

- [ ] **Check package.json scripts**

  ```bash
  # Backend: Should have
  "start": "node src/index.js"
  "dev": "nodemon src/index.js"

  # Frontend: Should have
  "build": "vite build"
  "dev": "vite"
  ```

- [ ] **Verify production build works**
  ```bash
  # Frontend
  npm run build
  npm run preview  # Should open at localhost:4173
  ```

---

### 🗄️ STEP 2: MongoDB Atlas Setup (15 minutes)

**Read:** `MONGODB_MIGRATION_GUIDE.md` for detailed steps

- [ ] **Create MongoDB Atlas Account**

  - Go to https://www.mongodb.com/cloud/atlas
  - Sign up with email

- [ ] **Create Free M0 Cluster**

  - Name: CineBook
  - Provider: AWS
  - Region: Closest to you

- [ ] **Create Database User**

  - Username: `cinebook_user`
  - Password: Generate strong password (SAVE IT!)
  - Save password somewhere safe

- [ ] **Enable Network Access**
  - Add IP: "Allow Access from Anywhere" (for now)
- [ ] **Get Connection String**

  - From: Databases → Connect → Drivers
  - Format: `mongodb+srv://cinebook_user:PASSWORD@cluster0.xxxxx.mongodb.net/cinebook?retryWrites=true&w=majority`
  - Replace `<password>` with actual password
  - SAVE THIS STRING

- [ ] **Migrate Your Data (Optional)**

  - If you want to keep existing data:
    - Use MongoDB Compass to export/import
    - Or use `mongodump` and `mongorestore`
  - If starting fresh: Skip this

- [ ] **Test Connection Locally**
  ```bash
  # Update backend/.env with new MONGO_URI
  npm start
  # Should say "MongoDB connected" in logs
  ```

---

### 💻 STEP 3: GitHub Setup (10 minutes)

- [ ] **Create GitHub Repository**

  - Go to https://github.com/new
  - Repo name: `cinebook`
  - Don't initialize with README (you have one)
  - Click "Create repository"

- [ ] **Push Your Code**

  ```bash
  cd /Users/mohitsharma/Desktop/Movie\ fe+be
  git init
  git add .
  git commit -m "Initial commit - ready for production"
  git remote add origin https://github.com/YOUR_USERNAME/cinebook.git
  git branch -M main
  git push -u origin main
  ```

  **Replace `YOUR_USERNAME` with your GitHub username**

- [ ] **Verify on GitHub**
  - Visit your repo: https://github.com/YOUR_USERNAME/cinebook
  - Should see all your files

---

### 🚀 STEP 4: Deploy Backend on Render (20 minutes)

**Reference:** `DEPLOYMENT_RENDER_NETLIFY.md` (Backend section)

- [ ] **Create Render Account**

  - Go to https://render.com
  - Click "Sign Up"
  - Choose GitHub authentication
  - Authorize Render to access GitHub

- [ ] **Create Web Service**

  - Click "New +" → "Web Service"
  - Select your `cinebook` repository
  - Click "Connect"

- [ ] **Configure Service**

  - **Name**: `cinebook-backend`
  - **Environment**: Node
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Instance Type**: Free
  - Click "Create Web Service"

- [ ] **Wait for Initial Build**

  - Takes 5-10 minutes
  - Check logs for success
  - Should see "MongoDB connected" message

- [ ] **Get Service URL**

  - From Render dashboard
  - Will look like: `https://cinebook-backend-xxxxx.onrender.com`
  - **SAVE THIS URL**

- [ ] **Add Environment Variables**

  - Go to your service → "Environment"
  - Add these variables:
    ```
    MONGO_URI=mongodb+srv://cinebook_user:PASSWORD@cluster0.xxxxx.mongodb.net/cinebook?retryWrites=true&w=majority
    JWT_SECRET=generate_random_key_here_12345
    FRONTEND_URL=https://your-netlify-site.netlify.app (you'll update this later)
    NODE_ENV=production
    RAZORPAY_KEY_ID=your_key_here
    RAZORPAY_KEY_SECRET=your_secret_here
    STRIPE_SECRET_KEY=your_key_here
    ```
  - Click "Save"
  - Service auto-redeploys

- [ ] **Verify Backend is Working**
  - Visit: `https://your-backend-url.onrender.com/api/health`
  - Should return: `{"status":"Backend is running"}`

---

### 🎨 STEP 5: Deploy Frontend on Netlify (15 minutes)

**Reference:** `DEPLOYMENT_RENDER_NETLIFY.md` (Frontend section)

- [ ] **Update Frontend Config**

  - Create `frontend/.env.production`:
    ```env
    VITE_API_BASE_URL=https://cinebook-backend-xxxxx.onrender.com/api
    ```
  - Replace with your actual Render URL from STEP 4

- [ ] **Commit to GitHub**

  ```bash
  git add frontend/.env.production
  git commit -m "Add production environment variables"
  git push
  ```

- [ ] **Create Netlify Account**

  - Go to https://app.netlify.com
  - Click "Sign up"
  - Choose GitHub
  - Authorize Netlify

- [ ] **Create New Site**

  - Click "Add new site" → "Import an existing project"
  - Choose GitHub
  - Select `cinebook` repository

- [ ] **Configure Build Settings**

  - **Branch**: `main`
  - **Build command**: `npm run build`
  - **Publish directory**: `frontend/dist`

- [ ] **Add Environment Variables**

  - Click "Advanced" before deploying
  - Click "New variable"
  - Add:
    ```
    Name: VITE_API_BASE_URL
    Value: https://your-render-backend.onrender.com/api
    ```
  - Click "Deploy site"

- [ ] **Wait for Deployment**

  - Takes 3-5 minutes
  - Monitor in Netlify dashboard
  - Should complete successfully

- [ ] **Get Frontend URL**
  - From Netlify dashboard
  - Will look like: `https://cinebook-xxxxxx.netlify.app`
  - **SAVE THIS URL**

---

### ⚙️ STEP 6: Final Configuration (5 minutes)

- [ ] **Update Backend CORS**

  - Go to Render backend service
  - Go to "Environment"
  - Update `FRONTEND_URL`:
    ```
    FRONTEND_URL=https://your-netlify-site.netlify.app
    ```
  - Save (auto-redeploys)

- [ ] **Verify Environment Variables**
  - Backend (Render): 7-8 variables set ✓
  - Frontend (Netlify): 1 variable set ✓
  - No variables in git repo (use `.env.production` as template only)

---

### ✅ STEP 7: Test Everything (15 minutes)

Open your frontend URL: `https://your-site.netlify.app`

**Functional Tests:**

- [ ] **Page Loads Without Errors**

  - Open DevTools (F12)
  - Check Console tab (no red errors)
  - Check Network tab (no 404s except assets)

- [ ] **API Connection Works**

  - Network tab → search "api"
  - Should see requests to your Render backend
  - Response status should be 200

- [ ] **Login Works**

  - Go to Login page
  - Enter test credentials
  - Should redirect to home page
  - Should see username in navbar

- [ ] **Movies Load**

  - Go to home/movies page
  - Should see list of movies from MongoDB
  - Images should load
  - No API errors in console

- [ ] **Booking Works**

  - Click on a movie
  - Click "Book Now"
  - Select seats
  - Proceed to checkout
  - Should not have CORS errors

- [ ] **Payment Works** (if configured)

  - Complete booking flow
  - Payment page should load
  - No errors in console

- [ ] **Admin Features** (if configured)
  - Login as admin
  - Access admin dashboard
  - Create/edit movies, showtimes
  - Should work without errors

---

### 🧪 STEP 8: Performance & Monitoring (Optional)

- [ ] **Check Response Times**

  - Network tab in DevTools
  - API calls should be < 1 second
  - If slow, check Render logs

- [ ] **Check Error Logs**

  - Render backend logs
  - Netlify frontend logs
  - Should be no critical errors

- [ ] **Set Up Monitoring** (Optional)

  ```bash
  # For backend uptime monitoring, use:
  - Render's built-in monitoring
  - UptimeRobot (free tier)

  # For frontend:
  - Netlify Analytics
  - Google Analytics
  ```

---

## Deployment URLs to Keep Safe

```
🌐 Frontend (Netlify):     https://cinebook-xxxxxx.netlify.app
🖥️  Backend (Render):      https://cinebook-backend-xxxxx.onrender.com
🗄️  Database (Atlas):      mongodb+srv://cinebook_user:...@cluster0.xxxxx.mongodb.net/cinebook
👤 GitHub Repo:            https://github.com/YOUR_USERNAME/cinebook
```

---

## Important: Never Commit Sensitive Data

**DO NOT commit to GitHub:**

- Real MongoDB connection strings
- Real JWT secrets
- Real API keys (Stripe, Razorpay, etc.)
- Real passwords

**Use `.env.production` as template only with placeholders**

---

## File Checklist

These files should exist and be ready:

- ✅ `DEPLOYMENT_RENDER_NETLIFY.md` - Detailed deployment guide
- ✅ `MONGODB_MIGRATION_GUIDE.md` - MongoDB setup guide
- ✅ `LIVE_DEPLOYMENT_QUICK_GUIDE.md` - Quick reference
- ✅ `backend/.env.production` - Template with placeholders
- ✅ `frontend/.env.production` - Will be created during deployment
- ✅ `backend/src/index.js` - CORS configured ✓
- ✅ `frontend/src/services/api.js` - Uses env variables ✓

---

## Time Estimate

| Step                    | Time        | Status       |
| ----------------------- | ----------- | ------------ |
| Code prep & testing     | 30 min      | TODO         |
| MongoDB Atlas setup     | 15 min      | TODO         |
| GitHub setup            | 10 min      | TODO         |
| Render backend deploy   | 20 min      | TODO         |
| Netlify frontend deploy | 15 min      | TODO         |
| Final config            | 5 min       | TODO         |
| Testing                 | 15 min      | TODO         |
| **Total**               | **110 min** | **~2 hours** |

---

## Troubleshooting Quick Reference

| Issue                    | Check             | Fix                                   |
| ------------------------ | ----------------- | ------------------------------------- |
| Backend won't start      | Render logs       | Check MONGO_URI, check JWT_SECRET     |
| Can't connect to MongoDB | Connection string | Verify IP whitelist, password, format |
| Frontend 404 errors      | Network tab       | Check VITE_API_BASE_URL env var       |
| CORS errors              | Browser console   | Update FRONTEND_URL on Render         |
| Netlify build fails      | Build logs        | Run `npm run build` locally first     |
| Slow API responses       | Response times    | Upgrade Render instance (or normal)   |

---

## Support Documents

- 📖 `DEPLOYMENT_RENDER_NETLIFY.md` - Full deployment guide
- 📖 `MONGODB_MIGRATION_GUIDE.md` - MongoDB Atlas setup
- 📖 `LIVE_DEPLOYMENT_QUICK_GUIDE.md` - Quick checklist
- 📖 `README.md` - General project info

---

## After Going Live

1. ✅ Monitor logs regularly
2. ✅ Test functionality weekly
3. ✅ Keep backups of database
4. ✅ Update code and redeploy via git push
5. ✅ Monitor performance metrics
6. ✅ Set up alerts for errors
7. ✅ Plan for scaling if needed

---

**You're ready to deploy! Follow the checklist step by step. 🚀**

**Questions?** Check the detailed guides in your project directory.

**Start with:** Reading `MONGODB_MIGRATION_GUIDE.md` first!
