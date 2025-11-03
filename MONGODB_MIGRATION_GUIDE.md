# 📋 MongoDB Local → Cloud Migration Guide

## Why Move MongoDB to Cloud?

When you deploy your backend to Render, it cannot access MongoDB on your local machine. You need a cloud-based MongoDB instance that's accessible from anywhere.

---

## Option 1: MongoDB Atlas (Recommended - FREE)

MongoDB Atlas is the official managed MongoDB service. Free tier includes:

- ✅ 512MB storage (enough for testing/small apps)
- ✅ 3-node replica set
- ✅ Automatic backups
- ✅ 99.5% uptime SLA
- ✅ Web console

### Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Sign Up"**
3. Fill in:
   - Email: your email
   - Password: strong password
   - First Name: your name
   - Last Name: your name
4. Select: **"Create account with MongoDB"**
5. Click **"Sign Up"**
6. Check your email and verify

### Step 2: Create Organization & Project

1. After verification, click **"Create a project"**
2. Name: `CineBook`
3. Click **"Create Project"**

### Step 3: Create a Database Cluster

1. On the project page, click **"Build a Database"** or **"Create Deployment"**
2. Choose **"M0 (Free)"** tier
3. Select:
   - **Cloud Provider**: AWS (or your choice)
   - **Region**: Pick closest to your location (or `us-east-1`)
4. Scroll down and click **"Create Deployment"**
5. **Wait 5-10 minutes** while cluster is created

### Step 4: Create Database User

After cluster is created:

1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Fill in:
   - **Username**: `cinebook_user`
   - **Password**: Click **"Autogenerate Secure Password"** or enter your own
   - **Role**: `readWriteAnyDatabase`
