import { useEffect, useState } from "react";
import { getMonthlyTotal, type SmallCategoryDisplay } from "./small_category_funcs";
import { sortByKey, type MuiDirection } from "../sorters/display_model_sorters";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableBody from "@mui/material/TableBody";
import SmallCategoryRow from "./small_category_row";

type SmallCategoriesTableProps = {
  smallCategories: {
    id: number;
    name: string;
    monthly_budget: number;
    items: {
      is_income: boolean;
      amount: number;
      timestamp: string;
    }[];
    medium_categories: {
      name: string;
      large_categories: {
        name: string;
      };
    };
  }[];
};

type THeader = {
  label: string;
  key: keyof SmallCategoryDisplay;
  alignRight?: boolean;
};

const headers: THeader[] = [
  {
    label: 'ID',
    key: 'id',
  },
  {
    label: '大分類',
    key: 'largeCategoryName',
  },
  {
    label: '中分類',
    key: 'mediumCategoryName',
  },
  {
    label: '分類名',
    key: 'name',
  },
  {
    label: '予算',
    key: 'budget',
    alignRight: true,
  },
  {
    label: '今月の収入',
    key: 'monthlyIncome',
    alignRight: true,
  },
  {
    label: '今月の支出',
    key: 'monthlyExpense',
    alignRight: true,
  },
  {
    label: '収入合計',
    key: 'income',
    alignRight: true,
  },
  {
    label: '支出合計',
    key: 'expense',
    alignRight: true,
  },
];

export default function SmallCategoriesTable({
  smallCategories
}: SmallCategoriesTableProps) {
  const [displayData, setDisplayData] = useState<SmallCategoryDisplay[]>([]);
  const [sortBy, setSortBy] = useState<keyof SmallCategoryDisplay>('id');
  const [direction, setDirection] = useState<MuiDirection>('asc');

  const requestSort = (key: keyof SmallCategoryDisplay) => () => {
    const isAsc = (key === sortBy) && (direction === 'asc');
    setSortBy(key);
    setDirection(isAsc ? 'desc' : 'asc');
  };

  useEffect(() => {
    const func = async () => {
      const displayValues: SmallCategoryDisplay[] = smallCategories.map(({
        monthly_budget,
        medium_categories: {
          name,
          large_categories
        },
        ...value
      }): SmallCategoryDisplay => {
        const stats = getMonthlyTotal(value);
        return {
          largeCategoryName: large_categories.name,
          mediumCategoryName: name,
          budget: monthly_budget,
          ...stats,
          ...value,
        };
      });
      switch (sortBy) {
        case 'budget':
        case 'expense':
        case 'id':
        case 'income':
        case 'monthlyExpense':
        case 'monthlyIncome':
          displayValues.sort(sortByKey(sortBy, direction, displayValues));
          break;
        default:
          displayValues.sort(sortByKey(sortBy, direction, displayValues));
          break;
      }
      setDisplayData(displayValues);
    };
    func();
  }, [smallCategories, sortBy, direction]);

  return (
    <TableContainer>
      <Table sx={{ width: 'fit-content' }}>
        <TableHead>
          <TableRow>
            {headers.map(({label, key, alignRight}) => (
              <TableCell align={alignRight ? 'right' : 'left'}>
                <TableSortLabel
                  active={sortBy === key}
                  direction={sortBy === key ? direction : 'asc'}
                  onClick={requestSort(key)}
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData.map((value) => <SmallCategoryRow displayData={value} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}