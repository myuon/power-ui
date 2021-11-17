/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid } from "./Grid";

export default {
  title: "Grid",
  component: Grid,
};

export const Usage = () => (
  <Grid container gap={3}>
    <Grid item xs={12}>
      <div
        css={css`
          background: teal;
          padding: 10px;
        `}
      >
        1
      </div>
    </Grid>

    <Grid item xs={6}>
      <div
        css={css`
          background: hotpink;
          padding: 10px;
        `}
      >
        2
      </div>
    </Grid>

    <Grid item xs={6}>
      <div
        css={css`
          background: mistyrose;
          padding: 10px;
        `}
      >
        3
      </div>
    </Grid>

    <Grid item xs={4}>
      <div
        css={css`
          background: lightblue;
          padding: 10px;
        `}
      >
        4
      </div>
    </Grid>

    <Grid item xs={4}>
      <div
        css={css`
          background: lightcoral;
          padding: 10px;
        `}
      >
        5
      </div>
    </Grid>

    <Grid item xs={4}>
      <div
        css={css`
          background: lightgoldenrodyellow;
          padding: 10px;
        `}
      >
        6
      </div>
    </Grid>
  </Grid>
);
