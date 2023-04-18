import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "store";
import Boost from "./Boost";
import Price from "./Price";
import Submit from "../Common/Submit";
import Total from "../Common/Total";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTokenBalance } from "hooks/account";
import { useAllowance, useCreateOrder } from "hooks/poolWrite";
import LimitAmount from "./Amount";
import { LimitInputs } from "types";
import { limitSchema } from "data/forms";

interface Props {}

const LimitForm: React.FC<Props> = () => {
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
  const [pool, pair] = usePoolStore((state) => [state.pool, state.pair]);

  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });

  const { write } = useCreateOrder({
    amount: 1 || formValues["amount"],
    price: 1 || formValues["price"],
    boost: 1 || formValues["boost"],
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
          isSubmitting={isSubmitting}
          control={control}
          label={pair?.underlyingLabel || ""}
          write={write}
          approve={approve}
        />
      </div>
    </form>
  );
};

export default LimitForm;
