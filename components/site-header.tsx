"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { WaxSeal } from "@/components/ui/botanical";
import type { SectionId } from "@/components/use-active-section";

const links: Array<{ id: SectionId; label: string }> = [
  { id: "journey", label: "Journey" },
  { id: "plan", label: "Plan" },
  { id: "map", label: "Map" },
  { id: "days", label: "Days" },
  { id: "places", label: "Places" },
  { id: "book", label: "Book" },
];

interface SiteHeaderProps {
  active: SectionId;
  onReplay: () => void;
}

export function SiteHeader({ active, onReplay }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    return () => document.documentElement.classList.remove("menu-open");
  }, [menuOpen]);


  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current || !menuButtonRef.current) return;
      const focusable = [menuButtonRef.current, ...Array.from(menuRef.current.querySelectorAll<HTMLButtonElement>("button"))];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus());
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [menuOpen]);

  const goTo = (id: SectionId) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <header
        className={`site-header${scrolled ? " site-header--scrolled aether-surface aether-surface--nav" : ""}`}
        data-aether={scrolled ? "main-navigation" : undefined}
      >
        <button className="brand" type="button" onClick={onReplay} aria-label="Replay the invitation opening">
          <WaxSeal small />
          <span><strong>Japan, Slowly</strong><small>Christmas · snow · New Year</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className={active === link.id ? "is-active" : ""}
              aria-current={active === link.id ? "location" : undefined}
              onClick={() => goTo(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </header>
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            ref={menuRef}
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="meta-label">Where would you like to go?</p>
            {links.map((link, index) => (
              <button key={link.id} type="button" aria-current={active === link.id ? "location" : undefined} onClick={() => goTo(link.id)}>
                <span>0{index + 1}</span>
                {link.label}
                <Icon name="arrow-right" />
              </button>
            ))}
            <button className="mobile-menu__replay" type="button" onClick={() => { setMenuOpen(false); onReplay(); }}>
              Replay the invitation
            </button>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
