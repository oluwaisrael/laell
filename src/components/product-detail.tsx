"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, ZoomIn } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/data/catalogue";
import { useCart } from "./cart-provider";
import { Modal } from "./modal";
export function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.variants[0].color);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [guide, setGuide] = useState(false);
  const cart = useCart();
  const variant = product.variants.find(
    (v) => v.size === size && v.color === color,
  );
  const inBag =
    cart.items.find((i) => i.variantId === variant?.id)?.quantity || 0;
  const colors = [...new Set(product.variants.map((v) => v.color))];
  return (
    <>
      <div className="detail-layout">
        <div className="gallery">
          <button
            className={`detail-image ${active === 1 ? "detail-crop" : ""}`}
            aria-label="Zoom product photograph"
            onClick={() => setZoom(true)}
          >
            <Image
              src={product.images[0]}
              alt={product.alt}
              fill
              priority
              sizes="(max-width:800px) 100vw, 55vw"
            />
            <span>
              <ZoomIn size={19} /> View closer
            </span>
          </button>
          <div className="gallery-thumbs" aria-label="Image gallery">
            <button aria-pressed={active === 0} onClick={() => setActive(0)}>
              01 / Full view
            </button>
            <button aria-pressed={active === 1} onClick={() => setActive(1)}>
              02 / Detail crop
            </button>
          </div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">First forms / Sample piece</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          <fieldset className="color-select">
            <legend>Colour — {color}</legend>
            {colors.map((c) => (
              <button
                key={c}
                aria-label={c}
                aria-pressed={color === c}
                onClick={() => {
                  setColor(c);
                  setSize("");
                }}
                style={{
                  background: product.variants.find((v) => v.color === c)
                    ?.colorHex,
                }}
              />
            ))}
          </fieldset>
          <fieldset className="size-select">
            <legend>Size</legend>
            <button
              type="button"
              className="size-guide text-link"
              onClick={() => setGuide(true)}
            >
              Size guide <ArrowUpRight size={13} />
            </button>
            <div>
              {product.variants
                .filter((v) => v.color === color)
                .map((v) => (
                  <button
                    key={v.id}
                    disabled={v.stock === 0}
                    aria-pressed={size === v.size}
                    onClick={() => setSize(v.size)}
                  >
                    {v.size}
                    {v.stock === 0 && (
                      <span className="sr-only"> unavailable</span>
                    )}
                  </button>
                ))}
            </div>
          </fieldset>
          <p className="small stock-status" aria-live="polite">
            {variant
              ? `${variant.stock} available in demo stock`
              : "Select a size to explore the demo bag."}
          </p>
          <button
            className="button full"
            disabled={!variant || inBag >= variant.stock || !cart.ready}
            onClick={() => variant && cart.add(product.id, variant.id)}
          >
            {!variant
              ? "Select a size"
              : inBag >= variant.stock
                ? "Demo stock limit reached"
                : "Add to bag"}
            <Plus size={18} />
          </button>
          <p className="small muted">
            Design concept only. No purchases or payments are accepted.
          </p>
          <div className="product-accordions">
            <details open>
              <summary>Fabric & composition</summary>
              <p>{product.fabric}</p>
            </details>
            <details>
              <summary>Care notes</summary>
              <p>{product.care}</p>
            </details>
            <details>
              <summary>Delivery & returns</summary>
              <p>
                This is a sample product. Delivery options, timing and return
                terms will be confirmed before the store launches.
              </p>
            </details>
          </div>
        </div>
      </div>
      <Modal open={zoom} onClose={() => setZoom(false)} title="A closer look">
        <div className="zoom-image">
          <Image
            src={product.images[0]}
            alt={product.alt}
            width={1024}
            height={1536}
            sizes="90vw"
          />
        </div>
        <p className="small muted">
          Illustrative concept photography, not a final production sample.
        </p>
      </Modal>
      <Modal open={guide} onClose={() => setGuide(false)} title="Size guide">
        <p className="notice">
          Illustrative sizing only. Measurements and fit must be verified
          against final production garments before launch.
        </p>
        {product.category === "Accessories" ? (
          <p>One size concept. Final dimensions are not yet confirmed.</p>
        ) : (
          <>
            <p>
              Example body measurements in centimetres. These do not describe
              verified product measurements.
            </p>
            <div className="table-wrap">
              <table>
                <caption className="sr-only">
                  Illustrative body size guide in centimetres
                </caption>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest / bust</th>
                    <th>Waist</th>
                    <th>Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["XS", "80–84", "62–66", "86–90"],
                    ["S", "85–89", "67–71", "91–95"],
                    ["M", "90–96", "72–78", "96–102"],
                    ["L", "97–103", "79–85", "103–109"],
                    ["XL", "104–110", "86–92", "110–116"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) =>
                        i === 0 ? (
                          <th key={i} scope="row">
                            {cell}
                          </th>
                        ) : (
                          <td key={i}>{cell}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
