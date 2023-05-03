import { Chip } from "@mui/material";

interface Props {
  label: string;
}
const LabelChip: React.FC<Props> = ({ label }) => {
  return (
    <Chip
      label={label}
      variant="filled"
      size="small"
      color="secondary"
      sx={{ fontSize: 10, fontWeight: 600, marginTop: -0.2 }}
    />
  );
};
export default LabelChip;
