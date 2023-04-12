import { useState } from "react";
import WrapperTabs from "components/common/Tabs";
import WrapperTab from "components/common/Tab";
import { Box } from "@mui/material";
import TabPanel from "components/common/TabPanel";
import PoolTabs from "./PoolTabs";
import WrapperBox from "components/common/Box";

const CreateOrder = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <WrapperBox
      overrideStyles={(theme) => ({
        bgcolor: theme.palette.background.paper,
        padding: "10px 5px 5px 5px",
        position: "sticky",
        top: 15,
      })}
    >
      <Box>
        <WrapperTabs value={value} onChange={handleChange}>
          <WrapperTab label="Limit" />
          <WrapperTab label="Market" />
        </WrapperTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PoolTabs isLimit />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PoolTabs />
      </TabPanel>
    </WrapperBox>
  );
};

export default CreateOrder;
