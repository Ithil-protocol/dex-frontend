import { Box } from "@mui/material";
import WrapperTab from "@/components/Common/WrapperTab";
import { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Open from "./Open";
import History from "./History";

type OpenHistory = "history" | "open";

export const OpenOrders = () => {
  const [value, setValue] = useState<OpenHistory>("open");

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: OpenHistory
  ) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: "5px",
        gap: "5px",
        padding: "10px 5px 15px 5px",
      })}
    >
      <div>
        <Tabs value={value} onChange={handleChange}>
          <WrapperTab value="open" label="Open Orders" />
          <WrapperTab value="history" label="Orders History" />
        </Tabs>
      </div>

      <div role="tabpanel" hidden={value !== "open"}>
        <Open />
      </div>

      <div role="tabpanel" hidden={value !== "history"}>
        <History />
      </div>
    </Box>
  );
};
