import type {Metadata} from 'next';
import {Catalogue} from '@/components/catalogue';
export const metadata:Metadata={title:'The collection'};
export default function Shop(){return <div className="section-pad page-space"><header className="page-intro"><p className="eyebrow">The collection / Chapter 01</p><h1>First forms.</h1><p>Everyday essentials, thoughtfully reconsidered.<br/>An opening chapter in the world of LĀEL.</p></header><p className="notice">Sample collection — illustrative designs, prices and stock. These pieces are not available to purchase.</p><Catalogue/></div>}
