import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {products,getProduct} from '@/data/catalogue';
import {ProductDetail} from '@/components/product-detail';
import {ProductCard} from '@/components/product-card';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=getProduct(slug);return {title:p?.name||'Piece not found',description:p?.description};}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=getProduct(slug);if(!product)notFound();return <div className="section-pad product-page"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/shop">Collection</Link><span>/</span><span>{product.name}</span></nav><ProductDetail product={product}/><section className="related"><div className="section-heading"><h2>In good company.</h2><Link className="text-link" href="/shop">All pieces ↗</Link></div><div className="product-grid related-grid">{products.filter(p=>p.id!==product.id).map(p=><ProductCard key={p.id} product={p}/>)}</div></section></div>}
