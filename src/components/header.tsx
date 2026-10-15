"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { Wordmark } from "./wordmark";
import { useCart } from "./cart-provider";
import { Modal } from "./modal";
const links = [
  ["Collection", "/shop"],
  ["The House", "/house"],
  ["World of LĀEL", "/world"],
];
export function Header() {
  const pathname = usePathname();
  const cart = useCart();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="announcement">
        A first expression. Explore the sample collection <span>—</span>{" "}
        <Link href="/shop">
          Discover <ArrowUpRight size={11} />
        </Link>
      </div>
      <header className="site-header">
        <Link href="/" aria-label="LĀEL home" className="brand">
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="contact-nav" href="/contact">
            Contact
          </Link>
          <button className="bag-trigger" onClick={cart.openBag}>
            Bag{" "}
            <span>
              {cart.items
                .reduce((s, i) => s + i.quantity, 0)
                .toString()
                .padStart(2, "0")}
            </span>
          </button>
          <button
            className="mobile-menu icon-button"
            aria-label="Open navigation"
            onClick={() => setMenu(true)}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <Modal
        open={menu}
        onClose={() => setMenu(false)}
        title="Explore LĀEL"
        drawer
      >
        <nav className="mobile-links" aria-label="Mobile navigation">
          {[...links, ["Contact", "/contact"]].map(([label, href]) => (
            <Link onClick={() => setMenu(false)} key={href} href={href}>
              {label}
              <ArrowUpRight size={24} />
            </Link>
          ))}
        </nav>
      </Modal>
    </>
  );
}
