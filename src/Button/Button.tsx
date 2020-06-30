/** @jsx jsx */
import React, { useCallback, useMemo } from "react";
import { css, jsx } from "@emotion/core";
import { Typography } from "../Typography/Typography";
import { useRippleEffect } from "./RippleEffect";

export type Variant = "filled" | "outlined";

export type Color = "primary" | "default" | "inverted";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** @default filled */
  variant?: Variant;

  /** @default default */
  color?: Color;
}

const theme = {
  primary: {
    main: "rgb(25, 128, 255)",
    light: "rgba(25, 128, 255, 0.5)",
    shadow: "white",
    text: "white",
  },
  default: {
    main: "rgb(245, 245, 245)",
    light: "rgba(200, 200, 200, 0.5)",
    shadow: "rgba(0,0,0,0.3)",
    text: "#333",
  },
} as const;

export const Button: React.FC<ButtonProps> = ({
  variant,
  color,
  ...others
}) => {
  const variant_ = useMemo(() => variant ?? "filled", [variant]);
  const color_ = useMemo(() => color ?? "default", [color]);
  const colorScheme = useMemo(
    () =>
      color_ === "primary" || color_ === "default" ? theme[color_] : undefined,
    [color_]
  );

  const { RippleEffect, onStart } = useRippleEffect({
    color:
      variant_ === "filled"
        ? colorScheme?.shadow ?? "white"
        : colorScheme?.main ?? "white",
  });
  const handleClick = useCallback((event) => onStart(event), [onStart]);

  return (
    <button
      {...others}
      css={css`
        cursor: pointer;
        border-radius: 3px;
        padding: 1ex 1.5em;

        ${variant_ === "filled"
          ? css`
              border: 0;

              ${color === "inverted"
                ? css`
                    background-color: #333;
                    color: white;
                  `
                : css`
                    background-color: ${colorScheme?.main};
                    color: ${colorScheme?.text};
                    box-shadow: 0px 5px 10px -3px ${color === "primary" ? "rgba(25, 128, 255, 0.25)" : "rgba(200, 200, 200, 0.5)"};
                  `}
            `
          : css`
              background: white;
              color: ${colorScheme?.main};
              border: 1px solid ${colorScheme?.main};
            `}

        &:hover {
          ${variant_ === "filled"
            ? css`
                box-shadow: 0px 5px 10px 0px
                    ${color === "primary"
                      ? "rgba(25, 128, 255, 0.5)"
                      : "rgba(200, 200, 200, 1.0)"},
                  0px 0px 2px 0px
                    ${color === "primary"
                      ? "rgba(25, 128, 255, 0.5)"
                      : "rgba(200, 200, 200, 1.0)"};
              `
            : css`
                background: ${colorScheme?.light};
              `}
        }

        ${RippleEffect}
      `}
      onClick={handleClick}
    >
      <Typography variant="button">{others.children}</Typography>
    </button>
  );
};

export const ExoticButton: React.FC<ButtonProps> = ({ ...others }) => {
  return (
    <div
      css={css`
        background: linear-gradient(
            217deg,
            rgba(255, 0, 0, 1),
            rgba(255, 0, 0, 0) 50.71%
          ),
          linear-gradient(
            127deg,
            rgba(0, 255, 0, 0.8),
            rgba(0, 255, 0, 0) 70.71%
          ),
          linear-gradient(0deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%),
          linear-gradient(
            180deg,
            rgba(255, 255, 0, 0.8),
            rgba(255, 255, 0, 0) 70.71%
          );
        border-radius: 2px;
        padding: 4px;
        display: inline-block;
      `}
    >
      <Button color="inverted" {...others} />
    </div>
  );
};