4. **SAVE THE PASSWORD** (you'll need it!)
5. Click **"Add User"**

### Step 5: Configure Network Access

1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (your IP: 0.0.0.0/0)
   - For production: Enter specific IP addresses of your server
4. Click **"Confirm"**

### Step 6: Get Connection String

1. Go back to **"Databases"** (left sidebar)
2. Click your cluster → **"Connect"**
3. Choose **"Drivers"**
4. Select **"Node.js"** and **"3.12 or later"**
5. Copy the connection string

**It will look like:**

```
mongodb+srv://cinebook_user:<password>@cluster0.a1b2c3d.mongodb.net/?retryWrites=true&w=majority
```

### Step 7: Replace Placeholder in Connection String

The string has `<password>` placeholder. Replace it with your actual password:

**Before:**

```
mongodb+srv://cinebook_user:<password>@cluster0.a1b2c3d.mongodb.net/?retryWrites=true&w=majority
```

**After:**

```
mongodb+srv://cinebook_user:MyStr0ng#Pass123@cluster0.a1b2c3d.mongodb.net/?retryWrites=true&w=majority
```

### Step 8: Add Database Name

Append `/cinebook` to the connection string:

```
mongodb+srv://cinebook_user:MyStr0ng#Pass123@cluster0.a1b2c3d.mongodb.net/cinebook?retryWrites=true&w=majority
```

---

## Migrating Data from Local to Atlas

### Option A: Using MongoDB Compass (GUI - Easiest)

1. **Download** [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
2. **Connect to Local MongoDB**:
   - URI: `mongodb://localhost:27017`
   - Click "Connect"
3. **Select your database** (cinebook)
4. **Export each collection**:
   - Right-click collection → "Export Collection"
   - Save as JSON
5. **Connect to Atlas**:
   - Use your Atlas connection string
   - Click "Connect"
6. **Create database** `cinebook` (if not exists)
7. **Import collections**:
   - Right-click database → "Import Collection"
   - Select your JSON files

### Option B: Using Command Line (MongoDB Tools)

1. **Install MongoDB Database Tools**:

   ```bash
   # macOS
   brew tap mongodb/brew
   brew install mongodb-database-tools
   ```

2. **Export from Local MongoDB**:

   ```bash
   mongodump --db cinebook --out ./cinebook_backup
   ```

3. **Import to MongoDB Atlas**:
   ```bash
   mongorestore --uri "mongodb+srv://cinebook_user:PASSWORD@cluster0.a1b2c3d.mongodb.net/cinebook" --dir ./cinebook_backup/cinebook
   ```

### Option C: Start Fresh (Simplest)

If your data is just test data:

- Leave your local MongoDB alone
- Start fresh on MongoDB Atlas
- Add test data through your app's UI

---

## Verifying the Connection

### Test Locally Before Deployment

1. Update your `.env` file:

   ```env
   MONGO_URI=mongodb+srv://cinebook_user:PASSWORD@cluster0.a1b2c3d.mongodb.net/cinebook?retryWrites=true&w=majority
   ```

2. Test connection locally:

   ```bash
   cd backend
   npm start
   ```

3. Check logs for:

   ```
   MongoDB connected
   ```

4. Test API:
   ```bash
   curl http://localhost:5000/api/health
   # Should return: {"status":"Backend is running"}
   ```

### Using MongoDB Compass

1. Open MongoDB Compass
2. Paste connection string
3. Click "Connect"
4. Should see your databases

### Using Command Line

```bash
# Test connection
mongosh "mongodb+srv://cinebook_user:PASSWORD@cluster0.a1b2c3d.mongodb.net/cinebook"

# You should see: cinebook>
# Type: show collections
# Should list your collections
```

---

## Connection String Checklist

Before using connection string, verify:

- [ ] Username is correct: `cinebook_user`
- [ ] Password is correct and URL-encoded (spaces → %20)
- [ ] Cluster name is correct (check in Atlas dashboard)
- [ ] Database name is appended: `/cinebook`
- [ ] Parameters included: `?retryWrites=true&w=majority`
- [ ] IP whitelist allows your connection

---

## For Render Deployment

1. Copy your verified connection string
2. Go to Render dashboard
3. Open your backend service
4. Go to **"Environment"** tab
5. Add variable:
   - **Key**: `MONGO_URI`
   - **Value**: Your full connection string
6. Click **"Save"**
7. Service auto-redeploys

---

## For Local Development

1. Update `backend/.env`:

   ```env
   MONGO_URI=mongodb+srv://cinebook_user:PASSWORD@cluster0.a1b2c3d.mongodb.net/cinebook?retryWrites=true&w=majority
   ```

2. Restart your app:
   ```bash
   npm start
   ```

---

## Common Issues

### "Authentication Failed"

- Wrong password
- Username doesn't exist
- IP not whitelisted

**Fix:**

- Verify credentials in MongoDB Atlas
- Check Network Access settings
- Use "Allow Anywhere" for testing

### "Connection Timeout"

- Cluster still loading
- Network issue
- Wrong connection string

**Fix:**

- Wait for cluster to fully load
- Test connection in MongoDB Compass
- Verify connection string format

### "Server Selection Timed Out"

- IP is whitelisted but doesn't exist
- Firewall blocking connection

**Fix:**

- Add more IPs to whitelist
- Use "Allow Anywhere" temporarily
- Check firewall settings

### "Database Already Exists"

- Data from previous import still there
- This is normal, not an error

**Fix:**

- Clear database and start fresh OR
- Delete and recreate cluster

---

## Backup & Security

### Enable Automatic Backups (Atlas)

1. Go to Cluster → **"Backup"**
2. Click **"Enable Backup"**
3. Atlas handles automatic daily backups

### Download Backup

```bash
mongodump --uri "mongodb+srv://cinebook_user:PASSWORD@cluster0.a1b2c3d.mongodb.net/cinebook"
```

### Security Best Practices

- [ ] Never share connection string
- [ ] Use strong passwords (20+ characters)
- [ ] Limit IP whitelist in production
- [ ] Use separate users for dev/prod
- [ ] Enable two-factor authentication on Atlas account
- [ ] Regularly rotate passwords

---

## Upgrading from Free Tier

If you need more than 512MB:

1. Go to Atlas dashboard
2. Click **"Upgrade"** on your cluster
3. Choose paid tier (M2 - $9/month starts here)
4. Keep same connection string (no changes needed)

---

## Next Steps

After setting up MongoDB Atlas:

1. ✅ Commit connection string to `.env.production`
2. ✅ Test locally with new connection string
3. ✅ Deploy backend to Render
4. ✅ Add environment variable to Render
5. ✅ Deploy frontend to Netlify
6. ✅ Test live application

---

**Your MongoDB is now in the cloud! 🌩️☁️**
