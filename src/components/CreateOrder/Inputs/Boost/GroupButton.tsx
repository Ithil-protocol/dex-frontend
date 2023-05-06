import { Boost, BoostFactor } from "@/types";
import { Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  disabled: boolean;
  groupButtonHandler: (item: BoostFactor) => void;
}

const boosts: readonly Boost[] = [
  { text: "no boost", factor: 0 },
  { text: "slow", factor: 0.4 },
  { text: "normal", factor: 0.7 },
  { text: "fast", factor: 1 },
];

const BoostGroupButton: React.FC<Props> = ({
  disabled,
  groupButtonHandler,
}) => {
  const [active, setActive] = useState<Boost>(boosts[0]);
  const theme = useTheme();

  useEffect(() => {
    setActive(boosts[0]);
    groupButtonHandler(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        borderRadius: "0px 0px 5px 5px",
      }}
    >
      {boosts.map((item, i) => {
        const isFirstEl = i === 0;
        const isLastEl = i === boosts.length - 1;
        const isBeforeLastEl = i < boosts.length - 1;
        const isActive = active.factor === item.factor;
        const isNoBoost = active.factor === boosts[0].factor;

        const backgroundColor = isActive
          ? isNoBoost
            ? theme.palette.error.main
            : theme.palette.success.main
          : theme.palette.background.default;

        return (
          <Button
            variant="contained"
            onClick={() => {
              setActive(item);
              groupButtonHandler(item.factor);
            }}
            disabled={disabled}
            key={i}
            disableElevation
            sx={(theme) => ({
              borderRadius: `${isFirstEl ? "5px" : 0} ${isLastEl ? "5px" : 0} ${
                isLastEl ? "5px" : 0
              } ${isFirstEl ? "5px" : 0}`,
              backgroundColor,
              borderRight: isBeforeLastEl
                ? `1px solid ${theme.palette.background.paper}`
                : 0,
              "&:hover": {
                backgroundColor,
              },
              padding: "5px",
              width: "100%",
            })}
            size="small"
          >
            {item.text}
          </Button>
        );
      })}
    </div>
  );
};

export default BoostGroupButton;
