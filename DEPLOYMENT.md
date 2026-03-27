# Deployment Guide

## Step-by-Step Deployment Instructions

### Prerequisites

1. Node.js 18+ installed
2. A Supabase account (free tier)
3. A Vercel or Netlify account (free tier)

---

## Phase 1: Set Up Supabase Database

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project" or "Sign In"
3. Sign up with GitHub, Google, or email

### Step 2: Create New Project
1. Click "New Project"
2. Fill in:
   - **Name**: expense-tracker (or any name)
   - **Database Password**: Choose a strong password (save it)
   - **Region**: Choose closest to your location
3. Click "Create new project"
4. Wait 2-3 minutes for setup

### Step 3: Run Database Schema
1. In your project dashboard, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql`
4. Paste into the SQL editor
5. Click "Run" or press Ctrl+Enter (Cmd+Enter on Mac)
6. You should see "Success. No rows returned"

### Step 4: Get API Credentials
1. Click "Settings" (gear icon) in the left sidebar
2. Click "API"
3. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbG...` (long string)

---

## Phase 2: Configure Local Project

### Step 5: Install Dependencies
```bash
npm install
```

### Step 6: Create Environment File
```bash
# On Windows (PowerShell)
copy .env.example .env

# On Mac/Linux
cp .env.example .env
```

### Step 7: Edit .env File
Open `.env` and replace:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

With your actual values from Step 4.

### Step 8: Test Locally
```bash
npm run dev
```

Open browser to `http://localhost:3000` and test:
- Enter default PIN: `1234`
- Add an expense
- Check if it appears in the list

---

## Phase 3: Deploy to Vercel (Recommended)

### Step 9: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 10: Login to Vercel
```bash
vercel login
```

### Step 11: Build Project
```bash
npm run build
```

### Step 12: Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** Y
- **Which scope?** (select your account)
- **Link to existing project?** N
- **Project name?** expense-tracker-pwa (or any name)
- **In which directory is your code?** .
- **Want to override the settings?** N

### Step 13: Set Environment Variables on Vercel
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to "Settings" → "Environment Variables"
4. Add the following variables:
   - Name: `VITE_SUPABASE_URL`, Value: your Supabase URL
   - Name: `VITE_SUPABASE_ANON_KEY`, Value: your Supabase anon key
5. Click "Save"

### Step 14: Redeploy
```bash
vercel --prod
```

Your app is now live! Copy the production URL.

---

## Phase 4: Deploy to Netlify (Alternative)

### Step 9 (Alt): Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 10 (Alt): Login
```bash
netlify login
```

### Step 11 (Alt): Build
```bash
npm run build
```

### Step 12 (Alt): Deploy
```bash
netlify deploy --prod --dir=dist
```

### Step 13 (Alt): Set Environment Variables
```bash
# Replace with your actual values
netlify env:set VITE_SUPABASE_URL https://your-project-id.supabase.co
netlify env:set VITE_SUPABASE_ANON_KEY your-anon-key
```

### Step 14 (Alt): Redeploy
```bash
netlify deploy --prod --dir=dist
```

---

## Phase 5: Install on iOS

### Step 15: Add to Home Screen
1. Open Safari on your iPhone/iPad
2. Navigate to your deployed URL
3. Tap the **Share** button (square with up arrow)
4. Scroll down and tap **"Add to Home Screen"**
5. Edit the name if desired (e.g., "Expenses")
6. Tap **"Add"** in the top right

The app icon will appear on your home screen like a native app.

---

## Troubleshooting

### App shows "Failed to fetch expenses"
- Check that your Supabase URL and anon key are correct in .env
- Ensure you ran the SQL schema in Supabase
- Check that Row Level Security is disabled (see supabase-schema.sql)

### Changes not appearing after deploy
- Environment variables may need a redeploy
- Run `vercel --prod` or `netlify deploy --prod` again

### PWA not working
- Ensure you're on HTTPS (Vercel/Netlify provide this automatically)
- Clear browser cache and reload

### Can't connect to Supabase
- Check your Supabase project is active (not paused)
- Verify the anon key has proper permissions

---

## Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| Supabase | Free Tier | $0/month |
| Vercel | Hobby | $0/month |
| Netlify | Starter | $0/month |
| **Total** | | **$0/month** |

### Free Tier Limits

**Supabase:**
- 500 MB database
- 50,000 monthly active users
- 2 GB bandwidth

**Vercel:**
- Unlimited deployments
- 100 GB bandwidth/month
- Suitable for personal projects

These limits are more than sufficient for personal expense tracking.

---

## Updating the App

After making code changes:

```bash
# 1. Test locally
npm run dev

# 2. Build
npm run build

# 3. Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=dist
```

Changes typically go live within 1-2 minutes.
