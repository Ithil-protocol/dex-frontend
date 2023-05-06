import { useForm, useWatch } from "react-hook-form";
import { usePoolStore } from "@/store";
import Boost from "@/components/CreateOrder/Inputs/Boost";
import Price from "@/components/CreateOrder/Inputs/Price";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTokenBalance } from "@/hooks/account";
import { useAllowance, useCreateOrder } from "@/hooks/poolWrite";
import LimitAmount from "@/components/CreateOrder/Inputs/Amount";
import { LimitInputs } from "@/types";
import { limitSchema } from "@/data/forms";
import { useConvertBuyLimitArgs } from "@/components/CreateOrder/utils";
import { useCallback, useState } from "react";
import Total from "@/components/CreateOrder/Inputs/Total";
import Submit from "@/components/CreateOrder/Inputs/Submit";
import Info from "@/components/Common/Info";
import { fixPrecision } from "@/utility/converters";
import LimitConfirmation from "@/components/CreateOrder/Confirmation/LimitConfirmation";
import { useGetMaxBoost } from "@/hooks/useGetMaxBoost";

interface Props {}

const LimitBuy: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
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

  const finalValues = useConvertBuyLimitArgs({
    amount: formValues.amount,
    price: formValues.price,
    boost: formValues.boost,
    pool: buyPool,
  });

  const available = useTokenBalance({
    tokenAddress: buyPool.underlying.address,
  });
  const availableLabel = `${fixPrecision(
    available,
    buyPool.underlying.displayPrecision
  )} ${pair.accountingLabel}`;

  const {
    write,
    isLoading: createLoading,
    gasLoading,
    waitedData,
    waitedError,
    waitedSuccess,
    resetCreate,
  } = useCreateOrder({ ...finalValues, side: "buy" });

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

  const total = fixPrecision(
    Number(formValues.amount) * Number(formValues.price) || 0,
    buyPool.underlying.displayPrecision
  );

  const totalAmount = (
    Number(formValues.amount) * Number(formValues.price) || 0
  ).toFixed(buyPool.underlying.decimals);

  const {
    write: approve,
    isLoading: approveLoading,
    isApproved,
    currentAllowance,
  } = useAllowance({
    amount: totalAmount,
    pool: buyPool,
    token: buyPool.underlying,
  });

  const handleFormSubmit = () => {
    if (!isApproved && approve) {
      approve();
      return;
    }
    setOpen(true);
    resetCreate();
  };

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
            groupButtonDisabled={groupButtonDisabled}
            control={control}
            availableLabel={availableLabel}
            groupButtonHandler={groupButtonHandler}
          />
          <Price control={control} endLabel={pair.accountingLabel} />

          <Boost
            groupButtonDisabled={maxBoostLoading}
            groupButtonHandler={boostGroupButtonHandler}
            boost={Number(formValues.boost || 0)}
          />

          <Total total={total} label={pair.accountingLabel} />

          <Info
            isRendered={!isApproved}
            color="warning"
            text={`Current Allowance: ${currentAllowance} ${pair.accountingLabel}`}
          />

          <Submit
            side={side}
            isLoading={createLoading || approveLoading}
            control={control}
            submitContent={`Buy ${pair.underlyingLabel}`}
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

export default LimitBuy;
