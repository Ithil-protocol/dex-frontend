import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTokenBalance } from "@/hooks/account";
import { useAllowance, useCreateOrder } from "@/hooks/poolWrite";
import { LimitInputs } from "@/types";
import { limitSchema } from "@/data/forms";
import { useConvertSellLimitArgs } from "@/components/CreateOrder/utils";
import { useCallback, useState } from "react";
import Price from "@/components/CreateOrder/Inputs/Price";
import Total from "@/components/CreateOrder/Inputs/Total";
import Submit from "@/components/CreateOrder/Inputs/Submit";
import LimitAmount from "@/components/CreateOrder/Inputs/Amount";
import Info from "@/components/Common/Info";
import { fixPrecision } from "@/utility/converters";
import LimitConfirmation from "@/components/CreateOrder/Confirmation/LimitConfirmation";
import { useGetMaxBoost } from "@/hooks/useGetMaxBoost";
import Boost from "@/components/CreateOrder/Inputs/Boost";

interface Props {}

const LimitSell: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, setValue } = useForm<LimitInputs>({
    resolver: yupResolver(limitSchema),
    mode: "onChange",
  });

  const formValues = useWatch({ control });
  const [pair, side, sellPool] = usePoolStore((state) => [
    state.pair,
    state.side,
    state.sellPool,
  ]);

  const finalValues = useConvertSellLimitArgs({
    amount: formValues.amount,
    price: formValues.price,
    boost: formValues.boost,
    pool: sellPool,
  });
  const available = useTokenBalance({
    tokenAddress: sellPool.underlying.address,
  });
  const availableLabel = `${fixPrecision(
    available,
    sellPool.underlying.displayPrecision
  )} ${pair.underlyingLabel}`;

  const {
    write,
    isLoading: createLoading,
    gasLoading,
    waitedData,
    waitedError,
    waitedSuccess,
    resetCreate,
  } = useCreateOrder({ ...finalValues, side: "sell" });

  const {
    write: approve,
    isApproved,
    isLoading: approveLoading,
    currentAllowance,
  } = useAllowance({
    amount: formValues.amount,
    pool: sellPool,
    token: sellPool.underlying,
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
  const total = (
    Number(formValues.amount) * Number(formValues.price) || 0
  ).toFixed(sellPool.accounting.decimals);

  const modalCloseHandler = () => {
    setOpen(false);
    resetCreate();
  };

  const { maxBoost, isLoading: maxBoostLoading } = useGetMaxBoost({
    actualPrice: finalValues.actualPrice,
    poolAddress: finalValues.pool.address,
    price: finalValues.price,
  });

  const boostGroupButtonHandler = useCallback(
    (factor: number) => {
      console.log("factor:", factor);

      const boost = factor * maxBoost;
      setValue("boost", boost.toString());
    },
    [setValue, maxBoost]
  );

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 7,
            padding: "5px",
          }}
        >
          <LimitAmount
            control={control}
            availableLabel={availableLabel}
            groupButtonHandler={groupButtonHandler}
            groupButtonDisabled={groupButtonDisabled}
          />
          <Info
            isRendered={!isApproved}
            color="warning"
            text={`Current Allowance: ${currentAllowance} ${pair.underlyingLabel}`}
          />

          <Price control={control} endLabel={pair.accountingLabel} />

          <Boost
            groupButtonDisabled={maxBoostLoading}
            groupButtonHandler={boostGroupButtonHandler}
            boost={Number(formValues.boost || 0)}
          />

          <Total total={total} label={pair.accountingLabel} />

          <Submit
            submitContent={`Sell ${pair.underlyingLabel}`}
            side={side}
            isLoading={createLoading || approveLoading}
            control={control}
            write={write}
            isApproved={isApproved}
          />
          <Info hasLoading isRendered={gasLoading} text="Estimating Gas..." />
        </div>
      </form>
      <LimitConfirmation
        finalValues={finalValues}
        open={open}
        write={write}
        createLoading={createLoading}
        gasLoading={gasLoading}
        waitedData={waitedData}
        waitedError={waitedError}
        waitedSuccess={waitedSuccess}
        modalCloseHandler={modalCloseHandler}
      />
    </>
  );
};

export default LimitSell;
