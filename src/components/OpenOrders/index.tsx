import { Box } from "@mui/material";
import Orders from "./Orders";
import WrapperTabs from "components/common/Tabs";
import TabPanel from "components/common/TabPanel";
import WrapperTab from "components/common/Tab";
import React from "react";
import { openOrdersData } from "data/openOrders";
import WrapperBox from "components/common/Box";

export const OpenOrders = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <WrapperBox
      overrideStyles={(theme) => ({
        bgcolor: theme.palette.background.paper,
        gap: "5px",
        padding: "10px 5px 5px 5px",
      })}
    >
      <WrapperBox
        overrideStyles={(theme) => ({
          bgcolor: theme.palette.background.paper,
        })}
      >
        <Box>
          <WrapperTabs value={value} onChange={handleChange}>
            <WrapperTab label="Open Orders" />
            <WrapperTab label="Orders History" />
          </WrapperTabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Orders openOrdersData={openOrdersData} hasCancel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Orders openOrdersData={openOrdersData} hasCancel={false} />
        </TabPanel>
      </WrapperBox>
    </WrapperBox>
  );
};
