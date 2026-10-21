# Application runtime and dependency security review

Checked on 21 October 2026.

## PHP assessment

No PHP runtime, PHP application code, Composer manifest, PHP-FPM service, mod_php configuration or FastCGI handler was found in the website project or its deployment definitions.

- The application is Next.js with React and Sanity.
- At the initial PHP review, both application container stages used `node:22-alpine`; the production command is `node server.js`. The subsequent Node runtime review below pins the patched base image.
- The checked Compose/SecretVM definitions reference this application image and, in one definition, Traefik. They do not configure a PHP service.
- A normal HEAD request to `https://www.popeblack.com/` returned HTTP 200 and `X-Powered-By: Next.js`. A response header corroborates the framework; it does not establish a complete host inventory.

The PHP project's 21 October advisory covers CVE-2026-109618 and CVE-2026-109619 in PHP installations handling web requests. Those PHP-specific vulnerabilities do not apply to the inspected Node application stack. No PHP installation or PHP configuration change is needed in this project.

Official source: https://www.php.net/archive/2026.php

The remote SecretVM host, its running image digest and any unrelated host services were not inspected. The local Docker daemon was unavailable. This review therefore does not certify that every service on the hosting machine is free of PHP or other vulnerabilities.

## Separate JavaScript dependency maintenance

The initial production dependency audit reported 36 flagged packages: 1 critical, 24 high and 11 moderate. These are package/advisory classifications, not evidence that the website was compromised or that every finding has a reachable exploit path.

The project locked Next.js 16.2.9. Its package version falls within several advisory ranges. The compatible update now locks Next.js and its lint configuration to 16.4.2, with the manifest requiring at least the patched 16.3.8 release within major version 16.

Important applicability distinctions:

- The `next/og` critical advisory requires attacker-controlled data in SVG content, attributes or styles. The current homepage and event images use reviewed local data; no such public input path was identified. The package was updated without claiming a confirmed remote-code-execution path in this website.
- The Windows-hosting advisory does not describe the production container's Linux runtime.
- Server Action, custom-server, middleware and rewrite advisories depend on configurations or features; none of those uses was found in the checked application source/configuration.
- Remote image optimisation uses explicitly allowed Sanity and YouTube hosts. The framework update incorporates the relevant image-processing fixes rather than relying solely on that configuration.
- The published cache-poisoning advisories describe Pages Router or root catch-all configurations. This project uses App Router and has no root catch-all page. No exploit requests were sent to the live website.

Primary Next.js sources:

- https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j
- https://github.com/vercel/next.js/security/advisories/GHSA-cjq9-62q9-8jv4
- https://github.com/vercel/next.js/security/advisories/GHSA-4jqv-mc3x-m676
- https://github.com/vercel/next.js/security/advisories/GHSA-mcj8-r9mp-w47p

Selected resolved versions:

| Package | Before | After |
| --- | --- | --- |
| next | 16.2.9 | 16.4.2 |
| eslint-config-next | 16.2.9 | 16.4.2 |
| sharp | 0.34.5 | 0.35.5 |
| postcss | 8.4.31 | 8.5.23 |
| dompurify | 3.4.12 | 3.4.17 |
| markdown-it | 14.3.0 | 14.3.3 |
| tar | 7.5.20 | 7.5.22 |
| undici (top-level resolution) | 6.27.0 | 6.29.1 |
| vite | 8.1.4 | 8.3.5 |

Targeted transitive updates respected existing dependency constraints. Sanity remains 6.5.0 and next-sanity remains 13.1.3. No CMS migration, credentials, source-page design, analytics or deployment configuration was changed for the npm dependency update.

## Remaining dependency findings

After the updates, `npm audit --omit=dev --json` reports **24 flagged packages: 0 critical, 15 high and 9 moderate**. Next.js is no longer listed. The audit is not clean and should not be reported as passed.

The remaining flags involve the Sanity CLI/code-generation/workbench dependency tree and shared transitive libraries:

