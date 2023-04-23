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
import { useConvertSellMarketArgs } from "components/CreateOrder/utils";
import { useCallback } from "react";

interface Props {}

const MarketSell: React.FC<Props> = () => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<MarketInputs>({
    resolver: yupResolver(marketSchema),
  });
  const formValues = useWatch({ control });
  const [pair, side, buyPool] = usePoolStore((state) => [
    state.pair,
    state.side,
    state.buyPool,
  ]);

  const available = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });

  const finalValues = useConvertSellMarketArgs({
    amount: formValues.amount,
    pool: buyPool,
  });

  const { write, isLoading: fulfillLoading } = useFulfillOrder(finalValues);
  const { write: approve, isLoading: approveLoading } = useAllowance({
    amount: formValues.amount,
    pool: buyPool,
    token: buyPool.accounting,
  });

  const handleFormSubmit = () => {
    if (approve) {
      approve();
      return;
    }
    write?.();
  };

  const groupButtonHandler = useCallback(
    (item: number) => {
      const balancePercent = (item / 100) * available;
      setValue("amount", balancePercent.toString());
    },
    [setValue, available]
  );
  const groupButtonDisabled = available === 0;

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
          available={available || "0.00"}
          control={control}
          groupButtonDisabled={groupButtonDisabled}
          groupButtonHandler={groupButtonHandler}
        />

        <Total control={control} label={pair?.accountingLabel || ""} />

        <Submit
          approve={approve}
          control={control}
          isLoading={isSubmitting || approveLoading || fulfillLoading}
          isMarket={true}
          label={pair?.underlyingLabel || ""}
          side={side}
          write={write}
        />
      </div>
    </form>
  );
};

export default MarketSell;
