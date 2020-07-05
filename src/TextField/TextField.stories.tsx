/** @jsx jsx */
import React from "react";
import { TextField, ExoticTextField } from "./TextField";
import { css, jsx } from "@emotion/core";
import { ExoticTypography } from "../Typography/Typography";
import { Button, ExoticButton } from "../Button/Button";
import { Grid } from "../Grid/Grid";

export default {
  title: "TextField",
  component: TextField,
};

export const Usage = () => (
  <TextField label="UserName" placeholder="ユーザー名(8文字以内)" />
);

export const Variation = () => (
  <Grid container gap={1} align="flex-end">
    <Grid item>
      <TextField placeholder="input here..." />
    </Grid>
    <Grid item>
      <TextField
        variant="underlined"
        label="UserName"
        placeholder="input here..."
      />
    </Grid>
    <Grid item>
      <ExoticTextField label="UserName" />
    </Grid>
  </Grid>
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
