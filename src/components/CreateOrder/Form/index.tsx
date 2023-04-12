import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "store";
import Boost from "./Boost";
import Price from "./Price";
import Submit from "./Submit";
import Total from "./Total";

import { useTokenBalance } from "hooks/account";
import { useCreateOrder } from "hooks/poolWrite";
import Amount from "./Amount";
import MarginTop from "components/common/Margin";

interface Props {
  isLimit?: boolean;
}

const Form: React.FC<Props> = ({ isLimit }) => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm();
  const formValues = useWatch({ control });
  const [pool] = usePoolStore((state) => [state.pool, state.updatePool]);

  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });

  const { write } = useCreateOrder({
    amount: formValues["amount"],
    price: formValues["price"],
    boost: formValues["boost"],
  });

  const handleFormSubmit = () => {
    write && write();
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
        {isLimit && (
          <Price control={control} endLabel={pool?.accountingLabel || ""} />
        )}

        <Amount
          control={control}
          pool={pool}
          setValue={setValue}
          available={tokenBalance?.formatted || "0.00"}
        />

        <MarginTop />

        {isLimit && <Boost control={control} />}

        <Total control={control} label={pool?.accountingLabel || ""} />

        <Submit
          isSubmitting={isSubmitting}
          control={control}
          label={pool?.underlyingLabel || ""}
          write={write}
        />
      </div>
    </form>
  );
};

export default Form;
