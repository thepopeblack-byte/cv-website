# Kayode Popoola Executive Site

## Local

```bash
npm install
npm run dev
```

## Docker

Build and run with Docker:

```bash
docker build -t kayode-popoola-site .
docker run --rm -p 3000:3000 kayode-popoola-site
```

Or with Docker Compose:

```bash
docker compose up --build
```

The production container serves the Next.js standalone build on port `3000`.

For SecretVM, use the same Dockerfile and publish port `3000` with `NODE_ENV=production`, `PORT=3000`, and `HOSTNAME=0.0.0.0`.
