/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { Typography } from "../Typography/Typography";

export interface TextFieldProps {
  label?: string;
  defaultValue?: string;
  placeholder?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  defaultValue,
  placeholder,
}) => {
  return (
    <React.Fragment>
      {label && <Typography variant="caption">{label}</Typography>}
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        css={css`
          font-size: 16px;
          line-height: 24px;
          min-height: 24px;
          padding: 0.5ex 0.5em;
          border-radius: 3px;
          border: 1px solid #999;
          outline: none;

          &:focus {
            border-color: rgb(25, 128, 255);
            box-shadow: 0px 0px 3px 0px rgba(25, 128, 255, 0.5);
          }
        `}
      />
    </React.Fragment>
  );
};

export type ExoticTextFieldProps = TextFieldProps;

export const ExoticTextField: React.FC<ExoticTextFieldProps> = ({
  ...others
}) => {
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

        & > input {
          background: #222;
          color: white;
          border: 1px solid #222;

          &:focus {
            border-color: white;
            box-shadow: 0px 0px 3px 0px rgba(255, 255, 255, 0.5);
          }
        }
      `}
    >
      <TextField {...others} />
    </div>
  );
};
