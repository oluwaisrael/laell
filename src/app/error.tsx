"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="error-page">
      <p className="eyebrow">A brief interruption</p>
      <h1>Let’s try that again.</h1>
      <p>Something went wrong while opening this page.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
