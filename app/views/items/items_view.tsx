import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/items_view";
import { data } from "react-router";
import Typography from "@mui/material/Typography";
import ItemsTable from "./items_table";
import { getItemExpenseIncome, type ItemDisplay } from "./item_funcs";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "項目一覧 | Aboshi" },
    {
      name: "description",
      content: "登録した収入・支出の項目を一覧で確認できます。",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: items, error } = await supabase
    .from("items")
    .select(
      "id, name, is_income, amount, timestamp, small_categories(name, medium_categories(name, large_categories(name))), money_status(name)"
    )
    .order("timestamp", { ascending: false });
  if (error)
    throw error;

  const displayData: ItemDisplay[] = items.map(({
    small_categories,
    money_status,
    ...item
  }) => {
    const { expense, income } = getItemExpenseIncome(item);
    return {
      id: item.id,
      name: item.name,
      expense,
      income,
      smallCategoryName: small_categories.name,
      mediumCategoryName: small_categories.medium_categories.name,
      largeCategoryName: small_categories.medium_categories.large_categories.name,
      methodName: money_status.name,
      timestamp: new Date(item.timestamp),
    };
  });

  return data(displayData, { headers });
}

export default function ItemsView({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Typography variant="h2" component="h2">項目一覧</Typography>
      <ItemsTable items={loaderData} />
    </>
  );
}
