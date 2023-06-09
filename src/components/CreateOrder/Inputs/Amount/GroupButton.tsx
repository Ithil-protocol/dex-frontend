import { Button } from "@mui/material";

interface Props {
  disabled: boolean;
  groupButtonHandler: (item: number) => void;
}

const GroupButton: React.FC<Props> = ({ disabled, groupButtonHandler }) => {
  const buttons = [25, 50, 75, 100];

  return (
    <div
      style={{
        display: "flex",
        borderRadius: "0px 0px 5px 5px",
      }}
    >
      {buttons.map((item, i) => {
        return (
          <Button
            variant="contained"
            onClick={() => groupButtonHandler(item)}
            disabled={disabled}
            key={i}
            disableElevation
            sx={(theme) => ({
              borderRadius: 0,
              backgroundColor: theme.palette.background.default,
              borderRight:
                i < buttons.length - 1
                  ? `1px solid ${theme.palette.background.paper}`
                  : 0,
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
              padding: "5px",
              width: "100%",
              borderEndEndRadius: i === buttons.length - 1 ? "5px" : 0,
              borderEndStartRadius: i === 0 ? "5px" : 0,
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

export default GroupButton;
