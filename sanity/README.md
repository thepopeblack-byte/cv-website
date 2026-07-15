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

Until the project ID is set, the public blog keeps using `data/articles.ts` and
the `/studio` route shows a safe setup screen.

After Sanity is connected, existing local articles remain visible. Creating a
Sanity post with the same slug replaces that local version, allowing the
existing articles to be migrated gradually without taking them offline.

## Publishing webhook

Create a Sanity webhook after production is deployed:

- URL: `https://www.popeblack.com/api/revalidate`
- Dataset: `production`
- Trigger on: create, update and delete
- Filter: `_type == "post"`
- Projection: `{ "_type": _type, "slug": slug.current }`
- Secret: the same value used for `SANITY_REVALIDATE_SECRET`

The webhook is signature-checked. It refreshes the homepage, blog index,
article route and sitemap without exposing the secret to browser JavaScript.

## Day-to-day publishing

1. Open `/studio` and select **Blog post**.
2. Select **Create new Blog post**.
3. Add the title, excerpt and article body.
4. Generate the URL slug from the title.
5. Set the publication date, type, author, tags and reading time.
6. Add meaningful alternative text to every uploaded image.
7. Use **Featured** only for the article you want promoted first.
8. Select **Publish**. Drafts are not shown on the public site.

For externally published work, add the publication name and source URL. The
website will retain the internal article page and show a safe external-source
link.
