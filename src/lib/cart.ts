import { products } from "@/data/catalogue";
import type { CartItem } from "./types";
export const CART_KEY = "lael-bag-v1";
export function sanitizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const result: CartItem[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    if (
      !variant ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 1 ||
      variant.stock < 1
    )
      continue;
    const existing = result.find((i) => i.variantId === variant.id);
    if (existing)
      existing.quantity = Math.min(
        variant.stock,
        existing.quantity + item.quantity,
      );
    else
      result.push({
        productId: product!.id,
        variantId: variant.id,
        quantity: Math.min(item.quantity, variant.stock),
      });
  }
  return result;
}
export function cartTotal(items: CartItem[]) {
  return sanitizeCart(items).reduce(
    (sum, item) =>
      sum +
      products.find((p) => p.id === item.productId)!.price * item.quantity,
    0,
  );
}
