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
import { convertSellLimitArgs } from "components/CreateOrder/utils";
import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {}

const LimitSell: React.FC<Props> = () => {
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
  const [pool, pair, side, sellPool] = usePoolStore((state) => [
    state.pool,
    state.pair,
    state.side,
    state.sellPool,
  ]);

  const finalValues = convertSellLimitArgs({
    amount: formValues.amount,
    price: formValues.price,
    boost: formValues.boost,
    pool: sellPool,
  });
  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });

  const {
    write,
    isLoading: createLoading,
    gasLoading,
  } = useCreateOrder(finalValues);

  const {
    write: approve,
    isApproved,
    isLoading: approveLoading,
  } = useAllowance({
    amount: formValues.amount,
    pool: sellPool,
    token: sellPool.underlying,
  });

  const handleFormSubmit = () => {
    if (approve) {
      approve();
      return;
    }
    write?.();
  };

  console.log("limit.sell.createLoading:", createLoading);
  console.log("limit.sell.approveLoading:", approveLoading);

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
          isApproved={isApproved}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: 20 }}>
          {gasLoading && (
            <>
              <CircularProgress size={12} color="info" />
              <Typography fontSize={12}>Estimating Gas...</Typography>
            </>
          )}
        </Box>
      </div>
    </form>
  );
};

export default LimitSell;