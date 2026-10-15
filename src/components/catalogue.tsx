"use client";
import { useState } from "react";
import { categories, products } from "@/data/catalogue";
import { ProductCard } from "./product-card";
export function Catalogue() {
  const [category, setCategory] = useState("All pieces");
  const [sort, setSort] = useState("featured");
  const [available, setAvailable] = useState(false);
  const filtered = products
    .filter(
      (p) =>
        (category === "All pieces" || p.category === category) &&
        (!available || p.variants.some((v) => v.stock > 0)),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : 0,
    );
  return (
    <>
      <div className="catalogue-toolbar">
        <div
          className="filter-tabs"
          role="group"
          aria-label="Filter by category"
        >
          {["All pieces", ...categories.map((category) => category.name)].map(
            (c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <div className="sort-controls">
          <label className="stock-filter">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />{" "}
            In demo stock
          </label>
          <label className="sort-label">
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>
      </div>
      <p className="small muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
      </p>
      <div className="product-grid shop-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <h2>No pieces here, just yet.</h2>
          <button
            className="text-link"
            onClick={() => {
              setCategory("All pieces");
              setAvailable(false);
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
