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
import { useCallback } from "react";

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
  const available = useTokenBalance({
    tokenAddress: sellPool.underlying.address,
  });
  const availableLabel = `${available} ${pair.underlyingLabel}`;

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
        <Price control={control} endLabel={pair?.accountingLabel || ""} />

        <LimitAmount
          control={control}
          availableLabel={availableLabel}
          groupButtonHandler={groupButtonHandler}
          disabled={groupButtonDisabled}
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
