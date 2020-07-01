import React, { useState, useCallback } from "react";
import { SelectField } from "./SelectField";
import { Typography } from "../Typography/Typography";
import { Button } from "../Button/Button";

export default {
  title: "SelectField",
  component: SelectField,
};

export const Usage = () => {
  const [value, setValue] = useState<string>("hoge");

  return (
    <>
      <Typography>選ばれたのは{value}でした。</Typography>
      <div style={{ width: 250 }}>
        <SelectField
          data={["hoge", "piyo", "poyo", "nyan"]}
          defaultValue="hoge"
          onChange={setValue}
        />
      </div>
    </>
  );
};

export const Uncontrolled = () => {
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const input = Object.fromEntries(new FormData(event.currentTarget));

      window.alert(`選ばれたのは${input["numbers"]}でした。`);
    },
    []
  );

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: 250 }}>
        <SelectField name="numbers" data={["1", "2", "3"]} />

        <Button type="submit">Send</Button>
      </form>
    </>
  );
};
