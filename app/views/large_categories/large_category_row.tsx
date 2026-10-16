import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router";

type LargeCategoryRowProps = {
  cid: number;
  name: string;
  expense: number;
  income: number;
};

export default function LargeCategoryRow({
  cid,
  name,
  expense,
  income
}: LargeCategoryRowProps) {
  return (
    <TableRow>
      <TableCell>{cid}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{income}</TableCell>
      <TableCell align="right">{expense}</TableCell>
      <TableCell>
        <IconButton
          component={Link}
          to={`/edit/large_category/${cid}`}
          color="inherit"
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}