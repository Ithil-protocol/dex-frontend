import Box from "@mui/material/Box";
import React from "react";
import FormTabs from "./Form";
import TabPanel from "../../common/Panel";
import Tab from "../../common/Tab";
import Tabs from "../../common/Tabs";

const OrderTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        borderRadius: "5px",
      })}
    >
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Limit" />
          <Tab label="Market" />
        </Tabs>
      </Box>

      <Box
        sx={{
          padding: "10px 5px 5px 5px",
        }}
      >
        <TabPanel value={value} index={0}>
          <FormTabs />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormTabs />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default OrderTabs;
