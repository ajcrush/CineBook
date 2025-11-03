# 📱 CineBook Deployment - Visual Quick Reference

## The 3 Services

```
┌─────────────────────────────────────────────────────────────┐
│                   Your CineBook App                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────┐    ┌────────────────┐    ┌──────────┐ │
│  │   Netlify      │    │    Render      │    │  MongoDB │ │
│  │  (Frontend)    │    │   (Backend)    │    │  Atlas   │ │
│  │                │    │                │    │ (Cloud)  │ │
│  │ React App      │    │ Express API    │    │Database  │ │
│  │ Hosted at:     │───→│ Hosted at:     │───→│ Movies,  │ │
│  │ netlify.app    │    │ onrender.com   │    │ Bookings │ │
│  │                │    │                │    │ Users    │ │
│  │FREE            │    │FREE            │    │FREE (512MB)│
│  │🟢 Unlimited    │    │🟢 Unlimited    │    │🟡 Limited  │
│  │   bandwidth    │    │   requests     │    │  Storage   │
│  └────────────────┘    └────────────────┘    └──────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Your URLs (After Deployment)

```
🎨 Frontend:   https://cinebook-xxxxx.netlify.app
   └─ Browse movies, book seats, manage bookings

🖥️  Backend:    https://cinebook-backend-xxxxx.onrender.com
   ├─ /api/auth - Login/Register
   ├─ /api/movies - Get movies
   ├─ /api/bookings - Create bookings
   └─ /api/health - Check if running

🗄️  Database:   mongodb+srv://cinebook_user:password@cluster0.xxxxx.mongodb.net/cinebook
   └─ Store all data in the cloud
```

---

## Environment Variables Map

```
FRONTEND (Netlify)
├─ VITE_API_BASE_URL = "https://cinebook-backend-xxxxx.onrender.com/api"
└─ Tells frontend where to send API requests

BACKEND (Render)
├─ MONGO_URI = "mongodb+srv://cinebook_user:password@...mongodb.net/cinebook"
├─ JWT_SECRET = "random_secret_string_12345"
├─ FRONTEND_URL = "https://cinebook-xxxxx.netlify.app"
├─ RAZORPAY_KEY_ID = "your_key_here"
├─ RAZORPAY_KEY_SECRET = "your_secret_here"
├─ STRIPE_SECRET_KEY = "your_key_here"
└─ NODE_ENV = "production"
```

---

## Deployment Sequence

```
Step 1: MongoDB Atlas
┌──────────────────────┐
│ Create Account       │ 5 min
│ Create Cluster       │ 10 min
│ Get Connection String│ 5 min
└──────────────────────┘
         ↓
Step 2: GitHub
┌──────────────────────┐
│ Create Repo          │ 5 min
│ Push Code            │ 5 min
└──────────────────────┘
         ↓
Step 3: Render (Backend)
┌──────────────────────┐
│ Create Account       │ 5 min
│ Deploy Service       │ 20 min (build time)
│ Add Env Vars         │ 5 min
│ Get Backend URL      │ 1 min
└──────────────────────┘
         ↓
Step 4: Netlify (Frontend)
┌──────────────────────┐
│ Create Account       │ 5 min
│ Update Frontend Env  │ 2 min
│ Deploy Site          │ 15 min (build time)
│ Get Frontend URL     │ 1 min
└──────────────────────┘
         ↓
Step 5: Configure CORS
┌──────────────────────┐
│ Update Render        │ 3 min
│ Add FRONTEND_URL     │ Auto-redeploy
└──────────────────────┘
         ↓
Step 6: Test
┌──────────────────────┐
│ Open Frontend URL    │
│ Login                │ ✓
│ Browse Movies        │ ✓
│ Create Booking       │ ✓
│ Process Payment      │ ✓
└──────────────────────┘

TOTAL TIME: ~2 hours
```

---

## File Organization

```
cinebook/
│
├── 📖 DEPLOYMENT_README.md (START HERE!)
├── 📖 DEPLOYMENT_ACTION_PLAN.md (Follow this checklist)
├── 📖 DEPLOYMENT_RENDER_NETLIFY.md (Detailed guide)
├── 📖 MONGODB_MIGRATION_GUIDE.md (Move DB to cloud)
│
├── backend/
│   ├── .env.production (template)
│   ├── src/
│   │   └── index.js (CORS updated ✓)
│   └── package.json
│
└── frontend/
    ├── .env.production (create this)
    ├── src/
    │   └── services/api.js (uses env vars ✓)
    └── package.json
