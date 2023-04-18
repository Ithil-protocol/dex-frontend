import { Box } from "@mui/material";
import Orders from "./Orders";
import WrapperTab from "components/Common/WrapperTab";
import React from "react";
import { useUserOrderCreatedEvents } from "hooks/events";

import Tabs from "@mui/material/Tabs";

type OpenHistory = "history" | "open";

export const OpenOrders = () => {
  const [value, setValue] = React.useState<OpenHistory>("open");

  const { data } = useUserOrderCreatedEvents();

  const orders = (data || []).reverse();

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
        padding: "10px 5px 5px 5px",
      })}
    >
      <div>
        <Tabs value={value} onChange={handleChange}>
          <WrapperTab value="open" label="Open Orders" />
          <WrapperTab value="history" label="Orders History" />
        </Tabs>
      </div>

      <div role="tabpanel" hidden={value !== "open"}>
        <Orders orders={orders} />
      </div>

      <div role="tabpanel" hidden={value !== "history"}>
        <Orders orders={orders} />
      </div>
    </Box>
  );
};
