import React from "react";
import { Side } from "types";

interface Props {
  children?: React.ReactNode;
  index: Side;
  value: Side;
}

const TabPanel: React.FC<Props> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
};

export default TabPanel;
