import { FloralDivider } from "@/components/ui/botanical";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({ eyebrow, title, copy, align = "center", dark = false }: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${align}${dark ? " section-heading--dark" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="section-heading__copy">{copy}</p> : null}
      <FloralDivider dark={dark} />
    </header>
  );
}
