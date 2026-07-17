# Blog Publishing Guide

## Where to edit

Open `https://www.popeblack.com/studio` after the Sanity project is connected.
For local testing, use `http://localhost:3010/studio`.

Sanity asks you to sign in. Only members invited to the Sanity project can
create, edit or publish posts.

## Create a post

1. Choose **Blog post** and then **Create new Blog post**.
2. Enter a clear title.
3. Write a short excerpt for the blog card and search preview.
4. Write the article using headings, paragraphs, links, lists and images.
5. Open the **Publishing** group and select **Generate** beside the URL slug.
6. Confirm the author, publication date and time, reading time, content type,
   public visibility, optional category and tags.
7. Upload an **Article cover image** at approximately 1600 x 900 pixels, then
   add meaningful alternative text and an optional caption.
8. Keep original articles set to **Original article** and **Public**.
9. Turn on **Feature this post** only when the post should lead the blog page.
10. Select **Publish**.

The post will appear at `/blog` and `/blog/your-slug`. Publishing triggers the
signed revalidation webhook, so no code edit or redeployment is needed.

The blog index contains published Sanity posts only. There are no local or
hardcoded fallback articles.

## Edit or remove a post

- Open the post, make the change and select **Publish** again.
- To remove a post from public indexes while retaining its direct URL, change
  **Public visibility** to **Hidden** or **Archived** and publish the change.
- Use **Unpublish** when the direct public article route should also disappear.
- Use **Delete** only when the record should be permanently removed.

## Visibility and external articles

- **Public** posts appear on the blog, homepage writing preview, relevant
  newsletter archive and sitemap.
- **Hidden** and **Archived** posts remain in Sanity and may retain their direct
  URL, but they do not appear in public indexes.
- **Original article** is for writing published directly by Kayode Popoola.
- **External or featured coverage** is for coverage or work first published
  elsewhere and is excluded from the original-writing index.
- Add **Source or publication** and **External source URL** for external work.
- Do not paste a third party's full article into the body. Add an original
  summary and link readers to the source.

## Image guidance

- Use JPG or WebP for photographs and PNG only when transparency is required.
- Prefer landscape cover images at roughly 1600 x 900 pixels.
- Keep image files reasonably compressed before upload.
- Always provide useful alternative text; do not repeat the filename.

## If a new post does not appear

1. Confirm it is published rather than only saved as a draft.
2. Confirm the slug was generated.
3. Confirm the Sanity webhook is enabled and its secret matches
   `SANITY_REVALIDATE_SECRET` in the production environment.
4. Check that the production build received the three `NEXT_PUBLIC_SANITY_*`
   values.
5. Confirm the webhook triggers create, update and delete and uses the filter
   and projection documented in `sanity/README.md`.

The public queries revalidate every 60 seconds, so a published post should still
appear after a short delay if webhook delivery fails.
