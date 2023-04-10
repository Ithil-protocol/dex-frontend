import { Button, TableCell, TableRow } from "@mui/material";
import { OpenOrder } from "types";

interface Props {
  data: OpenOrder;
  hasCancel: boolean;
}

const Order = ({ data, hasCancel }: Props) => {
  return (
    <TableRow
      sx={(theme) => ({
        "&:not(:last-child)": {
          borderBottom: `2px solid ${theme.palette.background.default}`,
        },
        "&:last-child td, &:last-child th": { border: 0 },
      })}
    >
      <TableCell
        sx={(_theme) => ({
          fontWeight: 400,
          padding: "10px",
        })}
        component="th"
        scope="row"
      >
        {data.time} {data.date}
      </TableCell>

      <TableCell
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontWeight: 600,
        })}
        align="left"
      >
        <span>{data.market.split("/")[0]}</span>
        <span> / </span>
        <span>{data.market.split("/")[1]}</span>
      </TableCell>

      <TableCell
        sx={(theme) => ({
          fontWeight: 400,
          color:
            data.side === "buy"
              ? theme.palette.success.main
              : theme.palette.error.main,
        })}
        align="left"
      >
        {data.side}
      </TableCell>

      <TableCell
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontWeight: 400,
        })}
        align="left"
      >
        {data.type}
      </TableCell>

      <TableCell
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontWeight: 400,
        })}
        align="left"
      >
        {data.amount} {data.market.split("/")[1]}
      </TableCell>

      <TableCell
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontWeight: 400,
        })}
        align="left"
      >
        {data.unitPrice}
      </TableCell>

      <TableCell
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontWeight: 400,
        })}
        align="left"
      >
        {data.total} {data.market.split("/")[0]}
      </TableCell>

      {hasCancel && (
        <TableCell
          sx={(theme) => ({
            color: theme.palette.text.primary,
            fontWeight: 400,
          })}
          align="left"
        >
          <Button size="small" style={{ padding: "0px" }}>
            cancel
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default Order;
