import React from "react";
import { Button, ExoticButton } from "./Button";
import HomeIcon from "@material-ui/icons/Home";
import { Grid } from "../Grid/Grid";

export default {
  title: "Button",
  component: Button,
};

export const Usage = () => <Button>Send</Button>;

export const Variation = () => (
  <Grid container gap={1} align="center">
    <Grid item>
      <Button color="primary">送信</Button>
    </Grid>

    <Grid item>
      <Button>キャンセル</Button>
    </Grid>

    <Grid item>
      <ExoticButton>エキゾチック送信</ExoticButton>
    </Grid>

    <Grid item>
      <Button variant="outlined" color="primary">
        Primary
      </Button>
    </Grid>

    <Grid item>
      <Button variant="outlined">Default</Button>
    </Grid>

    <Grid item>
      <Button icon={<HomeIcon />}>Default</Button>
    </Grid>

    <Grid item>
      <Button icon={<HomeIcon />} />
    </Grid>
  </Grid>
);
