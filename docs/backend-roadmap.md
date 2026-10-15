# Backend and launch roadmap

The current application is a usable demonstration with no server mutations. Implement the following as a separate, reviewed integration phase.

## Catalogue and PostgreSQL

Create database-backed products, variants, categories, collections, media, price histories, inventory movements and stock reservations. Add migrations, constraints, unique SKU/slug rules, integer minor-unit monetary amounts and backups. Current sample prices are whole naira; convert explicitly to kobo at the payment boundary. Replace the static catalogue behind a server-only repository layer; do not import database credentials into client components.

For each real garment, verify the production specification, composition, care, sizing, pricing, tax treatment, stock and photography. Tie images to colour variants. Use accessible image descriptions. Current sample dimensions and stock cannot drive real sales.

## Orders and Paystack

Design orders, order lines, delivery addresses, tax/shipping calculations, order state transitions and a fulfillment workflow before enabling payments. Create a server-owned checkout session, reprice the bag from trusted database data, reserve inventory transactionally with expiry, and assign an idempotent order reference.

Initialize Paystack payments server-side using secret environment variables. Use Paystack-hosted payment collection; never accept or store card information. Verify payment status server-side, authenticate webhook signatures, handle duplicate/replayed/out-of-order events, and only confirm an order after trusted payment verification and inventory reconciliation. A browser redirect or client success event is insufficient. Add refund, reconciliation and payment-failure recovery paths. Consult the current official Paystack documentation when implementing the integration.

## Authentication and administration

Choose a maintained authentication provider/library. Provide secure sessions, recovery, verified contact details where needed and least-privilege admin roles. Guest checkout may remain an option. Protect admin mutations with authentication/authorization, CSRF defenses as appropriate, input validation and audit records. Build inventory, order, fulfillment, content and returns management.

## Contact and newsletter

Replace the browser-only preview with validated server endpoints. Add abuse controls, request-size limits and rate limiting, escape message content, configure verified email sending and delivery monitoring, and keep provider credentials server-only. Newsletter opt-in should be explicit, recorded and revocable, with unsubscribe processing and a reviewed retention policy. Do not silently convert existing demo input into a subscription.

## Operations and policy

Supply the verified legal entity, business address/contact, applicable registrations, delivery destinations/rates/timing, returns procedures and tax details. Have qualified counsel review all policies for the actual business and markets. Make truthful and evidenced claims only. No future division should be presented as open without operational confirmation.

Add structured logging that avoids sensitive data, monitoring, error reporting, incident response, backup restoration checks and deletion/export workflows. Establish a tested content-security policy for the final hosting and payment integrations. Verify security headers and HTTPS, apply dependency security updates, and run accessibility, mobile, performance and end-to-end checkout reviews before launch.
