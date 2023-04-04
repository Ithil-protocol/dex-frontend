import MuiTabs, { TabsTypeMap } from "@mui/material/Tabs";
import React from "react";

interface Props {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  variant?: TabsTypeMap["props"]["variant"];
}

const Tabs: React.FC<Props> = (props) => {
  return (
    <MuiTabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
      sx={{
        "& .MuiTabs-indicator": {
          backgroundColor: "transparent",
        },
        // "& .MuiTabs-indicatorSpan": {},
      }}
    />
  );
};

export default Tabs;
