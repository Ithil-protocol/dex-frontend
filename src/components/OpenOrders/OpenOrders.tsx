import { Box } from "@mui/material";
import Orders from "./Orders/Orders";
import WrapperTabs from "components/common/Tabs";
import TabPanel from "components/common/Panel";
import WrapperTab from "components/common/Tab";
import React from "react";
import { openOrdersData } from "data/openOrders";

export const OpenOrders = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        borderRadius: "5px",
        gap: "5px",
        padding: "10px 5px 5px 5px",
      })}
    >
      <Box
        sx={(theme) => ({
          bgcolor: theme.palette.background.paper,
          borderRadius: "5px",
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
      </Box>
    </Box>
  );
};
