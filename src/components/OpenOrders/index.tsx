import { Box } from "@mui/material";
import Orders from "./Orders";
import WrapperTab from "components/Common/Tab";
import React, { useEffect, useState } from "react";
import WrapperBox from "components/Common/Box";
import { useUserOrderCreatedEvents } from "hooks/events";
import { usePoolStore } from "store";
import { OpenOrder } from "types";
import { formatDateToFullDate } from "utility";
import { utils } from "ethers";

type OpenHistory = "history" | "open";
export const OpenOrders = () => {
  const [value, setValue] = React.useState<OpenHistory>("open");
  const [orders, setOrders] = useState<OpenOrder[]>([]);

  const { data } = useUserOrderCreatedEvents();
  const [pool] = usePoolStore((state) => [state.pool, state.updatePair]);

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
          <WrapperTabs onChange={handleChange}>
            <WrapperTab label="Open Orders" />
            <WrapperTab label="Orders History" />
          </WrapperTabs>
        </Box>

        <TabPanel value={value} index={"open"}>
          <Orders pool={pool} openOrdersData={orders} hasCancel />
        </TabPanel>
        <TabPanel value={value} index={"history"}>
          <Orders pool={pool} openOrdersData={orders} hasCancel={false} />
        </TabPanel>
      </WrapperBox>
    </WrapperBox>
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

import MuiTabs, { TabsTypeMap } from "@mui/material/Tabs";

interface WrapperTabsProps {
  children?: React.ReactNode;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: OpenHistory
  ) => void;
  variant?: TabsTypeMap["props"]["variant"];
}

export function WrapperTabs(props: WrapperTabsProps) {
  return (
    <MuiTabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: OpenHistory;
  value: OpenHistory;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}
