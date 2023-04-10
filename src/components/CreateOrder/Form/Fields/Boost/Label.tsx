import { FormLabel } from "@mui/material";

interface Props {
  boost: number;
}

const BoostLabel: React.FC<Props> = ({ boost }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <FormLabel sx={(theme) => ({ color: theme.palette.text.primary })}>
        Boost
      </FormLabel>
      <span>
        <span>{boost}</span> <span style={{ fontSize: 12 }}>ETH</span>
      </span>
    </div>
  );
};

export default BoostLabel;
