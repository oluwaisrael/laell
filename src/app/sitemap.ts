import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/site';
import {products} from '@/data/catalogue';
export default function sitemap():MetadataRoute.Sitemap{return ['/','/shop','/house','/world','/contact',...products.map(p=>`/shop/${p.slug}`)].map(path=>({url:new URL(path,siteUrl).href}));}
