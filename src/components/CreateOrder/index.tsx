import WrapperTab from "@/components/Common/WrapperTab";
import { Box } from "@mui/material";
import { LimitMarket } from "@/types";
import Tabs from "@mui/material/Tabs";
import LimitPoolTabs from "./PoolTabs/LimitPoolTabs";
import MarketPoolTabs from "./PoolTabs/MarketPoolTabs";
import { usePoolStore } from "@/store";

const CreateOrder = () => {
  const [type, updateType] = usePoolStore((store) => [
    store.type,
    store.updateType,
  ]);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: LimitMarket
  ) => {
    updateType(newValue);
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: "5px",
        height: 600,
        padding: "10px 5px 5px 5px",
        position: "sticky",
        top: 15,
      })}
    >
      <Tabs value={type} onChange={handleChange}>
        <WrapperTab value="limit" label="Limit" />
        <WrapperTab value="market" label="Market" />
      </Tabs>

      <div
        style={{
          padding: "0px 15px",
        }}
      >
        {type === "limit" && <LimitPoolTabs />}

        {type === "market" && <MarketPoolTabs />}
      </div>
    </Box>
  );
};

export default CreateOrder;
