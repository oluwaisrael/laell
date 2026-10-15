'use client';
import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Minus,Plus,ArrowUpRight} from 'lucide-react';
import type {CartItem} from '@/lib/types';
import {products,formatPrice} from '@/data/catalogue';
import {CART_KEY,sanitizeCart,cartTotal} from '@/lib/cart';
import {Modal} from './modal';
interface CartContext {items:CartItem[];ready:boolean;openBag:()=>void;add:(productId:string,variantId:string)=>void;update:(variantId:string,quantity:number)=>void;total:number;}
const Context=createContext<CartContext|null>(null);
export function useCart(){const value=useContext(Context);if(!value) throw new Error('Cart provider required');return value;}
export function CartProvider({children}:{children:React.ReactNode}) {
 const [items,setItems]=useState<CartItem[]>([]);const [ready,setReady]=useState(false);const [open,setOpen]=useState(false);const [storageError,setStorageError]=useState(false);
 useEffect(()=>{try{setItems(sanitizeCart(JSON.parse(localStorage.getItem(CART_KEY)||'[]')));}catch{setStorageError(true);}setReady(true);const sync=(e:StorageEvent)=>{if(e.key===CART_KEY){try{setItems(sanitizeCart(JSON.parse(e.newValue||'[]')));}catch{setItems([]);}}};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);},[]);
 useEffect(()=>{if(ready){try{localStorage.setItem(CART_KEY,JSON.stringify(items));}catch{setStorageError(true);}}},[items,ready]);
 const close=useCallback(()=>setOpen(false),[]);
 const add=(productId:string,variantId:string)=>{setItems(current=>sanitizeCart([...current,{productId,variantId,quantity:1}]));setOpen(true);};
 const update=(variantId:string,quantity:number)=>setItems(current=>sanitizeCart(current.map(i=>i.variantId===variantId?{...i,quantity}:i)));
 const total=cartTotal(items);
 return <Context.Provider value={{items,ready,openBag:()=>setOpen(true),add,update,total}}>{children}<Modal open={open} onClose={close} title={`Your bag (${items.reduce((s,i)=>s+i.quantity,0)})`} drawer><p className="notice">Sample collection · Demo bag. No live orders or payments.</p>{storageError&&<p role="status" className="notice">Browser storage is unavailable. Your bag may not be saved.</p>}{items.length===0?<div className="bag-empty"><p>A little room for something considered.</p><Link className="button" href="/shop" onClick={close}>Explore the collection <ArrowUpRight size={17}/></Link></div>:<><div className="bag-items">{items.map(item=>{const product=products.find(p=>p.id===item.productId)!;const variant=product.variants.find(v=>v.id===item.variantId)!;return <article className="bag-item" key={item.variantId}><Image src={product.images[0]} alt={product.alt} width={110} height={145}/><div><Link href={`/shop/${product.slug}`} onClick={close}>{product.name}</Link><p className="muted small">{variant.color} / {variant.size}</p><p className="small">{formatPrice(product.price)}</p><div className="quantity"><button aria-label={`Decrease ${product.name} quantity`} onClick={()=>update(item.variantId,item.quantity-1)}><Minus size={14}/></button><span aria-label="Quantity">{item.quantity}</span><button disabled={item.quantity>=variant.stock} aria-label={`Increase ${product.name} quantity`} onClick={()=>update(item.variantId,item.quantity+1)}><Plus size={14}/></button><button className="remove" onClick={()=>update(item.variantId,0)}>Remove</button></div></div></article>;})}</div><div className="bag-bottom"><div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total)}</span></div><p className="muted small">Illustrative prices. Delivery and taxes are not calculated.</p><Link className="button full" href="/checkout" onClick={close}>Preview checkout <ArrowUpRight size={17}/></Link><button className="text-link" onClick={close}>Continue exploring</button></div></>}</Modal></Context.Provider>;
}
