'use client';
import {useEffect,useRef} from 'react';
import {X} from 'lucide-react';
export function Modal({open,onClose,title,children,drawer=false}:{open:boolean;onClose:()=>void;title:string;children:React.ReactNode;drawer?:boolean}) {
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const dialog=ref.current;if(open){dialog?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog?.close();document.body.style.overflow=old;};}dialog?.close();},[open]);
 return <dialog ref={ref} className={drawer?'modal drawer':'modal'} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget) onClose();}} aria-label={title}><div className="modal-inner"><div className="modal-heading"><h2>{title}</h2><button className="icon-button" aria-label={`Close ${title}`} onClick={onClose}><X size={22}/></button></div>{children}</div></dialog>;
}
