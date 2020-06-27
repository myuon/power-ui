/** @jsx jsx */
import React from "react";
import { TextField, ExoticTextField } from "./TextField";
import { css, jsx } from "@emotion/core";
import { ExoticTypography } from "../Typography/Typography";
import { Button, ExoticButton } from "../Button/Button";

export default {
  title: "Input",
  component: TextField,
};

export const Usage = () => <TextField label="UserName" />;

export const Variation = () => (
  <React.Fragment>
    <TextField />
    <ExoticTextField label="UserName" />
  </React.Fragment>
);

export const ExoticForm = () => (
  <React.Fragment>
    <ExoticTypography variant="h4">ユーザー情報入力</ExoticTypography>
    <form
      css={css`
        font-weight: bold;
      `}
    >
      <fieldset
        css={css`
          border: 0;

          & > label {
            margin-right: 0.5em;
          }
        `}
      >
        <label>
          <ExoticTypography inline>ユーザー名*</ExoticTypography>
        </label>
        <ExoticTextField placeholder="ユーザー名 (半角英数)" />
      </fieldset>

      <fieldset
        css={css`
          border: 0;

          & > label {
            margin-right: 0.5em;
          }
        `}
      >
        <label>
          <ExoticTypography inline>パスワード*</ExoticTypography>
        </label>
        <ExoticTextField placeholder="パスワード (13文字以上)" />
      </fieldset>

      <div
        css={css`
          & > * {
            margin: 5px;
          }

          margin: -5px;
        `}
      >
        <ExoticButton>送信</ExoticButton>
        <Button color="default">キャンセル</Button>
      </div>
    </form>
  </React.Fragment>
);
