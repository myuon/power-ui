/** @jsx jsx */
import React, { useMemo, useCallback } from "react";
import { jsx, css } from "@emotion/core";
import { Typography } from "../Typography/Typography";

export type Variant = "outlined" | "underlined";

export interface TextFieldProps {
  /** @default outlined */
  variant?: Variant;

  label?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const OutlinedTextField = ({
  defaultValue,
  placeholder,
  onChange,
}: Pick<TextFieldProps, "defaultValue" | "placeholder"> & {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      css={css`
        font-size: 16px;
        line-height: 24px;
        min-height: 24px;
        padding: 0.75ex 0.5em;
        outline: none;

        border-radius: 3px;
        border: 1px solid #999;

        &:focus {
          border-color: rgb(25, 128, 255);
          box-shadow: 0px 0px 3px 0px rgba(25, 128, 255, 0.5);
        }
      `}
    />
  );
};

const UnderlinedTextField = ({
  defaultValue,
  placeholder,
  onChange,
}: Pick<TextFieldProps, "defaultValue" | "placeholder"> & {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div
      css={css`
        position: relative;

        input:focus + div > div.enabled-on-focused {
          width: 100%;
        }
      `}
    >
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        css={css`
          font-size: 16px;
          line-height: 24px;
          min-height: 24px;
          padding: 0.75ex 0.5em;
          outline: none;
          border: 0;
        `}
      />

      <div
        css={css`
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        `}
      >
        <div
          css={css`
            border-bottom: 2px solid rgba(0, 0, 0, 0.15);
            width: 100%;
            height: 2px;
            position: absolute;
            bottom: 0;
          `}
        />
        <div
          className="enabled-on-focused"
          css={css`
            border-bottom: 2px solid rgb(25, 128, 255);
            width: 0;
            height: 2px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 0;
            transition: all 0.3s ease;
            backface-visibility: hidden;
          `}
        />
      </div>
    </div>
  );
};

export const TextField: React.FC<TextFieldProps> = ({
  variant,
  label,
  defaultValue,
  placeholder,
  onChange,
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.currentTarget.value, event);
      }
    },
    [onChange]
  );
  const TextFieldComponent = useMemo(
    () =>
      (variant ?? "outlined") === "outlined"
        ? OutlinedTextField
        : UnderlinedTextField,
    [variant]
  );

  return (
    <React.Fragment>
      {label && <Typography variant="caption">{label}</Typography>}
      <TextFieldComponent
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={handleChange}
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
