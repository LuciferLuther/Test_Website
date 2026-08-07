import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "arrow-down"
  | "arrow-right"
  | "calendar"
  | "check"
  | "chevron-down"
  | "close"
  | "heart"
  | "map"
  | "menu"
  | "plane"
  | "plus"
  | "route"
  | "snow"
  | "sparkle"
  | "train"
  | "water"
  | "x";

const paths: Record<IconName, ReactNode> = {
  "arrow-down": <path d="M12 4v15m0 0-6-6m6 6 6-6" />,
  "arrow-right": <path d="M5 12h14m0 0-5-5m5 5-5 5" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15m6-12v15" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  plane: <path d="m22 2-8 20-4-8-8-4Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 17c5-2 3-7 8-9" /></>,
  snow: <path d="M12 2v20M4.2 6.5l15.6 11M19.8 6.5l-15.6 11M8 4l4 3 4-3M8 20l4-3 4 3M3.5 10 8 12l-.5 5M20.5 10 16 12l.5 5" />,
  sparkle: <path d="M12 2c.8 5 2 8.2 7 9-5 .8-6.2 4-7 9-.8-5-2-8.2-7-9 5-.8 6.2-4 7-9Z" />,
  train: <><rect x="5" y="3" width="14" height="15" rx="3" /><path d="M8 21l2-3m6 3-2-3M8 8h8M8 13h.01M16 13h.01" /></>,
  water: <path d="M12 2s6 7 6 12a6 6 0 1 1-12 0c0-5 6-12 6-12Z" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
