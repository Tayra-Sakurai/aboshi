import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import type { ItemDisplay } from "./item_funcs";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink } from "react-router";

type ItemRowProps = {
  displayData: ItemDisplay;
};

export default function ItemRow({
  displayData: {
    id,
    name,
    income,
    expense,
    largeCategoryName,
    mediumCategoryName,
    smallCategoryName,
    timestamp,
    methodName
  }
}: ItemRowProps) {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{timestamp.toLocaleDateString()}</TableCell>
      <TableCell>{largeCategoryName}</TableCell>
      <TableCell>{mediumCategoryName}</TableCell>
      <TableCell>{smallCategoryName}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{methodName}</TableCell>
      <TableCell align="right">{income}</TableCell>
      <TableCell align="right">{expense}</TableCell>
      <TableCell>
        <IconButton
          color="inherit"
          component={RouterLink}
          to={`/edit/item/${id}`}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}