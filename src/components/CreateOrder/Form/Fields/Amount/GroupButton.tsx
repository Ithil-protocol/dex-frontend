import { Button } from "@mui/material";
import { useTokenBalance } from "hooks/account";
import React from "react";
import { Control, FieldValues, useWatch } from "react-hook-form";

interface Props {
  control: Control<FieldValues, any>;
  setValue: any;
}

const AmountGroupButton: React.FC<Props> = ({ control, setValue }) => {
  const { price } = useWatch({ control });

  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });
  const balance = tokenBalance ? Number(tokenBalance.formatted) : 0;

  const clickHandler = (item: number) => {
    const balancePercent = (item / 100) * balance;
    const amountPercent = balancePercent / price;
    setValue("amount", amountPercent);
  };

  return (
    <div
      style={{
        display: "flex",
        borderRadius: "0px 0px 5px 5px",
      }}
    >
      {[25, 50, 75, 100].map((item, i) => {
        return (
          <Button
            onClick={() => clickHandler(item)}
            disabled={price == "" || price == 0 || price == undefined}
            key={i}
            sx={(theme) => ({
              color: theme.palette.text.primary,
              width: "100%",
              borderRadius: 0,
              "&:disabled": { color: theme.palette.text.disabled },
            })}
            size="small"
          >
            {item}%
          </Button>
        );
      })}
    </div>
  );
};

export default AmountGroupButton;
