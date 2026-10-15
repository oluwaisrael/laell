import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeCart, cartTotal } from "../src/lib/cart";
test("rejects malformed, missing, sold-out and negative entries", () => {
  assert.deepEqual(
    sanitizeCart([
      null,
      {},
      { productId: "p01", variantId: "p01-XL", quantity: 1 },
      { productId: "p01", variantId: "p01-S", quantity: -1 },
      { productId: "p01", variantId: "p01-S", quantity: 1.5 },
      { productId: "unknown", variantId: "p01-S", quantity: 1 },
    ]),
    [],
  );
  assert.deepEqual(sanitizeCart("invalid"), []);
});
test("merges duplicate variants and caps quantities at sample stock", () => {
  assert.deepEqual(
    sanitizeCart([
      { productId: "p01", variantId: "p01-M", quantity: 3 },
      { productId: "p01", variantId: "p01-M", quantity: 4 },
    ]),
    [{ productId: "p01", variantId: "p01-M", quantity: 5 }],
  );
});
test("ignores supplied prices and calculates totals from catalogue", () => {
  assert.equal(
    cartTotal([
      { productId: "p01", variantId: "p01-S", quantity: 2 },
      { productId: "p04", variantId: "p04-One size", quantity: 1 },
    ]),
    124000,
  );
});
