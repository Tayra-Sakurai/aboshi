import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/large_categories_view";
import Typography from "@mui/material/Typography";
import LargeCategoriesTable from "./large_categories_table";
import { data, Link as RouterLink } from "react-router";
import Link from "@mui/material/Link";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "大分類一覧 | Aboshi" },
    {
      name: "description",
      content: "登録した大分類と、その分類に属する項目を確認できます。",
    },
  ];
}

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: d, error } = await supabase
    .from('large_categories')
    .select('id, name, medium_categories(small_categories(items(amount, is_income)))');
  if (error)
    throw error;
  return data(d, { headers });
}

export default function LargeCategoriesView({
  loaderData
}: Route.ComponentProps) {
  return (
    <>
      <Typography variant="h2" component="h2">大分類一覧</Typography>
      <p><Link component={RouterLink} to="/add/large_category">項目を追加</Link></p>
      <LargeCategoriesTable largeCategories={loaderData} />
    </>
  );
}