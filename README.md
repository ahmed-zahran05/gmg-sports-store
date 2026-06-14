# Premium Commerce

A production-ready ecommerce storefront scaffold using Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui patterns, Supabase, Cloudinary, React Query, and Zustand.

## Features

- Modern premium storefront design
- Responsive layout
- Hero section
- Featured products and categories
- Product details page
- Shopping cart and wishlist
- Supabase authentication
- Search UI and SEO-friendly metadata
- Clean, feature-based architecture

## Project structure

- `app/` — Next.js app router pages and layouts
- `components/` — reusable UI components
- `lib/` — configuration, Supabase client, and demo data
- `stores/` — Zustand state stores for cart and wishlist

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

3. Run development server

```bash
npm run dev
```

## Notes

- Product data is seeded via `lib/data.ts` for the storefront demo.
- Replace Cloudinary image URLs and Supabase credentials with your own production assets.
- Use `app/providers.tsx` for shared client providers like React Query.
