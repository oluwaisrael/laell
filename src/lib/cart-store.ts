"use client";
import { useSyncExternalStore } from "react";
import { CART_KEY, sanitizeCart } from "./cart";
import type { CartItem } from "./types";
interface Snapshot {
  items: CartItem[];
  ready: boolean;
  storageError: boolean;
}
const serverSnapshot: Snapshot = {
  items: [],
  ready: false,
  storageError: false,
};
let snapshot = serverSnapshot;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());
function readStorage() {
  try {
    snapshot = {
      items: sanitizeCart(JSON.parse(localStorage.getItem(CART_KEY) || "[]")),
      ready: true,
      storageError: false,
    };
  } catch {
    snapshot = { items: snapshot.items, ready: true, storageError: true };
  }
  emit();
}
function onStorage(event: StorageEvent) {
  if (event.key === CART_KEY || event.key === null) readStorage();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("storage", onStorage);
    readStorage();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", onStorage);
  };
}
function updateItems(updater: (items: CartItem[]) => CartItem[]) {
  const items = sanitizeCart(updater(snapshot.items));
  let storageError = false;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    storageError = true;
  }
  snapshot = { items, ready: true, storageError };
  emit();
}
export function useCartStore() {
  const state = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot,
  );
  return { ...state, updateItems };
}
