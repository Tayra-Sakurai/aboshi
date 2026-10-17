import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router";
import type { MoneyStatusDisplay } from "./money_status";

export default function MoneyStatusRow({
  cid,
  name,
  expense,
  income,
}: Omit<MoneyStatusDisplay, "id"> & {
  cid: number;
}) {
  return (
    <TableRow>
      <TableCell>{cid}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{income}</TableCell>
      <TableCell align="right">{expense}</TableCell>
      <TableCell>
        <IconButton
          component={Link}
          to={`/edit/money_status/${cid}`}
          color="inherit"
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
