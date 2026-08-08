"use client";

import { useEffect } from "react";

const ACTIVE_ATTRIBUTE = "data-aether-active";

export function AetherRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedTransparency = window.matchMedia("(prefers-reduced-transparency: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const supportsBackdrop =
      typeof CSS !== "undefined" &&
      (CSS.supports("backdrop-filter", "blur(1px)") || CSS.supports("-webkit-backdrop-filter", "blur(1px)"));

    let activeSurface: HTMLElement | null = null;
    let frame = 0;

    const clearActiveSurface = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      activeSurface?.removeAttribute(ACTIVE_ATTRIBUTE);
      activeSurface = null;
    };

    const updateEnvironment = () => {
      root.dataset.aether = supportsBackdrop && !reducedTransparency.matches ? "glass" : "solid";
      root.dataset.aetherMotion = reducedMotion.matches ? "reduced" : "full";
      root.dataset.aetherPointer = finePointer.matches ? "fine" : "coarse";
      if (reducedMotion.matches || !finePointer.matches) clearActiveSurface();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches) return;
      const source = event.target instanceof Element ? event.target : null;
      const surface = source?.closest<HTMLElement>("[data-aether]") ?? null;

      if (!surface) {
        clearActiveSurface();
        return;
      }

      if (activeSurface !== surface) {
        activeSurface?.removeAttribute(ACTIVE_ATTRIBUTE);
        activeSurface = surface;
        activeSurface.setAttribute(ACTIVE_ATTRIBUTE, "true");
      }

      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const rect = surface.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
        const y = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100));
        surface.style.setProperty("--aether-x", `${x.toFixed(2)}%`);
        surface.style.setProperty("--aether-y", `${y.toFixed(2)}%`);
      });
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) clearActiveSurface();
    };

    const mediaQueries = [reducedMotion, reducedTransparency, finePointer];
    mediaQueries.forEach((query) => query.addEventListener("change", updateEnvironment));
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    window.addEventListener("blur", clearActiveSurface);

    updateEnvironment();

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener("change", updateEnvironment));
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", clearActiveSurface);
      clearActiveSurface();
      delete root.dataset.aether;
      delete root.dataset.aetherMotion;
      delete root.dataset.aetherPointer;
    };
  }, []);

  return null;
}
