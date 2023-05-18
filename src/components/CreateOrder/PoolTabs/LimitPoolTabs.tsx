import WrapperTab from "@/components/Common/WrapperTab";
import { useTheme } from "@mui/material";
import { usePoolStore } from "@/store";
import { Side } from "@/types";
import Tabs from "@mui/material/Tabs";
import LimitBuy from "@/components/CreateOrder/Form/Limit/Buy";
import LimitSell from "@/components/CreateOrder/Form/Limit/Sell";

const LimitPoolTabs = () => {
  const theme = useTheme();

  const [side, updateSide, type] = usePoolStore((store) => [
    store.side,
    store.updateSide,
    store.type,
  ]);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: Side
  ) => {
    updateSide(newValue);
  };

  return (
    <div>
      <Tabs variant="fullWidth" value={side} onChange={handleChange}>
        <WrapperTab
          value="buy"
          label="Buy"
          selectedBgColor={theme.palette.success.main}
        />
        <WrapperTab
          value="sell"
          color={theme.palette.error.main}
          selectedBgColor={theme.palette.error.main}
          label="Sell"
        />
      </Tabs>

      {side === "buy" && type === "limit" && <LimitBuy />}

      {side === "sell" && type === "limit" && <LimitSell />}
    </div>
  );
};

export default LimitPoolTabs;
