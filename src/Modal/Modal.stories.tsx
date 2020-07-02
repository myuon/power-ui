import React from "react";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";

export default {
  title: "Modal",
  component: Modal,
};

export const Usage = () => {
  return (
    <Modal open header={<Typography variant="h3">Title</Typography>}>
      <Typography>
        Windowsでコンピューターの世界が広がります。
        <br />
        PC
        <br />
        AAA
      </Typography>
    </Modal>
  );
};
