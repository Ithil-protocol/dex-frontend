import Box from "@mui/material/Box";
import React from "react";
import Form from "../Form/Form";
import TabPanel from "../../common/Panel";
import Tab from "../../common/Tab";
import Tabs from "../../common/Tabs";
import theme from "styles/theme";

export default function FormTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={(theme) => ({ bgcolor: theme.palette.background.paper })}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab
            selectedColor={theme.palette.text.primary}
            label="Buy"
            selectedBgColor={theme.palette.secondary.main}
          />
          <Tab
            color={theme.palette.error.main}
            selectedColor={theme.palette.text.primary}
            selectedBgColor={theme.palette.error.main}
            label="Sell"
          />
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
