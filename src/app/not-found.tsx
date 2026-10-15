import Link from "next/link";
export default function NotFound() {
  return (
    <div className="error-page">
      <p className="eyebrow">404 / A little off the path</p>
      <h1>Nothing here, just yet.</h1>
      <p>The page may have moved. There is still a world to explore.</p>
      <Link className="button" href="/">
        Return to LĀEL ↗
      </Link>
    </div>
  );
}
