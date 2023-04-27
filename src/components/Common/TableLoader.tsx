import { Skeleton, TableCell, TableRow } from "@mui/material";

interface Props {
  rowsNum: number;
  cellsNumber: number;
}

const TableLoader: React.FC<Props> = ({ rowsNum, cellsNumber }) => {
  return (
    <>
      {[...Array(rowsNum)].map((_row, index) => (
        <TableRow key={index}>
          {[
            [...Array(cellsNumber)].map((_cell, index) => (
              <TableCell key={index}>
                <Skeleton />
              </TableCell>
            )),
          ]}
        </TableRow>
      ))}
    </>
  );
};

export default TableLoader;
