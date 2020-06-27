import React from "react";
import { TextField, ExoticTextField } from "./TextField";

export default {
  title: "Input",
  component: TextField,
};

export const Usage = () => <TextField label="UserName" />;

export const Variation = () => (
  <>
    <TextField />
    <ExoticTextField label="UserName" />
  </>
);
