import { useState } from "react";
import WrapperTab from "components/Common/Tab";
import { Box } from "@mui/material";
import PoolTabs from "./PoolTabs";
import WrapperBox from "components/Common/Box";
import { LimitMarket, Side } from "types";

const CreateOrder = () => {
  const [value, setValue] = useState<LimitMarket>("limit");

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: LimitMarket
  ) => {
    setValue(["limit", "market"][newValue]);
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
        <WrapperTabs onChange={handleChange}>
          <WrapperTab label="Limit" />
          <WrapperTab label="Market" />
        </WrapperTabs>
      </Box>
      <TabPanel value={value} index={"limit"}>
        <PoolTabs isLimit />
      </TabPanel>
      <TabPanel value={value} index={"market"}>
        <PoolTabs />
      </TabPanel>
    </WrapperBox>
  );
};

export default CreateOrder;

import MuiTabs, { TabsTypeMap } from "@mui/material/Tabs";

interface WrapperTabsProps {
  children?: React.ReactNode;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: LimitMarket
  ) => void;
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: LimitMarket;
  value: LimitMarket;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}