- `@module-federation/dts-plugin`, `@module-federation/vite`
- `@sanity/cli`, `@sanity/codegen`, `@sanity/preview-url-secret`, `@sanity/runtime-cli`, `@sanity/uuid`, `@sanity/workbench-cli`
- `@vercel/frameworks`, `adm-zip`, `argparse`, `braces`, `chokidar`, `fast-glob`, `globby`, `js-yaml`, `micromatch`
- `next-sanity`, `sanity`, `smol-toml`, `sprintf-js`, `typeid-js`, a nested `undici`, and `uuid`

`npm explain` confirms, for example, `sanity -> @sanity/cli -> @sanity/codegen` and `sanity -> @sanity/cli -> @sanity/workbench-cli -> @module-federation/vite -> @module-federation/dts-plugin`.

The flagged package directories were not present at their corresponding paths in the generated standalone package tree. That observation alone does not exclude compiled/bundled code and is not a blanket exemption from the advisories.

Several audit suggestions propose downgrading Sanity to 5.14.1 and next-sanity to 11.6.13. A dry run also proposed a much broader toolchain refresh. Neither was applied. Resolving the residual findings needs a focused CMS/toolchain compatibility review, including available same-major upgrades and any upstream fixes, rather than a forced audit operation or unverified dependency overrides.

Machine-readable audit snapshots are generated locally under ignored `tmp-media/security-review/`:

- `npm-audit-before.json`
- `npm-audit-after-next.json`
- `npm-audit-after.json`

## Verification

- `npm.cmd run build`: passed with Next.js 16.4.2.
- `npm.cmd run lint`: passed.
- `npm.cmd run typecheck`: passed.
- `node --import tsx --test tests/events.test.ts`: all 5 tests passed.
- Existing portfolio browser smoke check: 14 routes at 320, 375, 768, 1024 and 1440 pixels; hero links, evidence, writing, experience, contact controls and theme checks passed.
- Event browser checks: index/detail pages at 375, 768, 1024 and 1440 pixels in both themes; navigation, keyboard controls, overflow, sitemap, worksheet and social image passed.
- Local production `/studio`, `/opengraph-image`, the event social image and a normal `/_next/image` request returned HTTP 200 with the expected content types.
- `git diff --check`: passed.

No contact message was submitted. The live-site request was a normal HEAD request; no exploit payload or intrusive scan was used.

## Handoff

The npm dependency update changes `package.json`, `package-lock.json`, the framework-generated `next-env.d.ts` declaration and this report. Next.js 16.4 generates an additional root-parameter type import in that declaration. Existing uncommitted event work was preserved.

The update is prepared and tested locally. No Docker image was built or pushed, no commit was made, and no production deployment occurred. Approval and the existing deployment workflow are still required before the updated dependencies run on popeblack.com. Host-level verification remains a separate check requiring access to the deployed SecretVM environment.

## Node.js runtime follow-up

The official 21 October 2026 security release provides Node.js 22.23.4, 24.22.1 and 26.12.1. It addresses high-severity issues affecting supported release lines, including DNS/TLS handling and Brotli decoding. These runtime fixes are separate from the npm package audit above; an npm audit does not check the Node executable.

Official advisory: https://nodejs.org/en/blog/vulnerability/october-2026-security-releases

The local shell reported Node.js `24.18.0`, which predates these fixes. The original Dockerfile used a floating `node:22-alpine` tag twice. A floating tag cannot establish the version in a cached or deployed container; existing images do not update themselves.

Changes prepared:

- Pin the official production base to `node:22.23.4-alpine3.24@sha256:ce8d97f7cfc7c5386421eb932df20a29df99b1a7f469f6157d5c9956702ffadc`.
- Reuse that base for the production runner, so installation, compilation and serving use the same runtime.
- Set `.nvmrc` to `22.23.4` and the package/lockfile engine range to `^22.23.4 || ^24.22.1`.
- Document patched local versions, image pin maintenance and deployment verification in the README.

