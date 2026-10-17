import { useEffect, useState } from "react";
import { getMediumCategoryTotal, type MediumCategoryDisplay } from "./medium_category";
import { sortByKey, type MuiDirection } from "../sorters/display_model_sorters";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableBody from "@mui/material/TableBody";
import MediumCategoryRow from "./medium_category_row";

type MediumCategoriesTableProps = {
  mediumCategories: {
    name: string;
    id: number;
    large_categories: {
      name: string;
    };
    small_categories: {
      items: {
        is_income: boolean;
        amount: number;
      }[];
    }[];
  }[];
};

export default function MediumCategoriesTable({
  mediumCategories
}: MediumCategoriesTableProps) {
  const [sortBy, setSortBy] = useState<keyof MediumCategoryDisplay>('name');
  const [direction, setDirection] = useState<MuiDirection>('asc');
  const [displayValues, setDisplayValues] = useState<MediumCategoryDisplay[]>([]);
  useEffect(() => {
    const func = async () => {
      const values: MediumCategoryDisplay[] = mediumCategories.map(({ large_categories: { name }, ...others }): MediumCategoryDisplay => {
        const totals = getMediumCategoryTotal(others);
        return {
          largeCategoryName: name,
          ...others,
          ...totals,
        };
      });
      switch (sortBy) {
        case "name":
        case "largeCategoryName":
          values.sort(sortByKey(sortBy, direction, values));
          break;
        default:
          values.sort(sortByKey(sortBy, direction, values));
          break;
      }
      setDisplayValues(values);
    };
    func();
  }, [sortBy, direction]);
  const requestSort = (key: keyof MediumCategoryDisplay) => () => {
    const isAsc = (key === sortBy) && (direction === 'asc');
    setSortBy(key);
    setDirection(isAsc ? 'desc' : 'asc');
  };
  return (
    <TableContainer
      sx={{ width: '100%' }}
    >
      <Table
        sx={{
          width: 'fit-content',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'id'}
                direction={sortBy === 'id' ? direction : 'asc'}
                onClick={requestSort('id')}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'largeCategoryName'}
                direction={sortBy === 'largeCategoryName' ? direction : 'asc'}
                onClick={requestSort('largeCategoryName')}
              >
                大分類
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'name'}
                direction={sortBy === 'name' ? direction : 'asc'}
                onClick={requestSort('name')}
              >
                分類名
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortBy === 'income'}
                direction={sortBy === 'income' ? direction : 'asc'}
                onClick={requestSort('income')}
              >
                収入
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortBy === 'expense'}
                direction={sortBy === 'expense' ? direction : 'asc'}
                onClick={requestSort('expense')}
              >
                支出
              </TableSortLabel>
            </TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayValues.map(({ id, ...value }) => <MediumCategoryRow cid={id} {...value} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}