import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "store";
import Submit from "./Submit";
import Total from "./Total";

import { useTokenBalance } from "hooks/account";
import { useAllowance, useFulfillOrder } from "hooks/poolWrite";
import MarketAmount from "./Amount";
import { MarketInputs } from "types";
import { marketSchema } from "data/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConvertBuyMarketArgs } from "components/CreateOrder/utils";
import { useCallback } from "react";
import { usePoolGetNextPriceLevel } from "hooks/contracts/pool";
import { zeroBigNumber } from "utility";
import { utils } from "ethers";

interface Props {}

const MarketBuy: React.FC<Props> = () => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<MarketInputs>({
    resolver: yupResolver(marketSchema),
  });
  const formValues = useWatch({ control });
  const [pair, side, sellPool] = usePoolStore((state) => [
    state.pair,
    state.side,
    state.sellPool,
  ]);

  const available = useTokenBalance({
    tokenAddress: sellPool.accounting.address,
  });
  const availableLabel = `${available} ${pair.accountingLabel}`;
  const { totalToPay, ...finalValues } = useConvertBuyMarketArgs({
    amount: formValues.amount,
    pool: sellPool,
  });

  const { write, isLoading: fulfillLoading } = useFulfillOrder(finalValues);
  const {
    write: approve,
    isLoading: approveLoading,
    isApproved,
  } = useAllowance({
    amount: formValues.amount,
    pool: sellPool,
    token: sellPool.accounting,
  });

  const handleFormSubmit = () => {
    if (approve) {
      approve();
      return;
    }
    write?.();
  };

  const { data: highestPrice } = usePoolGetNextPriceLevel({
    address: sellPool.address,
    args: [zeroBigNumber],
    watch: true,
  });

  const groupButtonHandler = useCallback(
    (item: number) => {
      const balancePrice = highestPrice
        ? 1 / Number(utils.formatUnits(highestPrice, 18))
        : 0;
      const balancePercent = (item / 100) * available;
      const amountPercent = balancePercent / balancePrice;
      setValue("amount", amountPercent.toString());
    },
    [setValue, available, highestPrice]
  );
  const groupButtonDisabled =
    available === 0 || Number(highestPrice || 0) === 0;

  const total = totalToPay.toFixed(sellPool.accounting.decimals);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: "5px",
        }}
      >
        <MarketAmount
          groupButtonHandler={groupButtonHandler}
          control={control}
          groupButtonDisabled={groupButtonDisabled}
          availableLabel={availableLabel}
        />

        <Total total={total} label={pair?.accountingLabel || ""} />

        <Submit
          side={side}
          isLoading={isSubmitting || approveLoading || fulfillLoading}
          control={control}
          label={pair?.underlyingLabel || ""}
          write={write}
          isApproved={isApproved}
          isMarket={true}
        />
      </div>
    </form>
  );
};

export default MarketBuy;
