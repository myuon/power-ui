/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/react";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 0 */
  gap?: number;

  /** @default row */
  direction?: "column" | "row";

  item?: boolean;
  container?: boolean;

  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";

  align?:
    | "stretch"
    | "normal"
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end";
}

export const Grid: React.FC<GridProps> = ({
  gap,
  direction,
  item,
  container,
  xs,
  align,
  ...others
}) => {
  return (
    <div
      {...others}
      css={css`
        box-sizing: border-box;
        align-items: ${align ?? "stretch"};

        ${
          container &&
          css`
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            flex-direction: ${direction};
          `
        }
        ${
          item &&
          css`
            margin: 0;
          `
        }
        ${
          xs &&
          (xs === "auto"
            ? css`
                flex-grow: 1;
              `
            : css`
                flex-grow: 0;
                max-width: ${(100 * xs) / 12}%;
                flex-basis: ${(100 * xs) / 12}%;
              `)
        }
        ${
          gap &&
          css`
            width: calc(100% + ${gap * 8}px);
            margin: -${gap * 4}px;

            & > * {
              padding: ${gap * 4}px;
            }
          `
        };
      `}
    />
  );
};
