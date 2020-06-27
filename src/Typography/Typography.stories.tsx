import React from "react";
import { Typography, ExoticTypography } from "./Typography";

export default {
  title: "Typography",
  component: Typography,
};

export const Usage = () => <Typography>Hello, World!</Typography>;

export const Variation = () => (
  <>
    <Typography variant="h1">
      Windowsでコンピューターの世界が広がります
    </Typography>
    <Typography variant="h2">
      Windowsでコンピューターの世界が広がります
    </Typography>
    <Typography variant="h3">
      Windowsでコンピューターの世界が広がります
    </Typography>
    <Typography variant="h4">
      Windowsでコンピューターの世界が広がります
    </Typography>
    <Typography variant="body">
      Windowsでコンピューターの世界が広がります
    </Typography>
    <Typography variant="caption">
      Windowsでコンピューターの世界が広がります
    </Typography>

    <ExoticTypography variant="h1">エキゾチックH1 Typography</ExoticTypography>
    <ExoticTypography>エキゾチックBody</ExoticTypography>
  </>
);
