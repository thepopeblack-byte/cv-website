# The Popeblack Brief on Substack

The Popeblack Brief uses Substack for newsletter subscriptions, confirmation
emails, distribution, unsubscribe management, community and discovery.
Popeblack.com remains the canonical home for original articles and search
metadata.

## Build-time configuration

Configure both public values before running the Next.js production build:

```env
NEXT_PUBLIC_SUBSTACK_URL="https://thepopeblackbrief.substack.com/"
NEXT_PUBLIC_SUBSTACK_EMBED_URL="https://thepopeblackbrief.substack.com/embed"
```

No private Substack API key is required. These values are public build-time
configuration because they are used by browser-rendered links and the iframe.

If the embed URL is missing, the site presents a direct Substack subscription
link. If both values are missing, newsletter sections are hidden without
breaking the site.

## Data handling

The iframe is loaded directly from Substack. Email addresses and other
subscription details entered inside it are submitted to Substack, not to a
Popeblack API route. The Popeblack application does not maintain a newsletter
subscriber database and cannot inspect the iframe or confirm subscription
success.

Analytics are limited to newsletter page and section views plus outbound
Substack link clicks. Email addresses, iframe form values, subscriber identity
and subscription status are never included in custom analytics events.
