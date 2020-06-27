/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";

export type Variant = "h1" | "h2" | "h3" | "h4" | "body" | "caption";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * @default body
   */
  variant?: Variant;
}

const VariantTagMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  caption: "small",
} as const;

export const Typography: React.FC<TypographyProps> = ({
  variant,
  ...others
}) => {
  const Component = VariantTagMapping[variant ?? "body"];

  return (
    <Component
      {...others}
      css={css`
        ${
          variant === "h1" &&
          css`
            font-size: 32px;
            line-height: 48px;
            letter-spacing: -0.6px;
          `
        }

        ${
          variant === "h2" &&
          css`
            font-size: 24px;
            line-height: 32px;
            letter-spacing: -0.25px;
          `
        }

        ${
          variant === "h3" &&
          css`
            font-size: 20px;
            line-height: 24px;
            letter-spacing: -0.1px;
          `
        }

        ${
          variant === "h4" &&
          css`
            font-size: 18px;
            line-height: 24px;
            letter-spacing: 0.3px;
          `
        }

        ${
          variant === "body" &&
          css`
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0.65px;
          `
        }

        ${
          variant === "caption" &&
          css`
            font-size: 14px;
            line-height: 16px;
            letter-spacing: 0.5px;
          `
        }
      `}
    />
  );
};
