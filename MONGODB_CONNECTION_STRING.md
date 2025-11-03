# ✅ Your MongoDB Connection String - Setup Guide

## Your Connection String

```
mongodb+srv://redmi4ams_db_user:FJnAJmikZ1L1rnGH@cluster0.n6tqhte.mongodb.net/?appName=Cluster0
```

---

## Important: Add Database Name

Your connection string needs to include the database name. Update it to:

```
mongodb+srv://redmi4ams_db_user:FJnAJmikZ1L1rnGH@cluster0.n6tqhte.mongodb.net/cinebook?retryWrites=true&w=majority&appName=Cluster0
```

**Changes made:**

- Added `/cinebook` - your database name
- Added `?retryWrites=true&w=majority` - MongoDB best practices

---

## Step 1: Test Connection Locally

Before deploying, verify your connection works:

```bash
# Navigate to backend
cd /Users/mohitsharma/Desktop/Movie\ fe+be/backend

# Create a test .env file
cat > .env.test << 'EOF'
MONGO_URI=mongodb+srv://redmi4ams_db_user:FJnAJmikZ1L1rnGH@cluster0.n6tqhte.mongodb.net/cinebook?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
JWT_SECRET=test_secret_12345
PORT=5000
EOF

# Start the backend
npm start
```

**Expected output in logs:**

```
MongoDB connected
Server running on port 5000
```

If you see this, your connection string works! ✅

---

## Step 2: Test the Connection

In another terminal, test the API:

```bash
curl http://localhost:5000/api/health
```

**Expected response:**

```json
{ "status": "Backend is running" }
```

---

## Step 3: Update .env.production for Render

Update your `backend/.env.production`:

```bash
MONGO_URI=mongodb+srv://redmi4ams_db_user:FJnAJmikZ1L1rnGH@cluster0.n6tqhte.mongodb.net/cinebook?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_random_jwt_secret_here
FRONTEND_URL=https://your-netlify-site.netlify.app
NODE_ENV=production
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

---

## Step 4: Verify Your Database

Check what's in your MongoDB:

```bash
# Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Click "New Connection"
3. Paste your connection string:
   mongodb+srv://redmi4ams_db_user:FJnAJmikZ1L1rnGH@cluster0.n6tqhte.mongodb.net/cinebook
4. Click "Connect"
5. You should see your databases and collections

# OR using command line
mongosh "mongodb+srv://redmi4ams_db_user:FJnAJmikZ1L1rnGH@cluster0.n6tqhte.mongodb.net/cinebook"
# Then type: show collections
```

---

## Step 5: Ready for Deployment!

Now you can:

1. ✅ Deploy backend to Render (add MONGO_URI to environment variables)
2. ✅ Deploy frontend to Netlify
3. ✅ Everything will work together!

---

## Connection String Breakdown

```
mongodb+srv://redmi4ams_db_user:FJnAJmikZ1L1rnGH@cluster0.n6tqhte.mongodb.net/cinebook?retryWrites=true&w=majority&appName=Cluster0
│              │                    │                  │                            │        │                    │
└──────┬───────┘                    │                  │                            │        │                    │
   Protocol             Username:Password          Host        Database Name         └───────┴────────────────────┘
                                                                                        Query Parameters
                                                                                        (Best practices)
```

| Part     | Value                          | Meaning                      |
| -------- | ------------------------------ | ---------------------------- |
| Protocol | `mongodb+srv`                  | Secure connection            |
| Username | `redmi4ams_db_user`            | Your database user           |
| Password | `FJnAJmikZ1L1rnGH`             | Your password (keep secret!) |
| Host     | `cluster0.n6tqhte.mongodb.net` | Your MongoDB cluster         |
| Database | `cinebook`                     | Database name                |
| Retries  | `retryWrites=true`             | Automatic retry on failure   |
| Majority | `w=majority`                   | Write to multiple servers    |
| AppName  | `Cluster0`                     | Application name (optional)  |

---

## Security Notes

⚠️ **IMPORTANT:**

- ✅ This connection string includes your password
- ✅ Never commit this to GitHub
- ✅ Use `.env.production` files that are `.gitignore`'d
- ✅ On Render, store in Environment Variables section (not code)
- ✅ On Netlify, store in Environment Variables section (not code)

---

## Deployment Checklist

Now that you have your MongoDB connection string:

- [ ] Test locally with `npm start` (should say "MongoDB connected")
- [ ] Update `backend/.env.production` with your connection string
- [ ] Commit code to GitHub (but NOT the .env file!)
- [ ] Deploy backend to Render
- [ ] Add MONGO_URI to Render environment variables
- [ ] Deploy frontend to Netlify
- [ ] Add VITE_API_BASE_URL to Netlify environment variables
- [ ] Update FRONTEND_URL on Render after Netlify deployment
- [ ] Test your live app

---

## Quick Reference Commands

```bash
# Test connection locally
npm start

# Test API
curl http://localhost:5000/api/health

# Test MongoDB
mongosh "mongodb+srv://redmi4ams_db_user:FJnAJmikZ1L1rnGH@cluster0.n6tqhte.mongodb.net/cinebook"

# Generate JWT secret for backend
openssl rand -base64 32

# Build and test frontend
npm run build && npm run preview
```

---

## Next Steps

1. ✅ Test locally (run npm start, should connect)
2. ✅ Follow `DEPLOYMENT_ACTION_PLAN.md` Phase 2 (Push to GitHub)
3. ✅ Follow `DEPLOYMENT_ACTION_PLAN.md` Phase 3 (Deploy to Render)
4. ✅ Follow `DEPLOYMENT_ACTION_PLAN.md` Phase 4 (Deploy to Netlify)

**You're ready! Your app will go live! 🚀**
