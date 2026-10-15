import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Newsletter } from "./forms";
import { Wordmark } from "./wordmark";
import { site } from "@/lib/site";
export function Footer() {
  return (
    <footer>
      <section className="newsletter section-pad">
        <div>
          <p className="eyebrow">Letters from LĀEL</p>
          <h2>
            A little closer
            <br />
            to our world.
          </h2>
        </div>
        <div>
          <p>
            New perspectives, thoughtful pieces, and things
            <br className="desktop-only" /> we think are worth sharing.
          </p>
          <Newsletter />
        </div>
      </section>
      <div className="footer-main section-pad">
        <div className="footer-top">
          <p>
            Considered clothing.
            <br />A quieter way of living.
          </p>
          <nav aria-label="Footer navigation">
            <Link href="/shop">Collection</Link>
            <Link href="/house">The House</Link>
            <Link href="/world">World of LĀEL</Link>
            <Link href="/contact">Contact {<ArrowUpRight size={12} />}</Link>
            {site.instagram && (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <ArrowUpRight size={12} />
              </a>
            )}
          </nav>
        </div>
        <Wordmark className="footer-wordmark" />
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LĀEL</span>
          <nav aria-label="Policies">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/shipping">Shipping</Link>
            <Link href="/legal/returns">Returns</Link>
          </nav>
          <span>In pursuit of the considered.</span>
        </div>
      </div>
    </footer>
  );
}
