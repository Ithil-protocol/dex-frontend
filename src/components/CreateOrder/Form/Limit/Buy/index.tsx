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
import Total from "components/CreateOrder/Inputs/Total";
import Submit from "components/CreateOrder/Inputs/Submit";
import Info from "components/Common/Info";

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

  const {
    write: approve,
    isLoading: approveLoading,
    isApproved,
  } = useAllowance({
    amount: total,
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

  return (
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

        <Price control={control} endLabel={pair?.accountingLabel} />

        <Boost control={control} />

        <Total total={total} label={pair?.accountingLabel} />

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
        <Info
          hasLoading={true}
          isRendered={gasLoading}
          text="Estimating Gas..."
        />
      </div>
    </form>
  );
};

export default LimitBuy;
