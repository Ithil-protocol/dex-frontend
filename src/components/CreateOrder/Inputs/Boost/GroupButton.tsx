import { Button } from "@mui/material";

interface Props {
  disabled: boolean;
  groupButtonHandler: (item: number) => void;
}

const BoostGroupButton: React.FC<Props> = ({
  disabled,
  groupButtonHandler,
}) => {
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
            onClick={() => groupButtonHandler(item)}
            disabled={disabled}
            key={i}
            disableElevation
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

export default BoostGroupButton;
