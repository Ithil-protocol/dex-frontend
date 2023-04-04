import Box from "@mui/material/Box";
import React from "react";
import FormTabs from "./Form";
import TabPanel from "./Panel";
import Tab from "./Tab";
import Tabs from "./Tabs";

const OrderTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ bgcolor: "#233347" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Limit" />
          <Tab label="Market" />
        </Tabs>
      </Box>

      <Box sx={{ backgroundColor: "#233347", padding: "10px 5px 5px 5px" }}>
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
