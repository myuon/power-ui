import React, { useState } from "react";
import { SelectField } from "./SelectField";
import { Typography } from "../Typography/Typography";

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
