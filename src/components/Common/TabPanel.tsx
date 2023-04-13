import React from "react";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
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
