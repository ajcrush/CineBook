# GitHub Actions Setup Guide

## How to Use GitHub Actions for Docker Hub

### Step 1: Add GitHub Secrets

You need to add your Docker Hub credentials as GitHub Secrets:

1. Go to your GitHub repository: https://github.com/ajcrush/CineBook
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

#### Secret 1: `DOCKERHUB_USERNAME`

- **Name**: `DOCKERHUB_USERNAME`
- **Value**: `fkdjshsus` (your Docker Hub username)

#### Secret 2: `DOCKERHUB_TOKEN`

- **Name**: `DOCKERHUB_TOKEN`
- **Value**: Your Docker Hub Personal Access Token (PAT)

**To get your Docker Hub PAT:**

1. Go to https://app.docker.com/settings/personal-access-tokens
2. Click **Generate new token**
3. Give it a name like "github-actions"
4. Select permissions: **Read, Write, Delete**
5. Copy the token and paste it in GitHub Secrets

---

### Step 2: Workflows Available

You now have **two workflows**:

#### **1. CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)

- Runs on: push to `main` and `develop`, pull requests
- Does: Linting, Testing, Security Scan, Build Images to GHCR
- Pushes to: GitHub Container Registry (GHCR)

#### **2. Docker Hub Push** (`.github/workflows/docker-hub-push.yml`)

- Runs on: push to `main` and `develop`, tags
- Does: Build and Push to Docker Hub with smart tagging
- Pushes to: Docker Hub (your account)

---

### Step 3: Automatic Tagging Strategy

The Docker Hub workflow automatically tags images based on the branch/tag:

#### **Main Branch** (`main`)

```
Backend: fkdjshsus/cinebook-backend:latest, fkdjshsus/cinebook-backend:<commit-sha>
Frontend: fkdjshsus/cinebook-frontend:latest, fkdjshsus/cinebook-frontend:<commit-sha>
```

#### **Develop Branch** (`develop`)

```
Backend: fkdjshsus/cinebook-backend:develop, fkdjshsus/cinebook-backend:dev-<commit-sha>
Frontend: fkdjshsus/cinebook-frontend:develop, fkdjshsus/cinebook-frontend:dev-<commit-sha>
```

#### **Release Tags** (`v1.0.0`)

```
Backend: fkdjshsus/cinebook-backend:v1.0.0, fkdjshsus/cinebook-backend:latest
Frontend: fkdjshsus/cinebook-frontend:v1.0.0, fkdjshsus/cinebook-frontend:latest
```

---

### Step 4: How It Works

1. **You push code** to GitHub (`main`, `develop`, or create a tag)
2. **GitHub Actions triggers** automatically
3. **Tests & Linting run** (if you want to add them)
4. **Docker images are built** from your Dockerfile
5. **Images are pushed** to Docker Hub
6. **Workflow completes** - images are now live!

---

### Step 5: Using Images in Deployment

After images are pushed, you can pull them anywhere:

```bash
# Pull and run the latest frontend
docker pull fkdjshsus/cinebook-frontend:latest
docker run -p 80:80 fkdjshsus/cinebook-frontend:latest

# Pull and run the latest backend
docker pull fkdjshsus/cinebook-backend:latest
docker run -p 5000:5000 fkdjshsus/cinebook-backend:latest
```

Or use in docker-compose:

```yaml
services:
  backend:
    image: fkdjshsus/cinebook-backend:latest
    ports:
      - "5077:5000"

  frontend:
    image: fkdjshsus/cinebook-frontend:latest
    ports:
      - "80:80"
```

---

### Step 6: View Workflow Status

1. Go to your GitHub repo
2. Click on **Actions** tab
3. You'll see your workflows running
4. Click on a workflow to see detailed logs

---

### Step 7: Troubleshooting

#### Workflow Failed - Authentication Error?

- Check your `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets are correct
- Regenerate your PAT if needed: https://app.docker.com/settings/personal-access-tokens

#### Workflow Failed - Build Error?

- Check the logs in GitHub Actions
- Verify your Dockerfile is correct
- Test building locally first: `docker build -t test .`

#### Images Not Appearing on Docker Hub?

- Go to https://hub.docker.com and refresh
- Check the "Activities" tab to see push history
- View logs in GitHub Actions for error details

---

### Step 8: Manual Workflow Trigger

You can manually trigger the workflow without pushing:

1. Go to **Actions** tab
2. Select **Build and Push to Docker Hub**
3. Click **Run workflow**
4. Select the branch
5. Click **Run workflow** button

---

## Quick Commands

```bash
# View workflow status
git log --oneline -5

# Push to main (triggers workflow)
git push origin main

# Create a release tag (triggers workflow)
git tag v1.0.0
git push origin v1.0.0

# View Docker Hub images
docker images | grep cinebook
```

---

## Next Steps

1. ✅ Add GitHub Secrets (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`)
2. ✅ Push code to trigger workflow
3. ✅ Monitor **Actions** tab
4. ✅ Verify images on Docker Hub
5. ✅ Deploy images using the automated workflow!

---

For more info, see:

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Docker Hub API](https://docs.docker.com/docker-hub/api/)
