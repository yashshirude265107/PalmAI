# Deployment Guide

## Backend → Render

1. Push the `backend/` folder to a Git repository (or the whole monorepo — Render lets you set
   a root directory).
2. In the Render dashboard: **New → Web Service** → connect your repo.
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node version**: 18+
4. Add all variables from `backend/.env.example` under **Environment → Environment Variables**,
   with real values (MongoDB Atlas URI, OpenAI key, Cloudinary credentials, JWT secret, etc.).
5. Set `CLIENT_URL` to your deployed frontend URL (e.g. `https://palmai.vercel.app`) so CORS
   allows requests from it.
6. Deploy. Render will give you a URL like `https://palmai-backend.onrender.com`.

## Frontend → Vercel

1. Push the `frontend/` folder to a Git repository.
2. In Vercel: **New Project** → import the repo.
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js (auto-detected)
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = `https://palmai-backend.onrender.com/api`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = your Google OAuth client ID
5. Deploy. Vercel will give you a URL like `https://palmai.vercel.app`.
6. Go back to Render and confirm `CLIENT_URL` matches this exact URL (including `https://`, no
   trailing slash) so CORS works correctly.

## MongoDB Atlas Setup (if you don't already have a cluster)

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Under **Network Access**, allow access from anywhere (`0.0.0.0/0`) for simplicity, or add
   Render's static outbound IPs for tighter security.
3. Under **Database Access**, create a user with a strong password.
4. Copy the connection string and use it as `MONGODB_URI` (replace `<password>` and add the
   database name, e.g. `/palmai`, before the query params).

## Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com).
2. From the dashboard, copy your **Cloud Name**, **API Key**, and **API Secret** into the
   backend env vars.

## OpenAI Setup

1. Create an API key at [platform.openai.com](https://platform.openai.com).
2. Set `OPENAI_MODEL` to a real vision-capable model your account has access to (e.g. `gpt-4o`).
   The prompt in `backend/services/openaiService.js` is model-agnostic — no code changes needed
   when you upgrade models later.

## Google OAuth Setup

1. Create OAuth 2.0 credentials in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Add your frontend URL (both `http://localhost:3000` for dev and your production domain) to
   **Authorized JavaScript origins**.
3. Use the generated Client ID as both `GOOGLE_CLIENT_ID` (backend) and
   `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (frontend).

## Post-Deploy Checklist

- [ ] Visit `/api/health` on your backend URL — should return `{ "success": true, ... }`
- [ ] Sign up a test account on the deployed frontend
- [ ] Upload a palm photo and confirm a report is generated
- [ ] Download the PDF and image exports
- [ ] Confirm CORS works (no console errors about blocked origins)
- [ ] Rotate any secrets that were used during local testing before going live
