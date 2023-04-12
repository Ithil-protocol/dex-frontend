import { TableBody } from "@mui/material";
import { buyOrders } from "store/web3Store";
import EachTrade from "../EachTrade";

export default function TradesTableBody() {
  return (
    <TableBody>
      {buyOrders
        .slice(-15)
        .reverse()
        .map((item, i) => (
          <EachTrade key={i} data={item} />
        ))}
    </TableBody>
  );
}
