import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="system-page">
      <div className="system-page__card">
        <p className="meta-label">404</p>
        <h1>This path is not part of the trip.</h1>
        <p>Return to the winter planner and continue from the main route.</p>
        <Link className="button" href="/">
          Open the planner
        </Link>
      </div>
    </main>
  );
}
