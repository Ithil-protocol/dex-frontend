import MuiTabs, { TabsTypeMap } from "@mui/material/Tabs";
import React from "react";
import { SideKey } from "types";

interface Props {
  children?: React.ReactNode;
  value: SideKey;
  onChange: (event: React.SyntheticEvent, newValue: SideKey) => void;
  variant?: TabsTypeMap["props"]["variant"];
}

const WrapperTabs: React.FC<Props> = (props) => {
  return (
    <MuiTabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  );
};

export default WrapperTabs;
