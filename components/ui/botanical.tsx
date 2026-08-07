import { cx } from "@/lib/utils";

interface BotanicalProps {
  className?: string;
  side?: "left" | "right";
  tone?: "ink" | "gold" | "light";
}

export function Botanical({ className, side = "left", tone = "ink" }: BotanicalProps) {
  return (
    <svg
      className={cx("botanical", `botanical--${side}`, `botanical--${tone}`, className)}
      viewBox="0 0 180 380"
      aria-hidden="true"
      focusable="false"
    >
      <path className="botanical__stem" d="M90 365C82 300 112 252 94 194 80 149 48 110 63 28" />
      <path className="botanical__stem" d="M86 319C58 300 42 279 33 250M96 277C126 258 139 234 145 206M88 231C61 211 50 185 48 158M90 184C117 166 131 142 133 116M76 137C53 119 45 96 46 73" />
      <g className="botanical__leaves">
        <ellipse cx="53" cy="295" rx="9" ry="22" transform="rotate(-43 53 295)" />
        <ellipse cx="34" cy="263" rx="8" ry="19" transform="rotate(-28 34 263)" />
        <ellipse cx="123" cy="252" rx="9" ry="22" transform="rotate(42 123 252)" />
        <ellipse cx="143" cy="217" rx="8" ry="19" transform="rotate(25 143 217)" />
        <ellipse cx="62" cy="207" rx="9" ry="22" transform="rotate(-42 62 207)" />
        <ellipse cx="46" cy="169" rx="8" ry="19" transform="rotate(-20 46 169)" />
        <ellipse cx="117" cy="157" rx="9" ry="22" transform="rotate(42 117 157)" />
        <ellipse cx="134" cy="123" rx="8" ry="19" transform="rotate(22 134 123)" />
        <ellipse cx="60" cy="116" rx="8" ry="20" transform="rotate(-38 60 116)" />
        <ellipse cx="47" cy="80" rx="7" ry="17" transform="rotate(-18 47 80)" />
      </g>
      <g className="botanical__berries">
        <circle cx="77" cy="339" r="5" /><circle cx="66" cy="330" r="3.5" />
        <circle cx="108" cy="276" r="4" /><circle cx="115" cy="266" r="3" />
        <circle cx="72" cy="188" r="4" /><circle cx="65" cy="178" r="3" />
        <circle cx="101" cy="148" r="4" /><circle cx="109" cy="139" r="3" />
        <circle cx="64" cy="62" r="4" /><circle cx="71" cy="52" r="3" />
      </g>
    </svg>
  );
}

export function FloralDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cx("floral-divider", dark && "floral-divider--dark")} aria-hidden="true">
      <span />
      <svg viewBox="0 0 100 26" focusable="false">
        <path d="M3 13c15 0 19-9 31-9 8 0 10 6 16 9-6 3-8 9-16 9-12 0-16-9-31-9Zm94 0c-15 0-19-9-31-9-8 0-10 6-16 9 6 3 8 9 16 9 12 0 16-9 31-9Z" />
        <circle cx="50" cy="13" r="3.5" />
      </svg>
      <span />
    </div>
  );
}

export function WaxSeal({ small = false }: { small?: boolean }) {
  return (
    <span className={cx("wax-seal", small && "wax-seal--small")} aria-hidden="true">
      <span>冬</span>
    </span>
  );
}
