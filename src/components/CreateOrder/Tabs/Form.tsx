import Box from "@mui/material/Box";
import React from "react";
import Form from "../Form/Form";
import TabPanel from "./Panel";
import Tab from "./Tab";
import Tabs from "./Tabs";

export default function FormTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ bgcolor: "#2e1534" }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab color="#e3e3e378" selectedColor="#e3e3e378" label="Buy" />
          <Tab color="#f49090c7" selectedColor="#f49090c7" label="Sell" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Form />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Form />
      </TabPanel>
    </Box>
  );
}
