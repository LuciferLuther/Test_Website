export default function LoadingPage() {
  return (
    <main className="system-page" aria-live="polite" aria-busy="true">
      <div className="system-page__card system-page__card--loading">
        <span className="system-page__seal" aria-hidden="true">J</span>
        <p className="meta-label">Preparing the journey</p>
        <h1>Japan, slowly.</h1>
      </div>
    </main>
  );
}
