/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

export const TextField: React.FC = () => {
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
      <input
        defaultValue="ゲーミングInputForm"
        css={css`
          font-size: 16px;
          line-height: 24px;
          min-height: 24px;
          padding: 0 3px;

          border: 0;
          background: #222;
          color: white;
        `}
      />
    </div>
  );
};
