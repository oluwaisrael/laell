import { notFound } from "next/navigation";
import Link from "next/link";
import { legalPages } from "@/data/legal";
export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: legalPages[slug]?.title || "Page not found",
    robots: { index: false, follow: true },
  };
}
export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = Object.hasOwn(legalPages, slug) ? legalPages[slug] : undefined;
  if (!page) notFound();
  return (
    <div className="section-pad page-space legal-page">
      <header className="page-intro">
        <p className="eyebrow">Information / Draft</p>
        <h1>{page.title}</h1>
      </header>
      <p className="notice">
        Draft — pending professional review and verified business details. Not
        approved for live trading.
      </p>
      {page.sections.map((s) => (
        <article key={s.title}>
          <h2>{s.title}</h2>
          <p>{s.body}</p>
        </article>
      ))}
      <Link className="text-link" href="/contact">
        Contact & enquiries ↗
      </Link>
    </div>
  );
}
