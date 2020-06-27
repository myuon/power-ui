/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { Typography } from "../Typography/Typography";

export type Color = "primary" | "default" | "inverted";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** @default default */
  color?: Color;
}

export const Button: React.FC<ButtonProps> = ({ color, ...others }) => (
  <button
    {...others}
    css={css`
      border: 0;
      border-radius: 3px;
      padding: 1ex 1.5em;

      ${color === "inverted"
        ? css`
            background-color: #333;
            color: white;
          `
        : css`
            background-color: ${color === "primary"
              ? "rgb(25, 128, 255)"
              : "rgb(245, 245, 245)"};
            color: ${color === "primary" ? "white" : "#333"};
            box-shadow: 0px 5px 10px -3px ${color === "primary" ? "rgba(25, 128, 255, 0.5)" : "rgba(200, 200, 200, 1.0)"};
          `}
    `}
  >
    <Typography variant="button">{others.children}</Typography>
  </button>
);

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
