import Box from "@mui/material/Box";
import React from "react";
import WrapperTab from "../../Common/WrapperTab";
import { useTheme } from "@mui/material";
import { usePoolStore } from "store";
import { Side } from "types";
import Tabs from "@mui/material/Tabs";
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
        <Tabs
          variant="fullWidth"
          value={side}
          onChange={handleChange}
          TabIndicatorProps={{
            children: <span className="Tabs-indicatorSpan" />,
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
        </Tabs>
      </Box>

      <div role="tabpanel" hidden={side !== "buy"}>
        {side === "buy" && <LimitForm />}
      </div>

      <div role="tabpanel" hidden={side !== "sell"}>
        {side === "sell" && <LimitForm />}
      </div>
    </Box>
  );
};

export default LimitPoolTabs;
