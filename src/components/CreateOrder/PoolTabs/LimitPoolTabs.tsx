import Box from "@mui/material/Box";
import React from "react";
import Form from "../Form/LimitForm";
import TabPanel from "../../Common/TabPanel";
import WrapperTab from "../../Common/Tab";
import { useTheme } from "@mui/material";
import { usePoolStore } from "store";
import { Side } from "types";
import MuiTabs, { TabsTypeMap } from "@mui/material/Tabs";
import LimitForm from "../Form/LimitForm";
interface Props {}

const LimitPoolTabs: React.FC<Props> = () => {
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
        <WrapperTabs variant="fullWidth" value={side} onChange={handleChange}>
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

      <TabPanel value={side} index="buy">
        <LimitForm />
      </TabPanel>
      <TabPanel value={side} index="sell">
        <LimitForm />
      </TabPanel>
    </Box>
  );
};

export default LimitPoolTabs;

interface WrapperTabsProps {
  children?: React.ReactNode;
  value: Side;
  onChange: (event: React.SyntheticEvent, newValue: Side) => void;
  variant?: TabsTypeMap["props"]["variant"];
}

export function WrapperTabs(props: WrapperTabsProps) {
  return (
    <MuiTabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  );
}
