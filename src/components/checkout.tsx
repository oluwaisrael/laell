"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { products, formatPrice } from "@/data/catalogue";
export function Checkout() {
  const cart = useCart();
  const [reviewed, setReviewed] = useState(false);
  if (!cart.ready) return <p role="status">Loading your demo bag…</p>;
  if (!cart.items.length)
    return (
      <div className="empty-state">
        <h2>Your bag is waiting.</h2>
        <Link className="button" href="/shop">
          Explore the collection ↗
        </Link>
      </div>
    );
  return (
    <div className="checkout-layout">
      <div>
        <h2>A preview of what’s to come.</h2>
        <p>
          This store is in its first chapter. You can explore sample pieces and
          build a bag, but ordering is not available yet.
        </p>
        <p>
          No order will be created, no inventory reserved, and no payment taken.
          We do not collect delivery or payment details.
        </p>
        <button className="button" onClick={() => setReviewed(true)}>
          Finish demo preview
        </button>
        {reviewed && (
          <p role="status" className="notice">
            Preview complete. No purchase was made. Your sample pieces remain in
            your bag.
          </p>
        )}
        <Link className="text-link" href="/shop">
          Return to the collection ↗
        </Link>
      </div>
      <section className="order-summary">
        <h2>Your sample selection</h2>
        {cart.items.map((item) => {
          const product = products.find((p) => p.id === item.productId)!;
          const variant = product.variants.find(
            (v) => v.id === item.variantId,
          )!;
          return (
            <div className="summary-row" key={item.variantId}>
              <div>
                {product.name}
                <p className="muted small">
                  {variant.color} / {variant.size} × {item.quantity}
                </p>
              </div>
              <span>{formatPrice(product.price * item.quantity)}</span>
            </div>
          );
        })}
        <div className="summary-row">
          <strong>Illustrative subtotal</strong>
          <strong>{formatPrice(cart.total)}</strong>
        </div>
        <p className="small muted">
          Delivery and taxes are not calculated. This is not a quote or an
          order.
        </p>
        <button className="text-link" onClick={cart.openBag}>
          Edit your bag ↗
        </button>
      </section>
    </div>
  );
}
