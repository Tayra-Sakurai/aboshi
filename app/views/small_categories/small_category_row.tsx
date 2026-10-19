import TableRow from "@mui/material/TableRow";
import type { SmallCategoryDisplay } from "./small_category_funcs"
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router";

type SmallCategoryRowProps = {
  displayData: SmallCategoryDisplay;
};

export default function SmallCategoryRow({
  displayData: {
    id,
    name,
    largeCategoryName,
    mediumCategoryName,
    budget,
    monthlyExpense,
    monthlyIncome,
    income,
    expense
  }
}: SmallCategoryRowProps) {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{largeCategoryName}</TableCell>
      <TableCell>{mediumCategoryName}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{budget}</TableCell>
      <TableCell align="right">{monthlyIncome}</TableCell>
      <TableCell align="right">{monthlyExpense}</TableCell>
      <TableCell align="right">{income}</TableCell>
      <TableCell align="right">{expense}</TableCell>
      <TableCell>
        <IconButton
          component={Link}
          to={`/edit/small_category/${id}`}
          color="inherit"
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}