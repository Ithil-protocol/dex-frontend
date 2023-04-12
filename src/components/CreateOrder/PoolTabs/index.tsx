import Box from "@mui/material/Box";
import React from "react";
import Form from "../Form";
import TabPanel from "../../common/TabPanel";
import WrapperTab from "../../common/Tab";
import WrapperTabs from "../../common/Tabs";
import { useTheme } from "@mui/material";
import { usePoolStore } from "store";
import { SideKey } from "types";

export default function PoolTabs() {
  const theme = useTheme();

  // const [value, setValue] = React.useState(0);

  const [sideKey, updateSide] = usePoolStore((store) => [
    store.sideKey,
    store.updateSide,
  ]);

  const handleChange = (_event: React.SyntheticEvent, newValue: SideKey) => {
    console.log("newValue", newValue);
    updateSide(newValue);
  };

  return (
    <Box>
      <Box>
        <WrapperTabs
          variant="fullWidth"
          value={sideKey}
          onChange={handleChange}
        >
          <WrapperTab
            label="Buy"
            selectedBgColor={theme.palette.success.main}
          />
          <WrapperTab
            color={theme.palette.error.main}
            selectedBgColor={theme.palette.error.main}
            label="Sell"
          />
        </WrapperTabs>
      </Box>

      <TabPanel value={sideKey} index="sell">
        <Form />
      </TabPanel>
      <TabPanel value={sideKey} index="buy">
        <Form />
      </TabPanel>
    </Box>
  );
}
