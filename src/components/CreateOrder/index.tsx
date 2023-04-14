import { useState } from "react";
import WrapperTab from "components/Common/Tab";
import { Box } from "@mui/material";
import { LimitMarket } from "types";
import MuiTabs from "@mui/material/Tabs";
import LimitPoolTabs from "./PoolTabs/LimitPoolTabs";
import MarketPoolTabs from "./PoolTabs/MarketPoolTabs";

const CreateOrder = () => {
  const [value, setValue] = useState<LimitMarket>("limit");

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: LimitMarket
  ) => {
    setValue(["limit", "market"][newValue]);
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
        <MuiTabs
          onChange={handleChange}
          TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
          }}
        >
          <WrapperTab label="Limit" />
          <WrapperTab label="Market" />
        </MuiTabs>
      </Box>

      <div role="tabpanel" hidden={value !== "limit"}>
        {value === "limit" && <LimitPoolTabs />}
      </div>

      <div role="tabpanel" hidden={value !== "market"}>
        {value === "market" && <MarketPoolTabs />}
      </div>
    </Box>
  );
};

export default CreateOrder;
