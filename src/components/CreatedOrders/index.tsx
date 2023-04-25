import { Box } from "@mui/material";
import WrapperTab from "components/Common/WrapperTab";
import { useState } from "react";
import {
  useUserOrderCancelledEvents,
  useUserOrderCreatedEvents,
} from "hooks/events";

import Tabs from "@mui/material/Tabs";
import OrderHistoryTable from "./History/Table";
import OpenOrdersTable from "./Open/Table";

type OpenHistory = "history" | "open";

export const CreatedOrders = () => {
  const [value, setValue] = useState<OpenHistory>("open");

  const { data: createdOrders } = useUserOrderCreatedEvents();

  const { data: canceledOrders } = useUserOrderCancelledEvents();

  console.log("canceled:::", canceledOrders);
  console.log("created:::", createdOrders);

  const reversedCreatedOrders = [...(createdOrders || [])].reverse();
  const fixedCanceledOrders = canceledOrders || [];

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
        {/* <OpenOrdersTable
          createdOrders={reversedCreatedOrders}
          canceledOrders={fixedCanceledOrders}
        /> */}
      </div>

      <div role="tabpanel" hidden={value !== "history"}>
        <OrderHistoryTable
          createdOrders={reversedCreatedOrders}
          canceledOrders={fixedCanceledOrders}
        />
      </div>
    </Box>
  );
};
