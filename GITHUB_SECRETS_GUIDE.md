# 📋 GitHub Actions Secrets Setup - Visual Guide

## 🎯 What You Need to Add

You need to add **2 secrets** to GitHub so that GitHub Actions can push images to Docker Hub on your behalf.

```
DOCKERHUB_USERNAME  → fkdjshsus
DOCKERHUB_TOKEN     → Your Docker Hub Personal Access Token (PAT)
```

---

## 📍 Step 1: Go to GitHub Repository Settings

### Visual Path:

```
GitHub.com
    ↓
Your Repository: https://github.com/ajcrush/CineBook
    ↓
Click "Settings" (top right)
    ↓
[Left Sidebar] → "Secrets and variables"
    ↓
Click "Actions"
```

**Screenshot Guide:**

```
┌────────────────────────────────────────────────────┐
│  GitHub Repository                                 │
│  ajcrush/CineBook                                  │
│                                                    │
│  [Code] [Issues] [Pull requests] [Settings] ← HERE│
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 🔐 Step 2: Add First Secret - DOCKERHUB_USERNAME

### Location:

```
Settings
  → Secrets and variables (Left Menu)
  → Actions
  → "Repository secrets" Section
  → Click "New repository secret" Button
```

### What You'll See:

```
┌─────────────────────────────────────────────┐
│  Repository secrets                         │
│  This repository has no secrets             │
│                                             │
│  [New repository secret] Button ← Click    │
└─────────────────────────────────────────────┘
```

### Fill in the Form:

```
Name:   DOCKERHUB_USERNAME
Value:  fkdjshsus

[Add secret] Button
```

**Result:**

```
┌─────────────────────────────────────────────┐
│  Repository secrets                         │
│  ✅ DOCKERHUB_USERNAME                      │
│     Last used: Never                        │
│     Created: Oct 30, 2025                   │
└─────────────────────────────────────────────┘
```

---

## 🔑 Step 3: Add Second Secret - DOCKERHUB_TOKEN

### Where to Get Your Docker Hub Token:

1. Go to: **https://app.docker.com/settings/personal-access-tokens**
2. Click **"Generate new token"**
3. Fill in:
   ```
   Token name: github-actions
   Description: For GitHub Actions CI/CD
   Permissions: ✅ Read, Write, Delete
   ```
4. Click **"Generate"**
5. **Copy the token** (you won't see it again!)

### Add to GitHub:

Go back to GitHub → Settings → Secrets and variables → Actions

Click **"New repository secret"** again

```
Name:   DOCKERHUB_TOKEN
Value:  [Paste your Docker Hub token here]

[Add secret] Button
```

**Result:**

```
┌─────────────────────────────────────────────┐
│  Repository secrets                         │
│  ✅ DOCKERHUB_USERNAME                      │
│     Last used: Never                        │
│                                             │
│  ✅ DOCKERHUB_TOKEN                         │
│     Last used: Never                        │
│     (Value is hidden for security)          │
└─────────────────────────────────────────────┘
```

---

## ✅ Step 4: Verify Both Secrets Are Added

### Final Check:

```
Settings → Secrets and variables → Actions
```

You should see:

```
┌───────────────────────────────────────────────┐
│  Repository secrets (2)                       │
│                                               │
│  Name                      Updated      Used  │
│  ─────────────────────────────────────────    │
│  ✅ DOCKERHUB_USERNAME     Oct 30, 2025  Never│
│  ✅ DOCKERHUB_TOKEN        Oct 30, 2025  Never│
│                                               │
│  [New repository secret]                      │
└───────────────────────────────────────────────┘
```

---

## 🧪 Step 5: Test It Out

### Push code to trigger GitHub Actions:

```bash
cd /Users/mohitsharma/Desktop/Movie\ fe+be

# Make a small change or just re-commit
git add .
git commit -m "Enable GitHub Actions with secrets"
git push origin main
```

### Watch it Work:

1. Go to GitHub → **Actions** tab
2. Click on the workflow that's running
3. Watch it build and push your Docker images!

```
┌─────────────────────────────────────┐
│  Build and Push to Docker Hub       │
│                                     │
│  ✅ Checkout code                  │
│  ✅ Set up Docker Buildx           │
│  ✅ Log in to Docker Hub           │
│  ✅ Determine tags                 │
│  ⏳ Build and push Backend image   │
│  ⏳ Build and push Frontend image  │
│                                     │
│  [View logs]                        │
└─────────────────────────────────────┘
```

---

## 🎯 Quick Reference

### The Two Secrets:

| Secret Name          | Value       | Where to Get                      |
| -------------------- | ----------- | --------------------------------- |
| `DOCKERHUB_USERNAME` | `fkdjshsus` | Your Docker Hub username          |
| `DOCKERHUB_TOKEN`    | Long string | Docker Hub Personal Access Tokens |

### Where to Add Them:

```
GitHub.com
  → Your Repository
    → Settings (Top Right)
      → Secrets and variables (Left Menu)
        → Actions (Tab)
          → New repository secret (Button)
```

### Path Format:

```
https://github.com/ajcrush/CineBook/settings/secrets/actions
```

---

## 🚨 Important Security Tips

⚠️ **NEVER:**

- Share your `DOCKERHUB_TOKEN` with anyone
- Commit it to your code
- Post it in public places
- Include it in log files

✅ **DO:**

- Keep it stored only in GitHub Secrets
- Regenerate it if you think it's compromised
- Use it ONLY for GitHub Actions

---

## ✨ After Setup - What Happens Automatically

Once secrets are added:

```
You push code
  ↓
GitHub detects push to main/develop
  ↓
GitHub Actions workflow starts
  ↓
Uses DOCKERHUB_USERNAME + DOCKERHUB_TOKEN from Secrets
  ↓
Builds Docker images
  ↓
Pushes to Docker Hub automatically
  ↓
✅ Done! No manual commands needed!
```

---

## 🔗 Useful Links

- GitHub Secrets: https://github.com/ajcrush/CineBook/settings/secrets/actions
- Docker Hub Tokens: https://app.docker.com/settings/personal-access-tokens
- Docker Hub Repository: https://hub.docker.com/r/fkdjshsus/cinebook-backend

---

## ❓ Troubleshooting

### Issue: "Authentication failed"

**Solution:**

- Check `DOCKERHUB_TOKEN` is correct
- Regenerate a new token if needed
- Verify `DOCKERHUB_USERNAME` matches your Docker Hub username

### Issue: "Secrets not found in workflow"

**Solution:**

- Make sure secrets are in **Repository secrets** (not Environment secrets)
- Make sure you named them exactly: `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`
- Restart the workflow (push new code or click "Run workflow")

### Issue: "Workflow not triggering"

**Solution:**

- Check `.github/workflows/docker-hub-push.yml` exists
- Make sure you pushed to `main` or `develop` branch
- Check Actions tab to see if workflow exists

---

## 🎉 You're All Set!

Once you complete these steps:
✅ Secrets are securely stored in GitHub
✅ Workflows can access them automatically
✅ Your Docker images will push automatically on every push
✅ No more manual docker commands needed!

**Next:** Push your code to trigger the workflow!

```bash
git push origin main
```

Then monitor: GitHub → Actions tab 🚀
