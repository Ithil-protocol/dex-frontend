import React from "react";
import { SideKey } from "types";

interface Props {
  children?: React.ReactNode;
  index: SideKey;
  value: SideKey;
}

const TabPanel: React.FC<Props> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
