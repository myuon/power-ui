import React from "react";
import { Typography } from "./Typography";

export default {
  title: "Typography",
  component: Typography,
};

export const Usage = () => <Typography>Hello, World!</Typography>;

export const Variation = () => (
  <>
    <Typography variant="h1">H1, Hello, World!</Typography>
    <Typography variant="h2">H2, Hello, World!</Typography>
    <Typography variant="h3">H3, Hello, World!</Typography>
    <Typography variant="h4">H4, Hello, World!</Typography>
    <Typography variant="body">body, Hello, World!</Typography>
    <Typography variant="caption">caption, Hello, World!</Typography>
  </>
);
