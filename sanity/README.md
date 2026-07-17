# Sanity Editorial Studio

The website includes an authenticated Sanity Studio at `/studio`. Sanity
handles editor authentication and document history; no admin password or write
token is stored in the public website.

## One-time connection

1. Sign in at <https://www.sanity.io/manage> and create a project.
2. Create or select the public `production` dataset.
3. Copy the project ID into `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-06-28"
SANITY_REVALIDATE_SECRET="generate-a-long-random-value"
```

4. In the Sanity project settings, add these CORS origins with credentials:
   - `http://localhost:3010`
   - `https://www.popeblack.com`
5. Restart the Next.js server and open <http://localhost:3010/studio>.
6. Sign in with the Sanity account that owns or has editor access to the project.

Until the project ID is set, the public blog shows a clean empty state and the
`/studio` route shows a safe setup screen. The blog index is sourced only from
published Sanity posts. There is no hardcoded or legacy article fallback.

## Publishing webhook

Create a Sanity webhook after production is deployed:

- URL: `https://www.popeblack.com/api/revalidate`
- Dataset: `production`
- Trigger on: create, update and delete
- Filter: `coalesce(after()._type, before()._type) == "post"`
- Projection: `{ "_type": coalesce(after()._type, before()._type), "slug": after().slug.current, "previousSlug": before().slug.current }`
- Secret: the same value used for `SANITY_REVALIDATE_SECRET`

The webhook is signature-checked. It refreshes the homepage, blog index,
affected article routes, newsletter archive and sitemap without exposing the
secret to browser JavaScript. Public queries also revalidate every 60 seconds
as a fallback if webhook delivery is delayed.

## Day-to-day publishing

1. Open `/studio` and select **Blog post**.
2. Select **Create new Blog post**.
3. Add the title, excerpt and article body.
4. Generate the URL slug from the title.
5. Set the publication date and time, content type, public visibility,
   optional category, author, tags and reading time.
6. Add an **Article cover image** and meaningful alternative text. A 1600 x
   900 pixel image is recommended.
7. Use **Feature this post** only for the article you want promoted first.
8. Select **Publish**. Drafts are not shown on the public site.

Leave publication date and time empty only when the document creation time is
the intended public date. Future-dated posts remain hidden until that time.

For externally published work, select **External or featured coverage** and add
the publication name and source URL. It can retain an internal direct route but
is excluded from the original-writing index.
