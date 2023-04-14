import Box from "@mui/material/Box";
import React from "react";
import TabPanel from "../../Common/TabPanel";
import WrapperTab from "../../Common/Tab";
import { useTheme } from "@mui/material";
import { usePoolStore } from "store";
import { Side } from "types";
import MuiTabs from "@mui/material/Tabs";
import MarketForm from "../Form/MarketForm";
interface Props {}

const MarketPoolTabs: React.FC<Props> = () => {
  const theme = useTheme();

  const [side, updateSide] = usePoolStore((store) => [
    store.side,
    store.updateSide,
  ]);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: Side
  ) => {
    updateSide(["buy", "sell"][newValue]);
  };

  return (
    <Box>
      <Box>
        <MuiTabs
          variant="fullWidth"
          value={side}
          onChange={handleChange}
          TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
          }}
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
        </MuiTabs>
      </Box>

      <TabPanel value={side} index="buy">
        <MarketForm />
      </TabPanel>
      <TabPanel value={side} index="sell">
        <MarketForm />
      </TabPanel>
    </Box>
  );
};

export default MarketPoolTabs;
