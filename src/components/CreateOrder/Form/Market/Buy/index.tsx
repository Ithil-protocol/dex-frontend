import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "store";
import Submit from "./Submit";
import Total from "./Total";

import { useTokenBalance } from "hooks/account";
import {
  useAllowance,
  useFulfillOrder,
  useNewFulfillOrder,
} from "hooks/poolWrite";
import MarketAmount from "./Amount";
import { MarketInputs } from "types";
import { marketSchema } from "data/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConvertBuyMarketArgs } from "components/CreateOrder/utils";

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
  const [pool, pair, side, sellPool] = usePoolStore((state) => [
    state.pool,
    state.pair,
    state.side,
    state.sellPool,
  ]);

  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });

  const finalValues = useConvertBuyMarketArgs({
    amount: formValues.amount,
    pool: sellPool,
  });

  const { write } = useNewFulfillOrder(finalValues);
  const { write: approve } = useAllowance({
    amount: formValues.amount,
  });

  const handleFormSubmit = () => {
    if (approve) {
      approve();
      return;
    }
    write?.();
  };

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
          isSubmitting={isSubmitting}
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

export default MarketBuy;
