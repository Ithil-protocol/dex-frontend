import { Box } from "@mui/material";
import Orders from "./Orders";
import WrapperTab from "components/Common/WrapperTab";
import React, { useEffect, useState } from "react";
import { useUserOrderCreatedEvents } from "hooks/events";
import { usePoolStore } from "store";
import { OpenOrder, Pool } from "types";
import { formatDateToFullDate } from "utility";
import { utils } from "ethers";
import Tabs from "@mui/material/Tabs";

type OpenHistory = "history" | "open";

export const OpenOrders = () => {
  const [value, setValue] = React.useState<OpenHistory>("open");
  const [orders, setOrders] = useState<OpenOrder[]>([]);

  const { data } = useUserOrderCreatedEvents();
  const [pool, defaultPool] = usePoolStore((state) => [
    state.pool,
    state.default,
  ]);

  useEffect(() => {
    const fn = async () => {
      if (!data) return [];
      const orders = await convertOrders(data, defaultPool);
      setOrders(orders);
    };

    fn();
  }, [data]);

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
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: "5px",
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
            <WrapperTab value="open" label="Open Orders" />
            <WrapperTab value="history" label="Orders History" />
          </Tabs>
        </Box>

        <div role="tabpanel" hidden={value !== "open"}>
          <Orders pool={pool} openOrdersData={orders} hasCancel />
        </div>

        <div role="tabpanel" hidden={value !== "history"}>
          <Orders pool={pool} openOrdersData={orders} hasCancel={false} />
        </div>
      </Box>
    </Box>
  );
};

export const convertOrders = async (data: any[], pool: Pool) => {
  const orders: OpenOrder[] = [];

  const blocks: any[] = [];

  for (const order of data) {
    const block = order.getBlock();
    blocks.push(block);
  }

  const resolvedBlocks = await Promise.all(blocks);

  for (const [i, order] of data.entries()) {
    const block = resolvedBlocks[i];
    const fullDate = formatDateToFullDate(block.timestamp * 1000);

    const { underlyingAmount, price, staked, index } = order.args!;
    const convertedUnderlyingAmount = utils.formatUnits(
      underlyingAmount,
      pool.underlying.decimals
    );
    const convertedPrice = utils.formatUnits(price, pool.accounting.decimals);
    const convertedStaked = utils.formatUnits(staked, pool.underlying.decimals);
    const total = +convertedPrice * +convertedUnderlyingAmount;

    orders.push({
      index,
      rawPrice: price,
      transactionHash: order.transactionHash,
      address: order.address,
      amount: convertedUnderlyingAmount,
      fullDate,
      price: convertedPrice,
      side: "buy",
      staked: convertedStaked,
      total: total.toString(),
    });
  }

  return orders;
};