```

---

## Troubleshooting Flowchart

```
Is backend running?
├─ YES → Backend URL returns JSON
└─ NO  → Check Render logs
         ├─ Error: MongoDB connection → Check MONGO_URI
         ├─ Error: Build failed → Run npm start locally
         └─ Error: Port issue → Render assigns PORT automatically

Is frontend loading?
├─ YES → See UI
└─ NO  → Check Netlify logs
         ├─ Build error → Run npm run build locally
         ├─ Missing var → Check VITE_API_BASE_URL
         └─ Not deployed → Wait, check status

Can frontend call backend?
├─ YES → Network tab shows 200 response
└─ NO  → Check browser console
         ├─ CORS error → Update FRONTEND_URL on Render
         ├─ 404 error → Check VITE_API_BASE_URL
         └─ Connection refused → Backend might be sleeping
```

---

## Key Environment Variables

```
┌─────────────────────────────────────────────────────────┐
│ MONGO_URI (Backend - ESSENTIAL)                         │
├─────────────────────────────────────────────────────────┤
│ Format:                                                 │
│ mongodb+srv://user:password@cluster.mongodb.net/db     │
│                                                         │
│ Get from: MongoDB Atlas → Databases → Connect           │
│ Example:                                                │
│ mongodb+srv://cinebook_user:Abc123@cluster0.abc.../db  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ VITE_API_BASE_URL (Frontend - ESSENTIAL)               │
├─────────────────────────────────────────────────────────┤
│ Format: https://your-backend-url.onrender.com/api      │
│                                                         │
│ Get from: Render → Your service → Copy URL             │
│ Example:                                                │
│ https://cinebook-backend-xyz.onrender.com/api          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ JWT_SECRET (Backend)                                    │
├─────────────────────────────────────────────────────────┤
│ Generate: openssl rand -base64 32                       │
│ Purpose: Sign authentication tokens                     │
│ Example: abC123XyZ456...etc (random 32+ chars)         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ FRONTEND_URL (Backend - for CORS)                      │
├─────────────────────────────────────────────────────────┤
│ Format: https://your-site.netlify.app                  │
│                                                         │
│ Get from: Netlify → Copy your site URL                 │
│ Example:                                                │
│ https://cinebook-mysite.netlify.app                    │
└─────────────────────────────────────────────────────────┘
```

---

## One-Minute Summary

```
BEFORE:                      AFTER:
└─ Everything on laptop      ✓ Frontend on Netlify (internet)
                             ✓ Backend on Render (internet)
                             ✓ Database on MongoDB Atlas (cloud)
                             ✓ All 3 talk to each other
                             ✓ Your app is LIVE! 🚀
```

---

## Quick Links

| What            | Where         | Link                            |
| --------------- | ------------- | ------------------------------- |
| Create MongoDB  | MongoDB Atlas | https://mongodb.com/cloud/atlas |
| Deploy Backend  | Render        | https://render.com              |
| Deploy Frontend | Netlify       | https://app.netlify.com         |
| Push Code       | GitHub        | https://github.com              |
| Check Logs      | Render        | https://dashboard.render.com    |
| Check Logs      | Netlify       | https://app.netlify.com         |

---

## Checklist (Quick Version)

```
BEFORE DEPLOYMENT:
[ ] Code works locally
[ ] npm run build succeeds
[ ] No console errors

MONGODB:
[ ] Account created
[ ] Cluster running
[ ] User created
[ ] Connection string saved

GITHUB:
[ ] Repo created
[ ] Code pushed
[ ] All files visible

RENDER (Backend):
[ ] Account created
[ ] Service deployed
[ ] Environment variables added
[ ] Logs show "MongoDB connected"
[ ] /api/health works
[ ] Backend URL saved

NETLIFY (Frontend):
[ ] Account created
[ ] Site deployed
[ ] Environment variables added
[ ] Frontend loads without errors
[ ] Frontend URL saved

TESTING:
[ ] Frontend loads
[ ] API calls work
[ ] Login successful
[ ] Movies visible
[ ] Booking works
```

---

## Remember

✅ **Free tier is enough** for learning and initial users
✅ **You can upgrade anytime** without breaking anything
✅ **Your local setup stays the same** for development
✅ **Just push to GitHub** to update live app
✅ **Check logs often** when debugging issues

---

## Need Help?

1. **Stuck?** Read `DEPLOYMENT_ACTION_PLAN.md` step by step
2. **Details?** Check `DEPLOYMENT_RENDER_NETLIFY.md`
3. **MongoDB?** Read `MONGODB_MIGRATION_GUIDE.md`
4. **Quick help?** Use `LIVE_DEPLOYMENT_QUICK_GUIDE.md`

---

**Ready? Start with Step 1: MongoDB Atlas Setup! 🚀**
