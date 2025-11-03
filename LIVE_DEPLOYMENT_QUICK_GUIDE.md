# 🚀 CineBook Live Deployment - Quick Summary

## What You Need to Do

### 1. **MongoDB Local → Cloud (Atlas)**

Move your MongoDB database from local to MongoDB Atlas (free M0 tier)

**Steps:**

- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create free M0 cluster
- Create user: `cinebook_user` with password
- Get connection string: `mongodb+srv://cinebook_user:password@cluster0.xxxxx.mongodb.net/cinebook`
- Add IP whitelist (Allow Anywhere or specific IPs)

**Why:** Render backend can only connect to cloud databases, not your local machine

---

### 2. **Backend Deployment (Render)**

**Prerequisites:**

- Push code to GitHub
- Have MongoDB Atlas connection string

**Steps:**

1. Sign up at [Render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Add environment variables:
   ```
   MONGO_URI=your_mongodb_atlas_string
   JWT_SECRET=random_secret_key
   NODE_ENV=production
   FRONTEND_URL=https://your-netlify-site.netlify.app
   ```
5. Deploy (auto-builds from GitHub)

**Result:** Your backend runs at `https://cinebook-backend-xxxxx.onrender.com`

---

### 3. **Frontend Deployment (Netlify)**

**Prerequisites:**

- Backend URL from Render
- Update `frontend/.env.production` with backend URL

**Steps:**

1. Sign up at [Netlify](https://app.netlify.com)
2. Connect GitHub repository
3. Configure build:
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. Add environment variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
   ```
5. Deploy

**Result:** Your frontend runs at `https://your-site.netlify.app`

---

## Complete Checklist

### ✅ Pre-Deployment (Local)

- [ ] Code is working locally
- [ ] All environment variables are configured
- [ ] Tests pass (`npm test`)
- [ ] No console errors

### ✅ Phase 1: MongoDB Atlas

- [ ] Account created at mongodb.com/cloud/atlas
- [ ] Free M0 cluster created
- [ ] Database user created (cinebook_user)
- [ ] Connection string obtained and saved
- [ ] Network access configured
- [ ] Test connection locally with Compass

### ✅ Phase 2: GitHub

- [ ] Repository created
- [ ] Code pushed to GitHub
- [ ] All files committed (including env files with placeholders)

### ✅ Phase 3: Render Backend

- [ ] Account created
- [ ] GitHub connected
- [ ] Web Service created
- [ ] All environment variables added
- [ ] Build successful
- [ ] Service status is "Live"
- [ ] Backend URL saved

### ✅ Phase 4: Netlify Frontend

- [ ] Account created
- [ ] GitHub connected
- [ ] Build settings configured correctly
- [ ] Environment variables added
- [ ] Build successful
- [ ] Site deployed
- [ ] Frontend URL saved

### ✅ Phase 5: Integration Testing

- [ ] Frontend loads without errors
- [ ] API calls show correct backend URL in Network tab
- [ ] Login works
- [ ] Movie list loads
- [ ] Booking creation works
- [ ] Payment processing works (if configured)

---

## MongoDB Migration Steps

### From Local to Atlas

1. **Export data from local MongoDB:**

   ```bash
   mongodump --out ./backup
   ```

2. **Import to Atlas:**
   ```bash
   mongorestore --uri "mongodb+srv://user:password@cluster0.xxxxx.mongodb.net" ./backup
   ```

Or use MongoDB Compass GUI:

- Connect to local MongoDB
- Export each collection as JSON
- Connect to Atlas
- Import collections

---

## Environment Variables Overview

### Backend (Render Environment Variables)

| Variable              | Value                                      | Where to Get                        |
| --------------------- | ------------------------------------------ | ----------------------------------- |
| `MONGO_URI`           | `mongodb+srv://cinebook_user:password@...` | MongoDB Atlas                       |
| `JWT_SECRET`          | Random secure string                       | Generate: `openssl rand -base64 32` |
| `NODE_ENV`            | `production`                               | Set this                            |
| `FRONTEND_URL`        | `https://your-site.netlify.app`            | From Netlify deployment             |
| `RAZORPAY_KEY_ID`     | Your key                                   | Razorpay dashboard                  |
| `RAZORPAY_KEY_SECRET` | Your secret                                | Razorpay dashboard                  |
| `STRIPE_SECRET_KEY`   | Your key                                   | Stripe dashboard                    |

### Frontend (Netlify Environment Variables)

| Variable            | Value                                   | Where to Get           |
| ------------------- | --------------------------------------- | ---------------------- |
| `VITE_API_BASE_URL` | `https://your-backend.onrender.com/api` | From Render deployment |

---

## Common Issues & Solutions

### ❌ "Cannot connect to MongoDB"

**Cause:** Wrong connection string or IP not whitelisted
**Solution:**

- Check MongoDB Atlas connection string
- Verify IP is whitelisted (or use "Allow Anywhere")
- Test connection locally first

### ❌ "Frontend showing CORS errors"

**Cause:** CORS not configured or wrong frontend URL
**Solution:**

- Update backend CORS to include Netlify domain
- Ensure `FRONTEND_URL` is set correctly on Render
- Check browser console for exact error

### ❌ "API calls returning 404"

**Cause:** Wrong backend URL in frontend
**Solution:**

- Verify `VITE_API_BASE_URL` in Netlify is correct
- Check Network tab in DevTools
- Test backend URL directly in browser

### ❌ "Netlify build failing"

**Cause:** Missing dependencies or build errors
**Solution:**

- Run `npm run build` locally to test
- Check build logs in Netlify
- Ensure all packages are in `package.json`

### ❌ "Render service sleeping / slow"

**Cause:** Free tier goes to sleep after inactivity
**Solution:**

- Upgrade to paid instance (or keep free)
- Use uptime monitoring service (e.g., Uptime Robot)
- Ping health endpoint regularly

---

## Important Files to Create/Update

### Frontend

- ✅ `frontend/.env.production` - Add your backend URL
- ✅ `frontend/src/services/api.js` - Ensure it uses env variable

### Backend

- ✅ `backend/.env.production` - Template created
- ✅ `backend/src/index.js` - Verify CORS and port configuration

---

## Deployment URLs You'll Get

After deployment, save these URLs:

```
Frontend: https://[your-site-name].netlify.app
Backend:  https://[your-service-name].onrender.com
MongoDB:  mongodb+srv://cinebook_user:password@cluster0.xxxxx.mongodb.net
```

---

## Testing After Deployment

1. **Frontend loads:** https://your-site.netlify.app
2. **API responds:** https://your-backend.onrender.com/api/health
3. **Database connects:** Check Render logs for connection success
4. **User can login:** Test with existing credentials
5. **Movies load:** Verify data shows on landing page
6. **Booking works:** Create a test booking
7. **Payment processes:** Complete test transaction

---

## Next Steps After Going Live

1. ✅ Monitor logs on Render and Netlify
2. ✅ Set up error tracking (Sentry, LogRocket)
3. ✅ Configure custom domain (optional)
4. ✅ Set up MongoDB backups
5. ✅ Enable HTTPS (automatic on both platforms)
6. ✅ Set up analytics (Netlify Analytics, Google Analytics)
7. ✅ Configure CI/CD for auto-deployment on git push

---

## Useful Commands

```bash
# Test MongoDB connection locally
mongosh "mongodb+srv://cinebook_user:password@cluster0.xxxxx.mongodb.net/cinebook"

# Generate JWT secret
openssl rand -base64 32

# Test frontend build locally
npm run build && npm run preview

# View logs locally
node src/index.js (for backend)
npm run dev (for frontend)
```

---

## Support & Documentation

- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Express.js Production Checklist](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## Timeline Estimate

- MongoDB Atlas setup: **10 minutes**
- GitHub push: **5 minutes**
- Render deployment: **10-15 minutes** (including build)
- Netlify deployment: **5-10 minutes** (including build)
- Testing & fixing: **10-30 minutes**

**Total: 40-70 minutes for complete deployment**

---

**You're all set! Follow the checklist above and your CineBook will be live! 🎬🚀**
