import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "store";
import Boost from "components/CreateOrder/Inputs/Boost";
import Price from "components/CreateOrder/Inputs/Price";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTokenBalance } from "hooks/account";
import { useAllowance, useCreateOrder } from "hooks/poolWrite";
import LimitAmount from "components/CreateOrder/Inputs/Amount";
import { LimitInputs } from "types";
import { limitSchema } from "data/forms";
import { convertBuyLimitArgs } from "components/CreateOrder/utils";
import { useCallback } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Total from "components/CreateOrder/Inputs/Total";
import Submit from "components/CreateOrder/Inputs/Submit";

interface Props {}

const LimitBuy: React.FC<Props> = () => {
  const { control, handleSubmit, setValue } = useForm<LimitInputs>({
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

  const {
    write,
    isLoading: createLoading,
    gasLoading,
  } = useCreateOrder(finalValues);

  const {
    write: approve,
    isLoading: approveLoading,
    isApproved,
  } = useAllowance({
    amount: formValues.amount,
    pool: buyPool,
    token: buyPool.underlying,
  });

  const handleFormSubmit = () => {
    if (!isApproved && approve) {
      approve();
      return;
    }
    write?.();
  };

  const groupButtonHandler = useCallback(
    (item: number) => {
      const balancePercent = (item / 100) * available;
      const amountPercent = balancePercent / Number(formValues.price || 0);
      setValue("amount", amountPercent.toString());
    },
    [setValue, available, formValues.price]
  );

  const groupButtonDisabled =
    Number(formValues.price || 0) === 0 || available === 0;

  const total = (
    Number(formValues.amount) * Number(formValues.price) || 0
  ).toFixed(buyPool.underlying.decimals);

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

        <Total total={total} label={pair?.accountingLabel || ""} />

        <Submit
          side={side}
          isLoading={createLoading || approveLoading}
          control={control}
          submitContent={
            !isApproved ? "Approve first" : `Buy ${pair?.underlyingLabel}`
          }
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

export default LimitBuy;
