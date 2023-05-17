import { TableCell, TableHead, TableRow } from "@mui/material";

interface Props {
  heads: string[];
}
const Head: React.FC<Props> = ({ heads }) => {
  return (
    <TableHead>
      <TableRow>
        {heads.map((item, i) => (
          <TableCell key={i}>{item}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default Head;
