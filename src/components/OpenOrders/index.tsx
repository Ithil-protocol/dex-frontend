import { Box } from "@mui/material";
import Orders from "./Orders";
import WrapperTabs from "components/Common/Tabs";
import TabPanel from "components/Common/TabPanel";
import WrapperTab from "components/Common/Tab";
import React, { useEffect, useState } from "react";
import WrapperBox from "components/Common/Box";
import { useUserOrderCreatedEvents } from "hooks/events";
import { utils } from "ethers";
import { usePoolStore } from "store";
import { OpenOrder } from "types";
import { formatDateToFullDate } from "utility";

export const OpenOrders = () => {
  const [value, setValue] = React.useState(0);
  const [orders, setOrders] = useState<OpenOrder[]>([]);

  const { data } = useUserOrderCreatedEvents();
  const [pool] = usePoolStore((state) => [state.pool, state.updatePool]);

  useEffect(() => {
    const fn = async () => {
      if (!data) return [];
      const orders = await makeOrders(data);
      setOrders(orders);
    };

    fn();
  }, [data]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <WrapperBox
      overrideStyles={(theme) => ({
        bgcolor: theme.palette.background.paper,
        gap: "5px",
        padding: "10px 5px 5px 5px",
      })}
    >
      <WrapperBox
        overrideStyles={(theme) => ({
          bgcolor: theme.palette.background.paper,
        })}
      >
        <Box>
          <WrapperTabs value={value} onChange={handleChange}>
            <WrapperTab label="Open Orders" />
            <WrapperTab label="Orders History" />
          </WrapperTabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Orders pool={pool} openOrdersData={orders} hasCancel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Orders pool={pool} openOrdersData={orders} hasCancel={false} />
        </TabPanel>
      </WrapperBox>
    </WrapperBox>
  );
};

const makeOrders = async (data: any[]) => {
  const orders: OpenOrder[] = [];

  for await (const order of data) {
    console.log(order);

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
      blockNumber: order.blockNumber,
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
