import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { products } from "@/data/catalogue";
import { ProductCard } from "@/components/product-card";
import { Wordmark } from "@/components/wordmark";
import { Reveal } from "@/components/reveal";
export default function Home() {
  return (
    <>
      <section className="home-masthead section-pad">
        <div className="masthead-note">
          <span>Clothing. Culture. Everyday living.</span>
          <span>A world taking shape.</span>
        </div>
        <Wordmark className="hero-wordmark" />
      </section>
      <section className="campaign">
        <Image
          src="/images/campaign.webp"
          alt="Concept campaign: two models in understated ivory and carbon clothing in a sunlit architectural courtyard"
          fill
          priority
          sizes="100vw"
        />
        <div className="campaign-shade" />
        <div className="campaign-content">
          <p className="eyebrow">The first expression / 01</p>
          <h1>
            Made for the
            <br />
            art of living.
          </h1>
          <Link href="/shop" className="light-link">
            Explore the collection <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="campaign-bottom">
          <span>A study in form, feeling & the everyday.</span>
          <a href="#collection" aria-label="Scroll to collection">
            <ArrowDown size={22} />
          </a>
        </div>
      </section>
      <section id="collection" className="collection section-pad">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">The collection — Chapter 01</p>
              <h2>First forms.</h2>
            </div>
            <div className="section-heading-end">
              <p>
                Familiar pieces. A fresh perspective.
                <br />
                The beginnings of an everyday wardrobe.
              </p>
              <Link className="text-link" href="/shop">
                View all pieces <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="sample-note">
            An illustrative collection. All pieces, imagery, prices and
            availability are samples.
          </p>
        </Reveal>
      </section>
      <section className="philosophy section-pad">
        <p className="eyebrow">The LĀEL point of view</p>
        <div>
          <h2>
            Less, but with
            <br />
            <span>more meaning.</span>
          </h2>
          <div className="philosophy-copy">
            <p>
              We are drawn to the things that stay with us. A considered
              silhouette. The feel of a fabric. The quiet confidence of
              something simply done well.
            </p>
            <p>
              LĀEL is an exploration of thoughtful design and everyday living.
              Beginning with clothing. Always looking beyond.
            </p>
            <Link className="text-link" href="/house">
              Inside the House <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="editorial section-pad">
        <div className="editorial-image">
          <Image
            src="/images/shirt.webp"
            alt="A closer look at the relaxed silhouette of the sample Everyday Shirt"
            fill
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">Notes on the everyday / 001</p>
          <h2>
            The beauty
            <br />
            of the familiar.
          </h2>
          <p>
            Not every piece needs to make a statement.
            <br className="desktop-only" /> Some simply become part of your
            life.
          </p>
          <p>
            Our first shirt concept explores an unhurried silhouette, a sense of
            ease, and the possibility of a daily favourite.
          </p>
          <Link className="text-link" href="/shop/the-everyday-shirt">
            Discover the Everyday Shirt <ArrowUpRight size={17} />
          </Link>
          <span className="small muted">Design study · Sample piece</span>
        </div>
      </section>
      <section className="world-preview section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Beyond the wardrobe</p>
            <h2>A world, slowly unfolding.</h2>
          </div>
          <Link className="text-link" href="/world">
            World of LĀEL <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="world-list">
          {[
            ["01", "LĀEL Atelier", "A space for creative exploration."],
            ["02", "LĀEL Objects", "Considered things for daily rituals."],
            ["03", "LĀEL Café", "An idea of gathering, and taking time."],
          ].map(([n, title, description]) => (
            <Link href="/world" className="world-row" key={n}>
              <span className="world-number">{n}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="concept-tag">Future concept</span>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
        <p className="sample-note">
          Possibilities for the future. These concepts are not currently
          operating.
        </p>
      </section>
    </>
  );
}
