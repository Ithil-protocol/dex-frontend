import WrapperTab from "../../Common/WrapperTab";
import { useTheme } from "@mui/material";
import { usePoolStore } from "store";
import { Side } from "types";
import Tabs from "@mui/material/Tabs";
import LimitForm from "../Form/Limit";

interface Props {}

const LimitPoolTabs: React.FC<Props> = () => {
  const theme = useTheme();

  const [side, updateSide] = usePoolStore((store) => [
    store.side,
    store.updateSide,
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

      <div role="tabpanel" hidden={side !== "buy"}>
        {side === "buy" && <LimitForm side={side} />}
      </div>

      <div role="tabpanel" hidden={side !== "sell"}>
        {side === "sell" && <LimitForm side={side} />}
      </div>
    </div>
  );
};

export default LimitPoolTabs;
