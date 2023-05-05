import { BoostName } from "@/types";
import { Button } from "@mui/material";

interface Props {
  disabled: boolean;
  groupButtonHandler: (item: BoostName) => void;
}

const BoostGroupButton: React.FC<Props> = ({
  disabled,
  groupButtonHandler,
}) => {
  const buttons: BoostName[] = ["no boost", "slow", "normal", "fast"];

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
            onClick={() => groupButtonHandler(item)}
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
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default BoostGroupButton;
