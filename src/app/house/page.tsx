import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = { title: "The House" };
export default function House() {
  return (
    <>
      <header className="house-intro section-pad page-space">
        <p className="eyebrow">The House</p>
        <h1>
          A considered life.
          <br />
          An open perspective.
        </h1>
        <p>
          LĀEL begins with a simple idea: the things we surround ourselves with
          should bring something meaningful to the everyday.
        </p>
      </header>
      <div className="house-image">
        <Image
          src="/images/campaign.webp"
          alt="LĀEL concept campaign exploring relaxed silhouettes and warm architectural light"
          fill
          sizes="100vw"
        />
      </div>
      <section className="house-story section-pad">
        <p className="eyebrow">Our point of view</p>
        <div>
          <h2>Room for what matters.</h2>
          <p>
            We see design as a practice of paying attention. To proportion. To
            the way a piece feels. To the small details that make something a
            pleasure to live with.
          </p>
          <p>
            Clothing is our starting point. We are exploring a wardrobe of
            thoughtful forms, guided by simplicity and a respect for the craft
            of making.
          </p>
          <p>
            Our perspective is open: to different places, ways of living, and
            creative traditions. We want LĀEL to grow through curiosity, with
            the care to let each idea find its own time.
          </p>
          <Link className="text-link" href="/shop">
            Explore our first forms <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="values section-pad">
        {[
          [
            "01",
            "Intention",
            "Every detail should have a reason to be there. We begin by asking what a piece brings to daily life.",
          ],
          [
            "02",
            "Longevity",
            "We aspire to create things that hold their place, beyond a season or a passing mood.",
          ],
          [
            "03",
            "Simplicity",
            "A clear line. A useful form. A sense of ease. Simplicity is a practice of thoughtful decisions.",
          ],
        ].map(([n, title, copy]) => (
          <article key={n}>
            <p className="eyebrow">{n}</p>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
    </>
  );
}
