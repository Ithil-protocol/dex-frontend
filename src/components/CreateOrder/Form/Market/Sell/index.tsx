import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "@/store";
import Submit from "@/components/CreateOrder/Inputs/Submit";
import Total from "@/components/CreateOrder/Inputs/Total";

import { useTokenBalance } from "@/hooks/account";
import { useAllowance, useFulfillOrder } from "@/hooks/poolWrite";
import MarketAmount from "@/components/CreateOrder/Inputs/Amount";
import { MarketInputs } from "@/types";
import { marketSchema } from "@/data/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConvertSellMarketArgs } from "@/components/CreateOrder/utils";
import { useCallback, useState } from "react";
import Info from "@/components/Common/Info";
import { fixPrecision } from "@/utility/converters";
import MarketSellConfirmation from "@/components/CreateOrder/Confirmation/MarketSellConfirmation";

interface Props {}

const MarketSell: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);

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
  const availableLabel = `${fixPrecision(
    available,
    buyPool.accounting.displayPrecision
  )} ${pair.underlyingLabel}`;

  const isInsufficientFunds = available < Number(formValues.amount || 0);

  const { totalToTake, isAmountOut, ...finalValues } = useConvertSellMarketArgs(
    {
      amount: formValues.amount,
      pool: buyPool,
    }
  );

  const total = fixPrecision(totalToTake, buyPool.underlying.displayPrecision);

  const {
    write,
    isLoading: fulfillLoading,
    gasLoading,
    waitedData,
    waitedError,
    waitedSuccess,
    resetFulfill,
  } = useFulfillOrder(finalValues);
  const {
    write: approve,
    isLoading: approveLoading,
    isApproved,
    currentAllowance,
  } = useAllowance({
    amount: formValues.amount,
    pool: buyPool,
    token: buyPool.accounting,
  });

  const handleFormSubmit = () => {
    if (!isApproved && approve) {
      approve();
      return;
    }
    setOpen(true);
  };

  const groupButtonHandler = useCallback(
    (item: number) => {
      const balancePercent = (item / 100) * available;
      setValue("amount", balancePercent.toString());
    },
    [setValue, available]
  );
  const groupButtonDisabled = available === 0;

  const modalCloseHandler = () => {
    setOpen(false);
    resetFulfill();
  };

  return (
    <>
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
          {/* <Info
            isRendered={isAmountOut}
            text="Slippage is too high!"
          /> */}
          <Info
            isRendered={!isApproved}
            color="warning"
            text={`Current Allowance: ${currentAllowance} ${pair.underlyingLabel}`}
          />
          <Info
            isRendered={isInsufficientFunds}
            color="error"
            text="insufficient funds..."
          />

          <Submit
            submitContent={`Sell ${pair.underlyingLabel}`}
            isApproved={isApproved}
            control={control}
            isLoading={isSubmitting || approveLoading || fulfillLoading}
            isMarket={true}
            side={side}
            write={write}
          />

          <Info hasLoading isRendered={gasLoading} text="Estimating Gas..." />
        </div>
      </form>
      <MarketSellConfirmation
        fulfillLoading={fulfillLoading}
        finalValues={{ ...finalValues, totalToTake }}
        gasLoading={gasLoading}
        open={open}
        waitedData={waitedData}
        waitedError={waitedError}
        waitedSuccess={waitedSuccess}
        write={write}
        modalCloseHandler={modalCloseHandler}
      />
    </>
  );
};

export default MarketSell;
