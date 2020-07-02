/** @jsx jsx */
import React, { useCallback, useMemo } from "react";
import { css, jsx } from "@emotion/core";
import { Typography } from "../Typography/Typography";
import { useRippleEffect } from "./RippleEffect";
import ColorLib from "color";

export type Variant = "filled" | "outlined";

export type Color = "primary" | "default";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default filled */
  variant?: Variant;

  /** @default default */
  color?: Color;

  rippleColor?: string;

  icon?: JSX.Element;
}

const theme = {
  primary: {
    main: "rgb(25, 128, 255)",
    shadow: "rgba(25, 128, 255, 0.5)",
    highlight: "white",
    text: "white",
  },
  default: {
    main: "rgb(245, 245, 245)",
    shadow: "rgba(150, 150, 150, 0.5)",
    highlight: "rgba(0, 0, 0, 0.3)",
    text: "#333",
  },
} as const;

export const Button: React.FC<ButtonProps> = ({
  variant,
  color,
  rippleColor,
  icon,
  onClick,
  ...others
}) => {
  const variant_ = useMemo(() => variant ?? "filled", [variant]);
  const color_ = useMemo(() => color ?? "default", [color]);
  const colorScheme = useMemo(() => theme[color_], [color_]);

  const { RippleEffect, onStart } = useRippleEffect({
    color: rippleColor ?? colorScheme.highlight ?? "white",
  });
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onStart(event);

      if (onClick) {
        onClick(event);
      }
    },
    [onClick, onStart]
  );

  return (
    <button
      {...others}
      css={css`
        cursor: pointer;
        border-radius: 3px;
        padding: 1ex 1.5em;
        outline: none;

        ${variant_ === "filled"
          ? css`
              border: 0;

              background-color: ${colorScheme.main};
              color: ${colorScheme.text};
              box-shadow: 0px 5px 10px -3px ${ColorLib(colorScheme.shadow).lighten(0.2).rgb().string()};
            `
          : css`
              background: white;
              color: ${color_ === "default"
                ? colorScheme.text
                : colorScheme.main};
              border: 1px solid
                ${color_ === "default" ? colorScheme.text : colorScheme.main};
            `}

        &:hover {
          ${variant_ === "filled"
            ? css`
                box-shadow: 0px 5px 10px 0px ${colorScheme.shadow},
                  0px 0px 2px 0px ${colorScheme.shadow};
              `
            : css`
                background: ${ColorLib(colorScheme.shadow)
                  .lighten(0.4)
                  .rgb()
                  .string()};
              `}
        }

        ${RippleEffect}
      `}
      onClick={handleClick}
    >
      <Typography
        variant="button"
        css={css`
          display: flex;
          align-items: center;
        `}
        color="inherit"
        as="span"
      >
        {icon !== undefined && (
          <span
            css={css`
              display: inherit;
              align-items: inherit;

              margin-right: 4px;
              margin-left: -4px;
            `}
          >
            {icon}
          </span>
        )}
        {others.children}
      </Typography>
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

        button {
          background-color: #333;
          color: white;
        }
      `}
    >
      <Button {...others} rippleColor="white" />
    </div>
  );
};
