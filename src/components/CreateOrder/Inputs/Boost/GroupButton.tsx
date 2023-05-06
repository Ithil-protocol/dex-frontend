import { BoostName } from "@/types";
import { Button } from "@mui/material";

interface Props {
  disabled: boolean;
  groupButtonHandler: (item: number) => void;
}

const BoostGroupButton: React.FC<Props> = ({
  disabled,
  groupButtonHandler,
}) => {
  const buttons: BoostName[] = [
    { text: "no boost", factor: 0 },
    { text: "slow", factor: 0.4 },
    { text: "normal", factor: 0.7 },
    { text: "fast", factor: 1 },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0px 0px 5px 5px",
      }}
    >
      {buttons.map((item, i) => {
        const isFirstEl = i === 0;
        const isLastEl = i === buttons.length - 1;
        const isBeforeLastEl = i < buttons.length - 1;
        return (
          <Button
            variant="contained"
            onClick={() => groupButtonHandler(item.factor)}
            disabled={disabled}
            key={i}
            disableElevation
            sx={(theme) => ({
              borderRadius: `${isFirstEl ? "5px" : 0} ${isLastEl ? "5px" : 0} ${
                isLastEl ? "5px" : 0
              } ${isFirstEl ? "5px" : 0}`,
              backgroundColor: theme.palette.background.default,
              borderRight: isBeforeLastEl
                ? `1px solid ${theme.palette.background.paper}`
                : 0,
              "&:hover": {
                backgroundColor: theme.palette.background.default,
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
