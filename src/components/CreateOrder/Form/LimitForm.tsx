import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "store";
import Boost from "./Boost";
import Price from "./Price";
import Submit from "./Submit";
import Total from "./Total";

import { useTokenBalance } from "hooks/account";
import { useAllowance, useCreateOrder } from "hooks/poolWrite";
import Amount from "./Amount";

interface Props {}

const LimitForm: React.FC<Props> = () => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm();
  const formValues = useWatch({ control });
  const pool = usePoolStore((state) => state.pool);

  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });

  const { write } = useCreateOrder({
    amount: formValues["amount"],
    price: formValues["price"],
    boost: formValues["boost"],
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
        <Price control={control} endLabel={pool?.accounting.label || ""} />

        <Amount
          control={control}
          pool={pool}
          setValue={setValue}
          available={tokenBalance?.formatted || "0.00"}
        />

        <Boost control={control} />

        <Total control={control} label={pool?.accounting.label || ""} />

        <Submit
          isSubmitting={isSubmitting}
          control={control}
          label={pool?.underlying.label || ""}
          write={write}
          approve={approve}
        />
      </div>
    </form>
  );
};

export default LimitForm;