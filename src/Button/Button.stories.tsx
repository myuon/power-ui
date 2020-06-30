import React from "react";
import { Button, ExoticButton } from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Usage = () => <Button>Send</Button>;

export const Variation = () => (
  <>
    <Button color="primary">送信</Button>

    <Button>キャンセル</Button>

    <ExoticButton>エキゾチック送信</ExoticButton>

    <Button variant="outlined" color="primary">
      Primary
    </Button>
  </>
);
