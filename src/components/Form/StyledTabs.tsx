import Tabs, { TabsTypeMap } from "@mui/material/Tabs";
import React from "react";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  variant?: TabsTypeMap["props"]["variant"];
}

export const StyledTabs = (props: StyledTabsProps) => {
  return (
    <Tabs
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
