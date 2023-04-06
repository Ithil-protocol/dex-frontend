import MuiTabs, { TabsTypeMap } from "@mui/material/Tabs";
import React from "react";

interface Props {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  variant?: TabsTypeMap["props"]["variant"];
}

const WrapperTabs: React.FC<Props> = (props) => {
  return (
    <MuiTabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
      sx={{
        padding: "5px",
        "& .MuiTabs-indicator": {
          background: "unset",
        },
      }}
    />
  );
};

export default WrapperTabs;
