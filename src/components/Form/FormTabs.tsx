import Box from "@mui/material/Box";
import * as React from "react";
import Form from "./Form";
import { StyledTab } from "./StyledTab";
import { StyledTabs } from "./StyledTabs";
import TabPanel from "./TabPanel";

export default function FormTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box id="tabs-root">
      <Box sx={{ bgcolor: "#2e1534" }}>
        <StyledTabs variant="fullWidth" value={value} onChange={handleChange}>
          <StyledTab color="#e3e3e378" selectedColor="#e3e3e378" label="Buy" />
          <StyledTab color="#f49090c7" selectedColor="#f49090c7" label="Sell" />
        </StyledTabs>
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
