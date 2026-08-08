import { Botanical, FloralDivider, WaxSeal } from "@/components/ui/botanical";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Botanical className="site-footer__branch site-footer__branch--left" tone="light" />
      <Botanical className="site-footer__branch site-footer__branch--right" side="right" tone="light" />
      <div className="container site-footer__inner">
        <WaxSeal />
        <h2>More time together.<br />Less time packing.</h2>
        <FloralDivider dark />
        <p>Tokyo · Hakone · Sapporo<br />17 December 2026 — 3 January 2027</p>
        <small>Japan, Slowly · Personal winter trip planner</small>
      </div>
    </footer>
  );
}
