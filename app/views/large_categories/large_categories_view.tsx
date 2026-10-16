import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/large_categories_view";
import Typography from "@mui/material/Typography";
import LargeCategoriesTable from "./large_categories_table";

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const { data, error } = await supabase
    .from('large_categories')
    .select('id, name, medium_categories(small_categories(items(amount, is_income)))');
  if (error)
    throw error;
  return data;
}

export default function LargeCategoriesView({
  loaderData
}: Route.ComponentProps) {
  return (
    <>
      <Typography variant="h2" component="h2">大分類一覧</Typography>
      <LargeCategoriesTable largeCategories={loaderData} />
    </>
  );
}