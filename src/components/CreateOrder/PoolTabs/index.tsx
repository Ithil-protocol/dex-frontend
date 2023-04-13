import Box from "@mui/material/Box";
import React from "react";
import Form from "../Form";
import TabPanel from "../../Common/TabPanel";
import WrapperTab from "../../Common/Tab";
import WrapperTabs from "../../Common/Tabs";
import { useTheme } from "@mui/material";
import { usePoolStore } from "store";
import { Side } from "types";

interface Props {
  isLimit?: boolean;
}

const PoolTabs: React.FC<Props> = ({ isLimit }) => {
  const theme = useTheme();

  // const [value, setValue] = React.useState(0);

  const [side, updateSide] = usePoolStore((store) => [
    store.side,
    store.updateSide,
  ]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    console.log("newValue", newValue);
    updateSide(newValue === 0 ? "sell" : "buy");
  };

  const value = side === "buy" ? 1 : 0;

  return (
    <Box>
      <Box>
        <WrapperTabs variant="fullWidth" value={value} onChange={handleChange}>
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
