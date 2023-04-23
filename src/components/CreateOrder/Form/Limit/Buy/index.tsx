import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "store";
import Boost from "./Boost";
import Price from "./Price";
import Submit from "./Submit";
import Total from "./Total";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTokenBalance } from "hooks/account";
import { useAllowance, useCreateOrder } from "hooks/poolWrite";
import LimitAmount from "./Amount";
import { LimitInputs } from "types";
import { limitSchema } from "data/forms";
import { convertBuyLimitArgs } from "components/CreateOrder/utils";

interface Props {}

const LimitBuy: React.FC<Props> = () => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<LimitInputs>({
    resolver: yupResolver(limitSchema),
    mode: "onChange",
  });

  const formValues = useWatch({ control });
  const [pool, pair, side, buyPool] = usePoolStore((state) => [
    state.pool,
    state.pair,
    state.side,
    state.buyPool,
  ]);

  const finalValues = convertBuyLimitArgs({
    amount: formValues.amount,
    price: formValues.price,
    boost: formValues.boost,
    pool: buyPool,
  });

  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });

  const { write, isLoading: createLoading } = useCreateOrder(finalValues);

  const { write: approve, isLoading: approveLoading } = useAllowance({
    amount: formValues.amount,
    pool: buyPool,
    token: buyPool.underlying,
  });

  console.log("limit.buy.createLoading:", createLoading);
  console.log("limit.buy.approveLoading:", approveLoading);

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
        <Price control={control} endLabel={pair?.accountingLabel || ""} />

        <LimitAmount
          control={control}
          pool={pool}
          setValue={setValue}
          available={tokenBalance?.formatted || "0.00"}
        />

        <Boost control={control} />

        <Total control={control} label={pair?.accountingLabel || ""} />

        <Submit
          side={side}
          isLoading={isSubmitting || createLoading || approveLoading}
          control={control}
          label={pair?.underlyingLabel || ""}
          write={write}
          approve={approve}
        />
      </div>
    </form>
  );
};

export default LimitBuy;