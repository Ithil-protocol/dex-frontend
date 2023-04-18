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
        backgroundColor: theme.palette.background.paper,
        borderRadius: "5px",
        height: 600,
        padding: "10px 5px 5px 5px",
        position: "sticky",
        top: 15,
      })}
    >
      <Tabs value={value} onChange={handleChange}>
        <WrapperTab value="limit" label="Limit" />
        <WrapperTab value="market" label="Market" />
      </Tabs>

      <div
        style={{
          padding: "0px 15px",
        }}
      >
        <div role="tabpanel" hidden={value !== "limit"}>
          <LimitPoolTabs />
        </div>

        <div role="tabpanel" hidden={value !== "market"}>
          <MarketPoolTabs />
        </div>
      </div>
    </Box>
  );
};

export default CreateOrder;
