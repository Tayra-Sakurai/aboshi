import { useEffect, useState } from "react";
import type { Database } from "~/typing/supabase";
import { getMoneyStatusTotal, type MoneyStatusDisplay } from "./money_status";
import { sortByKey, type MuiDirection } from "../sorters/display_model_sorters";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableBody from "@mui/material/TableBody";
import MoneyStatusRow from "./money_status_row";

type MoneyStatus = Omit<
  Database["public"]["Tables"]["money_status"]["Row"],
  "user_id" | "created_at"
> & {
  items: Omit<
    Database["public"]["Tables"]["items"]["Row"],
    "id" | "created_at" | "name" | "small_category_id" | "method_id" | "user_id" | "timestamp"
  >[];
};

type MoneyStatusTableProps = {
  moneyStatus?: MoneyStatus[];
  moneyStatuses?: MoneyStatus[];
};

export default function MoneyStatusTable({
  moneyStatus,
  moneyStatuses,
}: MoneyStatusTableProps) {
  const data = moneyStatus ?? moneyStatuses ?? [];
  const [sortBy, setSortBy] = useState<keyof MoneyStatusDisplay>('name');
  const [direction, setDirection] = useState<MuiDirection>('asc');
  const [displayValues, setDisplayValues] = useState<MoneyStatusDisplay[]>([]);

  useEffect(() => {
    const func = async () => {
      const displayVals: MoneyStatusDisplay[] = data.map(value => {
        const { expense, income } = getMoneyStatusTotal(value);
        return {
          id: value.id,
          name: value.name,
          expense,
          income,
        };
      });
      if (displayVals.length > 0) {
        switch (sortBy) {
          case 'name':
            displayVals.sort(sortByKey(sortBy, direction, displayVals));
            break;
          default:
            displayVals.sort(sortByKey(sortBy, direction, displayVals));
            break;
        }
      }
      setDisplayValues(displayVals);
    };
    func();
  }, [data, sortBy, direction]);

  const requestSort = (key: keyof MoneyStatusDisplay) => () => {
    const isAsc = (key === sortBy) && (direction === 'asc');
    setSortBy(key);
    setDirection(isAsc ? 'desc' : 'asc');
  };

  return (
    <TableContainer sx={{ width: '100%' }}>
      <Table sx={{ width: 'fit-content' }}>
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
                active={sortBy === 'name'}
                direction={sortBy === 'name' ? direction : 'asc'}
                onClick={requestSort('name')}
              >
                名称
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
          {displayValues.map(({ id, ...others }) => (
            <MoneyStatusRow key={id} cid={id} {...others} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
