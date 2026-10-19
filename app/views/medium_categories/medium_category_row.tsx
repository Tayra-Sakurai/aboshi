import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import type { MediumCategoryDisplay } from "./medium_category";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink } from "react-router";

export default function MediumCategoryRow({
  cid,
  name,
  largeCategoryName,
  expense,
  income
}: Omit<MediumCategoryDisplay, "id"> & {
  cid: number;
}) {
  return (
    <TableRow>
      <TableCell>{cid}</TableCell>
      <TableCell>{largeCategoryName}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{income}</TableCell>
      <TableCell align="right">{expense}</TableCell>
      <TableCell>
        <IconButton
          color="inherit"
          component={RouterLink}
          to={`/edit/medium_category/${cid}`}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}