# LĀEL

An editorial lifestyle storefront built with Next.js App Router, React, TypeScript, Tailwind CSS and Motion. Warm ivory, carbon and burgundy frame an original geometric SVG wordmark and original concept campaign imagery.

## Run locally

Use Node.js 22.13+ (Node 24 LTS recommended) and npm. The committed lockfile pins the tested dependency graph.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. To run the production server:

```sh
npm run build
npm start
```

## What works

- Responsive home, collection, product, House, World, contact and draft legal pages.
- Collection category filters, sample-stock filtering, and price/name sorting.
- Four editable sample products with naira prices and typed variants/collections.
- Full-view/detail-crop gallery, enlarged photography, colour and size selection, illustrative size guide, sample stock limits, related products, fabric/care accordions.
- Client-side bag with quantities, removal, stock caps, local persistence, cross-tab updates and defensive validation of stored entries.
- Demo checkout with an explicit completion message that never claims an order was placed.
- Responsive navigation, native modal focus containment and Escape handling, labelled controls, focus styles, skip navigation and reduced-motion support.
- Browser-validated contact/newsletter previews. Neither transmits nor stores form data.
- Metadata, Open Graph image, favicon, sitemap, robots rules, static route generation, optimized local images and self-hosted licensed fonts.
- Not-found, error, loading, empty-bag and storage-failure states.

## What remains a demo

All products, prices, stock, measurements and product imagery are illustrative. There is no verified inventory, order creation, payment processing, email delivery, newsletter subscription, account system or administration service. The image detail view is a crop of the same concept image, not another angle. Each current sample has one colour; the variant UI supports additional colours once matching data and photography exist.

LĀEL Atelier, LĀEL Objects and LĀEL Café are explicitly future concepts, not operating divisions. Legal pages are editable drafts pending professional review. No registration, trademark ownership, founding history, customer proof or physical location is asserted.

## Configuration

See `.env.example`. `NEXT_PUBLIC_*` values are public and embedded at build time; never put secrets in them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata and sitemap; defaults to localhost. Set before production build. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Verified public contact email. Empty by default. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Verified HTTPS social profile. Hidden if empty or invalid. |

No tracking or analytics is installed. If added later, gate optional tracking behind reviewed privacy settings and consent as appropriate.

## Editing content

- `src/data/catalogue.ts`: products, sample variant stock, prices in whole naira and collections.
- `src/lib/types.ts`: `Product`, `ProductVariant`, `Category`, `CartItem`, `Collection`.
- `src/data/legal.ts`: draft legal and business content.
- `src/lib/site.ts`: public site settings and URL validation.
- `src/app/world/page.tsx`: future concepts; keep status language accurate.
- `src/app/globals.css`: typography, palette, responsive layouts and reusable component styles.
- `public/brand/wordmark.svg`: original scalable wordmark. `src/components/wordmark.tsx` is its inline equivalent.
- `public/images/`: original generated concept campaign and product images. Replace with verified product photography before selling.

Preserve the macron: **LĀEL**. See `docs/brand.md` for identity and asset notes.

## Structure

```text
src/app/          App Router pages, layout, metadata, error/loading states
src/components/  Navigation, forms, product UI, dialogs, bag and page motion
src/data/        Editable sample catalogue and policy drafts
src/lib/         Shared interfaces, cart validation/store and site settings
public/          Self-hosted image and identity assets
 tests/          Cart unit tests and Playwright browser tests
 docs/           Brand notes, image provenance, font licenses, backend roadmap
```

The app intentionally has no database or server mutations. Product data is imported behind a small typed catalogue module; replace this source with a server-side repository when adding a backend. Keep client bag values untrusted, and recalculate every price and availability check on the server when ordering becomes possible.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Browser tests use installed Google Chrome (`channel: 'chrome'`) on desktop and a mobile viewport. Install Chrome locally or use `npx playwright install chrome` in a suitable CI environment. `test:e2e` starts the production server, so run `build` first. Tests cover catalogue filtering/sorting, cart persistence and quantities, demo checkout, zoom/size-guide dialogs, forms, navigation, public routes, missing products, corrupt storage, and horizontal overflow.

Screenshots and traces are written into ignored `test-results/`. Automated tests complement a manual accessibility and assistive-technology review before launch.

## Deployment

Deploy to a Node-compatible Next.js hosting environment, such as Vercel, or a managed Node server. This repository is not configured for static-only hosting: Next.js image optimization and response headers use the Next server.

1. Import this GitHub repository into the hosting provider, or clone it onto the server.
2. Set the supported Node version and install with `npm ci`.
3. Configure the public canonical URL and only verified contact/social values.
4. Run lint, type checks, tests and `npm run build`.
5. Start using `npm start` (the `PORT` environment variable is supported) or use the provider’s Next.js adapter.
6. Configure HTTPS/domain routing. Verify the deployed sitemap, metadata, images and responsive interactions.
7. Keep the demo disclosures until the backend and operational launch requirements are complete.

No hosting deployment is performed by the repository build itself. Do not enable live checkout by merely changing a label or environment flag.

## Backend and operational roadmap

See `docs/backend-roadmap.md` for the required PostgreSQL, authentication, Paystack, order, admin, email and production launch work. Version one intentionally has no card inputs and never stores payment details.
