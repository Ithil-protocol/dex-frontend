import { Button } from "@mui/material";
import { useTokenBalance } from "hooks/account";
import React from "react";

interface Props {
  setValue: any;
  disabled: boolean;
  price: number;
}

const AmountGroupButton: React.FC<Props> = ({ setValue, disabled, price }) => {
  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });
  const balance = tokenBalance ? Number(tokenBalance.formatted) : 0;

  const clickHandler = (item: number) => {
    const balancePercent = (item / 100) * balance;
    const amountPercent = balancePercent / price;
    console.log(amountPercent);

    setValue("amount", amountPercent.toFixed(6));
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
            variant="contained"
            onClick={() => clickHandler(item)}
            disabled={disabled}
            key={i}
            sx={(theme) => ({
              borderRadius: 0,
              backgroundColor: theme.palette.background.default,
              borderRight: `1px solid ${theme.palette.background.paper}`,
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
              padding: "5px",
              width: "100%",
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
