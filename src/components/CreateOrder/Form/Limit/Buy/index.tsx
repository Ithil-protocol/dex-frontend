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
import { useCallback } from "react";

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
  const [pair, side, buyPool] = usePoolStore((state) => [
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

  const available = useTokenBalance({
    tokenAddress: buyPool.underlying.address,
  });
  const availableLabel = `${available} ${pair.accountingLabel}`;

  const { write, isLoading: createLoading } = useCreateOrder(finalValues);

  const { write: approve, isLoading: approveLoading } = useAllowance({
    amount: formValues.amount,
    pool: buyPool,
    token: buyPool.underlying,
  });

  const handleFormSubmit = () => {
    if (approve) {
      approve();
      return;
    }
    write?.();
  };

  const groupButtonDisabled =
    Number(formValues.price || 0) === 0 || available === 0;

  const groupButtonHandler = useCallback(
    (item: number) => {
      const balancePercent = (item / 100) * available;
      const amountPercent = balancePercent / Number(formValues.price || 0);
      setValue("amount", amountPercent.toString());
    },
    [setValue, available, formValues.price]
  );

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
          groupButtonDisabled={groupButtonDisabled}
          control={control}
          availableLabel={availableLabel}
          groupButtonHandler={groupButtonHandler}
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
