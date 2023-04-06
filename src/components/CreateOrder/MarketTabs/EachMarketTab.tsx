import Box from "@mui/material/Box";
import React from "react";
import EachPoolTab from "../PoolTabs/EachPoolTab";
import TabPanel from "../../common/TabPanel";
import WrapperTab from "../../common/Tab";
import WrapperTabs from "../../common/Tabs";

const EachMarketTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        borderRadius: "5px",
        padding: "10px 5px 5px 5px",
      })}
    >
      <Box>
        <WrapperTabs value={value} onChange={handleChange}>
          <WrapperTab label="Limit" />
          <WrapperTab label="Market" />
        </WrapperTabs>
      </Box>

      <TabPanel value={value} index={0}>
        <EachPoolTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EachPoolTab />
      </TabPanel>
    </Box>
  );
};

export default EachMarketTab;
