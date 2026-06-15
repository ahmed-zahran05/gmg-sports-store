# GMG Sports — Netlify Deployment Guide

## Prerequisites

- [Netlify account](https://netlify.com) (free tier works)
- [Supabase project](https://supabase.com) with Auth enabled
- Git repository (GitHub, GitLab, or Bitbucket)

---

## Step 1 — Push to Git

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/gmg-sports.git
git push -u origin main
```

Make sure `.env.local` is in `.gitignore` (it already is — never commit real credentials).

---

## Step 2 — Create a New Netlify Site

1. Log in to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Connect your Git provider and select this repository
4. Netlify will auto-detect Next.js and pre-fill:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Do **not** click Deploy yet — set environment variables first (Step 3)

---

## Step 3 — Set Environment Variables in Netlify

In Netlify: **Site configuration → Environment variables → Add a variable**

Add these two required variables:

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://nmyzqekuqeneahzuhnap.supabase.co` | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |

> These values are in your local `.env.local` file.

---

## Step 4 — Deploy

Click **Deploy site**. Netlify will:

1. Install `@netlify/plugin-nextjs` automatically (declared in `netlify.toml`)
2. Run `npm run build`
3. Deploy static pages as CDN assets
4. Deploy `/products/[productId]` as a serverless function (it's dynamic)

Build time is approximately 1–2 minutes.

---

## Step 5 — Configure Supabase for Production

After deploy, Netlify gives you a URL like `https://your-site-name.netlify.app`.

**In your Supabase dashboard:**

1. Go to **Authentication → URL Configuration**
2. Set **Site URL** to your Netlify URL:
   ```
   https://your-site-name.netlify.app
   ```
3. Under **Redirect URLs**, add:
   ```
   https://your-site-name.netlify.app/**
   ```
4. Click **Save**

This ensures password reset emails and email confirmation links redirect to the correct domain.

---

## Step 6 — Custom Domain (Optional)

1. In Netlify: **Domain management → Add a domain**
2. Follow the DNS configuration steps
3. Once live, update the Supabase **Site URL** and **Redirect URLs** to your custom domain

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase public anon key |
| `CLOUDINARY_CLOUD_NAME` | No | Cloudinary cloud name (for product image uploads) |
| `CLOUDINARY_API_KEY` | No | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | No | Cloudinary API secret |

---

## Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"
```

---

## Route Behaviour After Deploy

| Route | Type | Notes |
|-------|------|-------|
| `/` | Static | Served from CDN |
| `/products` | Static | Client-side filtering |
| `/products/[productId]` | Serverless | Dynamic per product |
| `/cart` | Static | Client-side Zustand |
| `/checkout` | Static | Client-side |
| `/wishlist` | Static | Client-side Zustand |
| `/auth/*` | Static | Calls Supabase directly |
| `/_not-found` | Static | |

---

## Troubleshooting

**Build fails with "Missing Supabase environment variables"**
→ Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Netlify's environment variables panel before deploying.

**Images not loading (Unsplash)**
→ Already allowlisted in `next.config.ts`. No action needed.

**Auth redirect goes to localhost after login**
→ Update Supabase Site URL and Redirect URLs to your production domain (Step 5).

**`@netlify/plugin-nextjs` not found**
→ Netlify auto-installs it. If the build fails, add it manually:
```bash
npm install --save-dev @netlify/plugin-nextjs
```

**Dynamic routes 404 after deploy**
→ The `netlify.toml` plugin handles this. Ensure the file is committed to your repository root.
