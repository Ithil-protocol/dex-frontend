import { Box } from "@mui/material";
import Orders from "./Orders";
import WrapperTab from "components/Common/Tab";
import React, { useEffect, useState } from "react";
import { useUserOrderCreatedEvents } from "hooks/events";
import { usePoolStore } from "store";
import { OpenOrder } from "types";
import { formatDateToFullDate } from "utility";
import { utils } from "ethers";
import MuiTabs from "@mui/material/Tabs";

type OpenHistory = "history" | "open";
export const OpenOrders = () => {
  const [value, setValue] = React.useState<OpenHistory>("open");
  const [orders, setOrders] = useState<OpenOrder[]>([]);

  const { data } = useUserOrderCreatedEvents();
  const [pool] = usePoolStore((state) => [state.pool]);
  useEffect(() => {
    const fn = async () => {
      if (!data) return [];
      const orders = await convertOrders(data);
      setOrders(orders);
    };

    fn();
  }, [data]);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: OpenHistory
  ) => {
    setValue(["open", "history"][newValue]);
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
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: "5px",
        })}
      >
        <Box>
          <MuiTabs
            onChange={handleChange}
            TabIndicatorProps={{
              children: <span className="MuiTabs-indicatorSpan" />,
            }}
          >
            <WrapperTab label="Open Orders" />
            <WrapperTab label="Orders History" />
          </MuiTabs>
        </Box>

        <div role="tabpanel" hidden={value !== "open"}>
          {value === "open" && (
            <Orders pool={pool} openOrdersData={orders} hasCancel />
          )}
        </div>

        <div role="tabpanel" hidden={value !== "history"}>
          {value === "history" && (
            <Orders pool={pool} openOrdersData={orders} hasCancel={false} />
          )}
        </div>
      </Box>
    </Box>
  );
};

export const convertOrders = async (data: any[]) => {
  const orders: OpenOrder[] = [];

  for await (const order of data) {
    const block = await order.getBlock();
    const fullDate = formatDateToFullDate(block.timestamp * 1000);

    const { underlyingAmount, price, staked } = order.args!;
    const convertedUnderlyingAmount = utils.formatUnits(underlyingAmount, 6);
    const convertedPrice = utils.formatUnits(price, 18);
    const convertedStaked = utils.formatUnits(staked, 18);
    const total = +convertedPrice * +convertedUnderlyingAmount;

    orders.push({
      address: order.address,
      amount: convertedUnderlyingAmount,
      fullDate,
      price: convertedPrice,
      side: "buy",
      staked: convertedStaked,
      status: "pending",
      total: total.toString(),
    });
  }

  return orders;
};
