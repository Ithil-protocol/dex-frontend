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
  const [pool, pair, side, buyPool] = usePoolStore((state) => [
    state.pool,
    state.pair,
    state.side,
    state.buyPool,
  ]);

  const { data: tokenBalance } = useTokenBalance({
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

  console.log("market.sell.fulfillLoading:", fulfillLoading);
  console.log("market.sell.approveLoading:", approveLoading);

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
          price={0}
          control={control}
          pool={pool}
          setValue={setValue}
          available={tokenBalance?.formatted || "0.00"}
        />

        <Total control={control} label={pair?.accountingLabel || ""} />

        <Submit
          side={side}
          isLoading={isSubmitting || approveLoading || fulfillLoading}
          control={control}
          label={pair?.underlyingLabel || ""}
          write={write}
          approve={approve}
          isMarket={true}
        />
      </div>
    </form>
  );
};

export default MarketSell;