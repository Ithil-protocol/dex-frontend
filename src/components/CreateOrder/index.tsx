import { useState } from "react";
import WrapperTab from "components/Common/WrapperTab";
import { Box } from "@mui/material";
import { LimitMarket } from "types";
import Tabs from "@mui/material/Tabs";
import LimitPoolTabs from "./PoolTabs/LimitPoolTabs";
import MarketPoolTabs from "./PoolTabs/MarketPoolTabs";

const CreateOrder = () => {
  const [value, setValue] = useState<LimitMarket>("limit");

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: LimitMarket
  ) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={(theme) => ({
        borderRadius: "5px",
        backgroundColor: theme.palette.background.paper,
        padding: "10px 5px 5px 5px",
        position: "sticky",
        top: 15,
      })}
    >
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            children: <span className="Tabs-indicatorSpan" />,
          }}
        >
          <WrapperTab value="limit" label="Limit" />
          <WrapperTab value="market" label="Market" />
        </Tabs>
      </Box>

      <div role="tabpanel" hidden={value !== "limit"}>
        <LimitPoolTabs />
      </div>

      <div role="tabpanel" hidden={value !== "market"}>
        <MarketPoolTabs />
      </div>
    </Box>
  );
};

export default CreateOrder;
