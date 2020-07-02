/** @jsx jsx */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { jsx, css } from "@emotion/core";
import { Grid } from "../Grid/Grid";

export interface ModalFrameProps {
  header?: JSX.Element;
}

export const ModalFrame: React.FC<ModalFrameProps> = ({ header, children }) => {
  return (
    <div
      css={css`
        background-color: white;
        max-width: 600px;
        border-radius: 3px;
      `}
    >
      <Grid container direction="column">
        <Grid
          item
          css={css`
            padding: 1.5ex 1.5em;
          `}
        >
          {header}
        </Grid>
        <Grid
          item
          css={css`
            padding: 1.5ex 1.5em;
          `}
        >
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export interface ModalProps extends ModalFrameProps {
  /** @default false */
  open?: boolean;
}

export const ModalWrapper: React.FC<ModalFrameProps> = ({
  children,
  ...others
}) => {
  return (
    <div
      css={css`
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        position: fixed;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      >
        <ModalFrame {...others}>{children}</ModalFrame>
      </div>
    </div>
  );
};

export const Modal: React.FC<ModalProps> = ({ open, ...others }) => {
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const elem = document.createElement("div");
    setPortal(elem);

    document.body.appendChild(elem);
    return () => {
      document.body.removeChild(elem);
    };
  }, []);

  return open
    ? portal && ReactDOM.createPortal(<ModalWrapper {...others} />, portal)
    : null;
};
