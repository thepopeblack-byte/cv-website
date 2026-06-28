# Sanity Blog Setup

The site can read posts from Sanity when these public environment variables are set:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-06-28"
```

If `NEXT_PUBLIC_SANITY_PROJECT_ID` is empty, the blog automatically falls back to `data/articles.ts` so production builds do not fail.

The blog post schema lives in `sanity/schemas/post.ts` and supports title, slug, date, post type, source, author, excerpt, body, tags, cover image, external URL, reading time, featured status, why-it-matters copy, and key context bullets.
