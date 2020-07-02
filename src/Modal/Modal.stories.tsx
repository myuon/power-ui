import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";
import { Button } from "../Button/Button";

export default {
  title: "Modal",
  component: Modal,
};

export const Usage = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        open={open}
        onClickOutside={() => setOpen(false)}
        header={<Typography variant="h3">Title</Typography>}
      >
        <Typography>
          Windowsでコンピューターの世界が広がります。
          <br />
          PC
          <br />
          AAA
        </Typography>
      </Modal>
    </React.Fragment>
  );
};
