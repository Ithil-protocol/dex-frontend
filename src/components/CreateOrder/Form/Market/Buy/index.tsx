import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "@/store";

import { useTokenBalance } from "@/hooks/account";
import { useAllowance, useFulfillOrder } from "@/hooks/poolWrite";
import MarketAmount from "@/components/CreateOrder/Inputs/Amount";
import { MarketInputs } from "@/types";
import { marketSchema } from "@/data/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConvertBuyMarketArgs } from "@/components/CreateOrder/utils";
import { useCallback, useState } from "react";
import { usePoolGetNextPriceLevel } from "@/hooks/contracts/pool";
import { zeroBigNumber } from "@/utility";
import { utils } from "ethers";
import Total from "@/components/CreateOrder/Inputs/Total";
import Submit from "@/components/CreateOrder/Inputs/Submit";
import Info from "@/components/Common/Info";
import { fixPrecision } from "@/utility/converters";
import MarketBuyConfirmation from "@/components/CreateOrder/Confirmation/MarketBuyConfirmation";

interface Props {}

const MarketBuy: React.FC<Props> = () => {
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
  const [pair, side, sellPool] = usePoolStore((state) => [
    state.pair,
    state.side,
    state.sellPool,
  ]);

  const available = useTokenBalance({
    tokenAddress: sellPool.accounting.address,
  });
  const availableLabel = `${fixPrecision(
    available,
    sellPool.accounting.displayPrecision
  )} ${pair.accountingLabel}`;
  const { totalToPay, isAmountOut, ...finalValues } = useConvertBuyMarketArgs({
    amount: formValues.amount,
    pool: sellPool,
  });

  const {
    write,
    isLoading: fulfillLoading,
    gasLoading,
    waitedData,
    waitedError,
    waitedSuccess,
  } = useFulfillOrder(finalValues);

  const { data: highestPrice } = usePoolGetNextPriceLevel({
    address: sellPool.address,
    args: [zeroBigNumber],
    watch: true,
  });

  const groupButtonHandler = useCallback(
    (item: number) => {
      const balancePrice = highestPrice
        ? 1 / Number(utils.formatUnits(highestPrice, 18))
        : 0;
      const balancePercent = (item / 100) * available;
      const amountPercent = balancePercent / balancePrice;
      setValue("amount", amountPercent.toString());
    },
    [setValue, available, highestPrice]
  );
  const groupButtonDisabled =
    available === 0 || Number(highestPrice || 0) === 0;

  const total = totalToPay.toFixed(sellPool.accounting.decimals);

  const {
    write: approve,
    isLoading: approveLoading,
    isApproved,
    currentAllowance,
  } = useAllowance({
    amount: total,
    pool: sellPool,
    token: sellPool.accounting,
  });

  const handleFormSubmit = () => {
    if (!isApproved && approve) {
      approve();
      return;
    }
    setOpen(true);
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
            groupButtonHandler={groupButtonHandler}
            control={control}
            groupButtonDisabled={groupButtonDisabled}
            availableLabel={availableLabel}
          />

          <Total total={total} label={pair.accountingLabel} />
          <Info
            isRendered={isAmountOut}
            text="The amount is higher than the pool's assets!"
          />
          <Info
            isRendered={!isApproved}
            color="warning"
            text={`Current Allowance: ${currentAllowance} ${pair.accountingLabel}`}
          />
          <Submit
            side={side}
            isLoading={isSubmitting || approveLoading || fulfillLoading}
            control={control}
            submitContent={`Buy ${pair?.underlyingLabel}`}
            write={write}
            isApproved={isApproved}
            isMarket={true}
          />
          <Info hasLoading isRendered={gasLoading} text="Estimating Gas..." />
        </div>
      </form>
      <MarketBuyConfirmation
        finalValues={{ ...finalValues, totalToPay }}
        fulfillLoading={fulfillLoading}
        gasLoading={gasLoading}
        open={open}
        setOpen={setOpen}
        waitedData={waitedData}
        waitedError={waitedError}
        waitedSuccess={waitedSuccess}
        write={write}
      />
    </>
  );
};

export default MarketBuy;
