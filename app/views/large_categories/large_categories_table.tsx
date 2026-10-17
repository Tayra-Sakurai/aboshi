import { useEffect, useState } from "react";
import type { Database } from "~/typing/supabase";
import { getTotalAmount, type LargeCategoryDisplay } from "./large_category_funcs";
import { sortByKey, type MuiDirection } from "../sorters/display_model_sorters";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import LargeCategoryRow from "./large_category_row";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

type LargeCategory = Omit<
  Database["public"]["Tables"]["large_categories"]["Row"],
  ("user_id" | "created_at")
> & {
  medium_categories: {
    small_categories: {
      items: Omit<Database["public"]["Tables"]["items"]["Row"], "id" | "created_at" | "name" | "small_category_id" | "method_id" | "user_id" | "timestamp">[];
    }[];
  }[];
};

type LargeCategoriesTableProps = {
  largeCategories: LargeCategory[];
};

export default function LargeCategoriesTable({
  largeCategories
}: LargeCategoriesTableProps) {
  const [displayValues, setDisplayValues] = useState<LargeCategoryDisplay[]>([]);
  const [sortBy, setSortBy] = useState<keyof LargeCategoryDisplay>('name');
  const [dir, setDir] = useState<MuiDirection>('asc');
  useEffect(() => {
    const func = async () => {
      const displayVals = largeCategories.map(
        value => {
          const { expense, income } = getTotalAmount(value);
          return {
            ...value,
            expense,
            income,
          };
        }
      );
      switch (sortBy) {
        case 'expense':
        case 'id':
        case 'income':
          displayVals.sort(sortByKey(sortBy, dir, displayVals));
          break;
        default:
          displayVals.sort(sortByKey(sortBy, dir, displayVals));
      }
      setDisplayValues(displayVals);
    };
    func();
  }, [largeCategories, sortBy, dir]);
  const requestSort = (key: keyof LargeCategoryDisplay) => () => {
    const isAsc = (key === sortBy) && (dir === 'asc');
    setSortBy(key);
    setDir(isAsc ? 'desc' : 'asc');
  };

  return (
    <TableContainer sx={{ width: '100%' }}>
      <Table sx={{ width: 'fit-content' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'id'}
                direction={sortBy === 'id' ? dir : 'asc'}
                onClick={() => requestSort('id')}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'name'}
                direction={sortBy === 'name' ? dir : 'asc'}
                onClick={() => requestSort('name')}
              >
                名称
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortBy === 'income'}
                direction={sortBy === 'income' ? dir : 'asc'}
                onClick={() => requestSort('income')}
              >
                収入
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortBy === 'expense'}
                direction={sortBy === 'expense' ? dir : 'asc'}
                onClick={() => requestSort('expense')}
              >
                支出
              </TableSortLabel>
            </TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayValues.map(({id, ...others}) => <LargeCategoryRow cid={id} {...others} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}