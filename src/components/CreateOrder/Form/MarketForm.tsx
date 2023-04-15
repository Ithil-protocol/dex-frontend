import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "store";
import Submit from "./Submit";
import Total from "./Total";

import { useTokenBalance } from "hooks/account";
import { useAllowance, useCreateOrder, useFulfillOrder } from "hooks/poolWrite";
import Amount from "./Amount";

interface Props {}

const MarketForm: React.FC<Props> = () => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm();
  const formValues = useWatch({ control });
  const [pool, pair] = usePoolStore((state) => [state.pool, state.pair]);

  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });

  const { write } = useFulfillOrder({
    amount: formValues["amount"],
  });
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
        <Amount
          control={control}
          pool={pool}
          setValue={setValue}
          available={tokenBalance?.formatted || "0.00"}
        />

        <Total control={control} label={pair?.accountingLabel || ""} />

        <Submit
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

export default MarketForm;
