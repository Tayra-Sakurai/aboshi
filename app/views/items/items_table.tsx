import { useEffect, useState } from "react";
import { sortByKey, type MuiDirection } from "../sorters/display_model_sorters";
import type { ItemDisplay } from "./item_funcs";
import ItemRow from "./item_row";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

type ItemsTableProps = {
  items: ItemDisplay[];
};

const headers: { label: string; key: keyof ItemDisplay; alignRight?: boolean }[] = [
  { label: "ID", key: "id" },
  { label: "日時", key: "timestamp" },
  { label: "大分類", key: "largeCategoryName" },
  { label: "中分類", key: "mediumCategoryName" },
  { label: "小分類", key: "smallCategoryName" },
  { label: "項目名", key: "name" },
  { label: "決済手段", key: "methodName" },
  { label: "収入", key: "income", alignRight: true },
  { label: "支出", key: "expense", alignRight: true },
];

export default function ItemsTable({ items }: ItemsTableProps) {
  const [sortBy, setSortBy] = useState<keyof ItemDisplay>("timestamp");
  const [direction, setDirection] = useState<MuiDirection>("desc");
  const [displayData, setDisplayData] = useState<ItemDisplay[]>([]);

  useEffect(() => {
    const sortedItems = [...items];
    if (sortedItems.length > 0) {
      switch (sortBy) {
        case "id":
        case "income":
        case "expense":
          sortedItems.sort(sortByKey(sortBy, direction, sortedItems));
          break;
        case "timestamp":
          sortedItems.sort(sortByKey(sortBy, direction, sortedItems));
          break;
        default:
          sortedItems.sort(sortByKey(sortBy, direction, sortedItems));
          break;
      }
    }
    setDisplayData(sortedItems);
  }, [items, sortBy, direction]);

  const requestSort = (key: keyof ItemDisplay) => () => {
    setDirection(key === sortBy && direction === "asc" ? "desc" : "asc");
    setSortBy(key);
  };

  return (
    <TableContainer sx={{ width: "100%" }}>
      <Table sx={{ width: "fit-content" }}>
        <TableHead>
          <TableRow>
            {headers.map(({ label, key, alignRight }) => (
              <TableCell key={key} align={alignRight ? "right" : "left"}>
                <TableSortLabel
                  active={sortBy === key}
                  direction={sortBy === key ? direction : "asc"}
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
          {displayData.map((displayData) => (
            <ItemRow key={displayData.id} displayData={displayData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
