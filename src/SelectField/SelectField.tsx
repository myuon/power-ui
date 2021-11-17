/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { Typography } from "../Typography/Typography";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { useClickOutside } from "../useClickOutside";

export interface SelectFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "defaultValue"
  > {
  data: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  data,
  defaultValue,
  onChange,
  ...others
}) => {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen((b) => !b), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleChange = (i: number) => {
    if (onChange) onChange(data[i]);

    handleClose();
    setValue(data[i]);
  };

  const popperRef = useRef(null);
  useClickOutside(popperRef, handleClose);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <React.Fragment>
      <div
        css={css`
          position: relative;
        `}
      >
        <input
          readOnly
          type="hidden"
          ref={inputRef}
          aria-hidden={true}
          tabIndex={-1}
          {...others}
        />
        <div
          css={css`
            outline: none;
            padding: 0.75ex 0.5em;
            border: 1px solid #999;
            border-radius: 3px;

            display: flex;
            align-items: center;
            cursor: pointer;

            &:focus {
              border-color: rgb(25, 128, 255);
              box-shadow: 0px 0px 3px 0px rgba(25, 128, 255, 0.5);
            }
          `}
          onClick={handleOpen}
          aria-haspopup="listbox"
          tabIndex={0}
          role="button"
        >
          <div
            css={css`
              flex-grow: 1;
            `}
          >
            <Typography>{value}</Typography>
          </div>
          <ArrowDropDown />
        </div>
        <ul
          role="listbox"
          tabIndex={-1}
          ref={popperRef}
          css={css`
            ${!open &&
            css`
              display: none;
            `}

            margin: 0;
            padding: 5px;
            list-style: none;
            border-radius: 3px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);

            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            background: white;
            width: 100%;
            outline: none;

            li {
              cursor: pointer;
              padding: 1ex 0.5em;
              border-radius: 3px;
            }
            li:hover {
              background-color: #eee;
            }
          `}
        >
          {data.map((d, i) => (
            <li
              key={i}
              onClick={() => handleChange(i)}
              role="option"
              aria-disabled={false}
            >
              <Typography>{d}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};
