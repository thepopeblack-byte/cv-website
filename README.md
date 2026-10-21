# Kayode Popoola Executive Site

## Local

Use Node.js `22.23.4` (the `.nvmrc` version, matching production), or patched Node.js `24.22.1` or later within major 24. Older patches are outside the supported project engine range. With a Node version manager, install and select the version in `.nvmrc` before running these commands.

```bash
npm install
npm run dev
```

## Docker

Build and run with Docker:

```bash
docker build --pull -t kayode-popoola-site .
docker run --rm -p 3000:3000 kayode-popoola-site
```

Or with Docker Compose:

```bash
docker compose up --build
```

The production container serves the Next.js standalone build on port `3000`.

All Docker stages inherit the same Node.js `22.23.4` Alpine base, pinned by image digest. Future security updates require reviewing and updating both the base image version/digest and the local version guidance. Changing this file does not update a running container: build, publish and deploy through the approved workflow, then verify `node --version` inside the running application container.

For SecretVM, use the same Dockerfile and publish port `3000` with `NODE_ENV=production`, `PORT=3000`, and `HOSTNAME=0.0.0.0`.

## Release to SecretVM

Pushing to `main` runs the existing GitHub Actions workflow. It builds and checks the image, publishes it to GHCR with a commit-specific tag, and updates `docker-compose-secretvm.yaml` with the immutable image digest. This workflow does not restart the live SecretVM application.

The Docker build receives the existing `NEXT_PUBLIC_*` values from GitHub repository variables. Keep all nine public values from `.env.example` configured there; private runtime secrets such as `SANITY_REVALIDATE_SECRET` stay in SecretVM, never in public build arguments.

After the workflow succeeds, copy only the new `image:` reference from `docker-compose-secretvm.yaml` into the existing SecretVM website service. Preserve its environment variables, volumes, ports, networks and Traefik configuration. Save the previous image reference for rollback, then use SecretVM's existing update/restart workflow. Check the website, blog and newsletter afterward, and verify `node --version` inside the website container.
