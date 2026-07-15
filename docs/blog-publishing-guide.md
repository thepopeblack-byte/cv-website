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
6. Confirm the author, date, reading time, type and tags.
7. Upload a cover image and describe it in the alternative-text field.
8. Turn on **Feature this post** only when the post should lead the blog page.
9. Select **Publish**.

The post will appear at `/blog` and `/blog/your-slug`. Publishing triggers the
signed revalidation webhook, so no code edit or redeployment is needed.

The two existing local articles remain on the blog after Sanity is connected.
To make either one editable in Studio, recreate it with the same URL slug; the
Sanity version will then take precedence without creating a duplicate.

## Edit or remove a post

- Open the post, make the change and select **Publish** again.
- To remove a post from the public site, use the document menu and select
  **Unpublish**. Use **Delete** only when the record should be permanently
  removed.

## Featured and external articles

- **Original** is for writing published directly by Kayode Popoola.
- **Featured coverage** is for coverage or work first published elsewhere.
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
