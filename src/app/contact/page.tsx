import type {Metadata} from 'next';
import Link from 'next/link';
import {ContactForm} from '@/components/forms';
import {site} from '@/lib/site';
export const metadata:Metadata={title:'Contact'};
export default function Contact(){return <div className="section-pad page-space"><header className="page-intro"><p className="eyebrow">Contact</p><h1>A conversation<br/>starts here.</h1><p>For questions, ideas, or a shared perspective.</p></header><div className="contact-layout"><div><h2>Get in touch.</h2>{site.email?<a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>:<p className="muted">Our contact details are being finalised.<br/>A verified email will appear here before launch.</p>}<div className="contact-details"><p className="eyebrow">Find us elsewhere</p>{site.instagram?<a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">Instagram ↗</a>:<p className="muted">Official social channels coming soon.</p>}</div><Link className="text-link" href="/legal/business">Business information ↗</Link></div><ContactForm/></div></div>}