The official Docker Registry returned this tag and digest with Linux amd64, arm, arm64 and s390x manifests. The Linux amd64 configuration also declares `NODE_VERSION=22.23.4`. The read-only verification result is saved in ignored `tmp-media/security-review/node-image-verification.json`. No Docker image was built, pulled or deployed. The local Docker daemon remains unavailable, so Linux container execution and the actual SecretVM runtime cannot be verified here.

No exploit was attempted, and this review does not establish that a runtime vulnerability has been exploited or is reachable through this application's inputs. The user's global Node installation, website source, contact infrastructure, analytics, credentials, Compose image references and SecretVM configuration were not changed by the runtime follow-up.

Before production is considered patched, approve the normal image build/publication/deployment and confirm `node --version` inside the running application container reports `v22.23.4` or a newer reviewed security release. A local patch or successful web request alone is not proof of the deployed runtime.

### Verification with the patched runtime

Downloaded the official Windows x64 Node.js 22.23.4 archive into ignored workspace storage and checked its SHA-256 against the official HTTPS distribution checksum manifest before extraction and execution:

`cbc74b5e0982c9dbb41525fd8fb5dcd32fbee237863f7829072f4639a1ce5f20`

Distribution manifest: https://nodejs.org/dist/v22.23.4/SHASUMS256.txt

All of these checks used that portable runtime (`node --version`: `v22.23.4`, bundled npm: `10.9.9`), not the unchanged global Node installation:

- `npm.cmd run lint`: passed.
- `node --import tsx --test tests/events.test.ts`: 5 of 5 passed.
- `npm.cmd run build`: passed with Next.js 16.4.2. The initial sandboxed compile stalled and was stopped; the retry with the required build permissions completed successfully.
- `npm.cmd run typecheck`: passed after the build generated its route types.
- Engine boundary checks reject the older 22.23.3, 24.18.0 and 24.22.0 patches; package and lockfile engine declarations agree. All Docker stages share the pinned base and retain the non-root runner.
- Ran the generated `.next/standalone/server.js` with the existing public/static assets copied into generated standalone output, matching the application entry point used by Docker.
- Portfolio browser smoke: all 14 routes at 320, 375, 768, 1024 and 1440 pixels passed, including existing links, contact controls and theme checks.
- Event browser checks passed at 375, 768, 1024 and 1440 pixels in light and dark modes, including keyboard access, navigation, sitemap and downloads.
- Sanity Studio, Next image optimisation, both checked social-image endpoints and the CV returned HTTP 200 with expected content types. Both social images remain 1200 by 630 pixels.
- `npm audit --omit=dev --json`: unchanged at 24 flagged packages (0 critical, 15 high, 9 moderate); saved to ignored `tmp-media/security-review/npm-audit-node22.json`. The residual CMS/toolchain review described above is still outstanding.
- `git diff --check`: passed.

Only `Dockerfile`, `.nvmrc`, the engine declarations in `package.json`/`package-lock.json`, `README.md` and this report were changed for the Node follow-up. No website content or design was changed. The portable runtime is ignored by Git and Docker. The global Node.js 24.18.0 installation still needs to be upgraded to 24.22.1 or replaced in local project sessions with the `.nvmrc` version. No global software installation, commit, push or production deployment was performed.

## Approved release preparation

The user subsequently authorised committing and syncing the security update, and chose to perform the SecretVM update manually. Uncommitted event-page drafts are excluded from this security release.

The existing GitHub workflow had failed at the image-push step. It used `refs/heads/main` as a Docker version tag on branch pushes, which is invalid. It also omitted all public build arguments. The release correction uses commit-based tags for branch builds, retains version tags for tag builds, and supplies the existing public configuration through GitHub repository variables. No private API key or runtime secret is passed into the build.

Before publishing, CI now checks the actual container's Node version against `.nvmrc`, starts the generated standalone server on loopback, and checks the existing website, blog, portfolio, newsletter, Studio, sitemap, social image and CV endpoints. The workflow still only publishes an image and updates its generated Compose reference; it does not access or restart SecretVM. The exact publication status and image digest must be taken from the completed Actions run, not inferred from a Git push.
