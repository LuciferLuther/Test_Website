"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <main className="system-page">
      <div className="system-page__card">
        <p className="eyebrow">A small pause</p>
        <h1>Something did not load.</h1>
        <p>Your saved trip is still on this device. Try the page again.</p>
        <div className="system-page__actions">
          <button className="button" type="button" onClick={reset}>
            Try again
          </button>
          <Link className="button button--ghost" href="/">
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
