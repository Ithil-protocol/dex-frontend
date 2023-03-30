import Box from "@mui/material/Box";
import * as React from "react";
import FormTabs from "./FormTabs";
import { StyledTab } from "./StyledTab";
import { StyledTabs } from "./StyledTabs";
import TabPanel from "./TabPanel";

const CreateOrder = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box id="tabs-root">
      <Box sx={{ bgcolor: "#2e1534" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Limit" />
          <StyledTab label="Market" />
        </StyledTabs>
      </Box>

      <Box sx={{ backgroundColor: "#2e1534", padding: "10px 5px 5px 5px" }}>
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

export default CreateOrder;
