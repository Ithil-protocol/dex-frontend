import Box from "@mui/material/Box";
import React from "react";
import Form from "../Form";
import TabPanel from "../../common/TabPanel";
import WrapperTab from "../../common/Tab";
import WrapperTabs from "../../common/Tabs";
import { useTheme } from "@mui/material";
import { usePoolStore } from "store";
import { SideKey } from "types";

interface Props {
  isLimit?: boolean;
}

const PoolTabs: React.FC<Props> = ({ isLimit }) => {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  // const [sideKey, updateSide] = usePoolStore((store) => [
  //   store.sideKey,
  //   store.updateSide,
  // ]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    console.log("newValue", newValue);
    // updateSide(newValue);
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <WrapperTabs
          variant="fullWidth"
          value={value}
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

      <TabPanel value={value} index={0}>
        <Form isLimit={isLimit} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Form isLimit={isLimit} />
      </TabPanel>
    </Box>
  );
};

export default PoolTabs;
