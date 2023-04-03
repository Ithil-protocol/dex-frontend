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
      <Box sx={{ bgcolor: "#233347" }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab color="#e3e3e378" selectedColor="#e3e3e378" label="Buy" />
          <Tab color="#986161" selectedColor="#986161" label="Sell" />
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
