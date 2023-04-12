import { Box } from "@mui/material";
import Orders from "./Orders";
import WrapperTabs from "components/Common/Tabs";
import TabPanel from "components/Common/TabPanel";
import WrapperTab from "components/Common/Tab";
import React from "react";
import WrapperBox from "components/Common/Box";
import { useUserOrderCreatedEvents } from "hooks/events";
import { utils } from "ethers";
import { usePoolStore } from "store";

export const OpenOrders = () => {
  const [value, setValue] = React.useState(0);
  const { data } = useUserOrderCreatedEvents();
  const [pool] = usePoolStore((state) => [state.pool, state.updatePool]);

  const makeOrders = () => {
    if (!data) return [];

    return data.map((order) => {
      const { underlyingAmount, price, staked } = order.args!;
      const convertedUnderlyingAmount = utils.formatUnits(underlyingAmount, 18);
      const convertedPrice = utils.formatUnits(price, 6);
      const convertedStaked = utils.formatUnits(staked, 18);
      const total = +convertedPrice * +convertedUnderlyingAmount;

      return {
        date: "02/08/2019",
        time: "17:30",
        amount: convertedUnderlyingAmount,
        price: convertedPrice,
        staked: convertedStaked,
        total: total.toString(),
        side: "buy",
      };
    });
  };

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
          <Orders pool={pool} openOrdersData={makeOrders()} hasCancel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Orders pool={pool} openOrdersData={makeOrders()} hasCancel={false} />
        </TabPanel>
      </WrapperBox>
    </WrapperBox>
  );
};
