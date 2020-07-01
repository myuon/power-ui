/** @jsx jsx */
import React, { useState, useCallback, useEffect, useRef } from "react";
import { jsx, css } from "@emotion/core";
import { Typography } from "../Typography/Typography";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

const useClickOutside = (
  ref: React.RefObject<Element>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        callback(event);
      }
    };
    document.addEventListener("mousedown", { handleEvent: handleClickOutside });

    return () =>
      document.removeEventListener("mousedown", {
        handleEvent: handleClickOutside,
      });
  }, [ref, callback]);
};

export interface SelectFieldProps {
  data: string[];
  defaultValue: string;
  onChange?: (value: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  data,
  defaultValue,
  onChange,
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

  return (
    <React.Fragment>
      <div
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            padding: 0.75ex 0.5em;
            border: 1px solid #999;
            border-radius: 3px;

            display: flex;
            align-items: center;
            cursor: pointer;
          `}
          onClick={handleOpen}
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
            <li key={i} onClick={() => handleChange(i)}>
              <Typography>{d}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};
