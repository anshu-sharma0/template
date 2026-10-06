import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionBackground = "default" | "soft" | "surface" | "warm" | "rose" | "none";
type SectionSpacing = "sm" | "md" | "lg";
type SectionAlign = "left" | "center";
type SectionWidth = "sm" | "md" | "lg" | "xl" | "full";

const backgrounds: Record<SectionBackground, string> = {
  default: "bg-background",
  soft: "bg-surface-soft",
  surface: "bg-surface",
  warm: "bg-ivory",
  rose: "bg-primary-soft/45",
  none: "",
};

const spacings: Record<SectionSpacing, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  background?: SectionBackground;
  spacing?: SectionSpacing;
  align?: SectionAlign;
  containerWidth?: SectionWidth;
  fullWidth?: boolean;
  decorative?: ReactNode;
};

export function Section({
  children,
  className,
  background = "default",
  spacing = "md",
  align = "left",
  containerWidth = "xl",
  fullWidth = false,
  decorative,
  ...props
}: SectionProps) {
  const content = (
    <div className={cn("relative z-10", align === "center" && "text-center")}>{children}</div>
  );

  return (
    <section
      className={cn("relative overflow-hidden", backgrounds[background], spacings[spacing], className)}
      {...props}
    >
      {decorative}
      {fullWidth ? content : <Container width={containerWidth}>{content}</Container>}
    </section>
  );
}
