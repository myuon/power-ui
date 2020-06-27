import React from "react";

export type Variant = "h1" | "h2" | "h3" | "h4" | "body" | "caption";

export interface TypographyProps {
  variant?: Variant;
}

const VariantTagMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  caption: "p",
} as const;

export const Typography: React.FC<TypographyProps> = ({
  variant,
  ...other
}) => {
  const Component = VariantTagMapping[variant ?? "body"];

  return <Component {...other} />;
};
