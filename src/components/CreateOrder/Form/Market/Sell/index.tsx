import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "store";
import Submit from "./Submit";
import Total from "./Total";

import { useTokenBalance } from "hooks/account";
import { useAllowance, useFulfillOrder } from "hooks/poolWrite";
import MarketAmount from "./Amount";
import { MarketInputs } from "types";
import { marketSchema } from "data/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConvertSellMarketArgs } from "components/CreateOrder/utils";
import { useCallback } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {}

const MarketSell: React.FC<Props> = () => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<MarketInputs>({
    resolver: yupResolver(marketSchema),
  });
  const formValues = useWatch({ control });
  const [pair, side, buyPool] = usePoolStore((state) => [
    state.pair,
    state.side,
    state.buyPool,
  ]);

  const available = useTokenBalance({
    tokenAddress: buyPool.accounting.address,
  });
  const availableLabel = `${available} ${pair.underlyingLabel}`;

  const { totalToTake, ...finalValues } = useConvertSellMarketArgs({
    amount: formValues.amount,
    pool: buyPool,
  });

  const {
    write,
    isLoading: fulfillLoading,
    gasLoading,
  } = useFulfillOrder(finalValues);
  const {
    write: approve,
    isLoading: approveLoading,
    isApproved,
  } = useAllowance({
    amount: formValues.amount,
    pool: buyPool,
    token: buyPool.accounting,
  });

  const handleFormSubmit = () => {
    if (approve) {
      approve();
      return;
    }
    write?.();
  };

  const groupButtonHandler = useCallback(
    (item: number) => {
      const balancePercent = (item / 100) * available;
      setValue("amount", balancePercent.toString());
    },
    [setValue, available]
  );
  const groupButtonDisabled = available === 0;
  const total = totalToTake.toFixed(buyPool.underlying.decimals);

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
          availableLabel={availableLabel}
          control={control}
          groupButtonDisabled={groupButtonDisabled}
          groupButtonHandler={groupButtonHandler}
        />

        <Total total={total} label={pair.accountingLabel} />

        <Submit
          isApproved={isApproved}
          control={control}
          isLoading={isSubmitting || approveLoading || fulfillLoading}
          isMarket={true}
          label={pair.underlyingLabel}
          side={side}
          write={write}
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

export default MarketSell;
