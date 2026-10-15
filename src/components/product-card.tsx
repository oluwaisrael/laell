import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/data/catalogue";
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/shop/${product.slug}`} className="product-photo">
        <Image
          src={product.images[0]}
          alt={product.alt}
          fill
          sizes="(max-width:600px) 48vw, (max-width:1000px) 45vw, 24vw"
        />
        <span className="sample-tag">Sample piece</span>
        <span className="product-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="product-caption">
        <div>
          <h3>
            <Link href={`/shop/${product.slug}`}>{product.name}</Link>
          </h3>
          <p>{product.variants[0].color}</p>
        </div>
        <span>{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}
