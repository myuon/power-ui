/** @jsx jsx */
import React, { useState, useRef, useCallback, useContext } from "react";
import { jsx, css } from "@emotion/react";
import { Grid } from "../Grid/Grid";
import { useClickOutside } from "../useClickOutside";
import { Portal } from "../Portal";

export interface ModalFrameProps {
  header?: JSX.Element;
  children?: JSX.Element;
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

export const ModalWrapper: React.FC<
  ModalFrameProps & { onClickOutside?: () => void }
> = ({ children, onClickOutside, ...others }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const callback = useCallback(() => {
    if (onClickOutside) onClickOutside();
  }, [onClickOutside]);
  useClickOutside(modalRef, callback);

  return (
    <div
      css={css`
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
        ref={modalRef}
      >
        <ModalFrame {...others}>{children}</ModalFrame>
      </div>
    </div>
  );
};

export interface ModalProps extends ModalFrameProps {
  /** @default false */
  open?: boolean;

  onClickOutside?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClickOutside,
  ...others
}) => {
  return open ? (
    <Portal>
      <ModalWrapper {...others} onClickOutside={onClickOutside} />
    </Portal>
  ) : null;
};

const ModalContext = React.createContext<{
  add: (props: ModalFrameProps) => void;
} | null>(null);

export const ModalProvider: React.FC = ({ children }) => {
  const [element, setElement] = useState<JSX.Element>();
  const handleClose = useCallback(() => setElement(undefined), []);

  const add = useCallback(
    (props: ModalFrameProps) => {
      setElement(<ModalWrapper {...props} onClickOutside={handleClose} />);
    },
    [handleClose]
  );

  return (
    <ModalContext.Provider value={{ add }}>
      <Portal>{element}</Portal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const props = useContext(ModalContext);

  return {
    openModal: props!.add,
  };
};
