import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/small_categories_view";
import { data } from "react-router";
import Typography from "@mui/material/Typography";
import SmallCategoriesTable from "./small_categories_table";

export async function loader({
  request,
  params: {
    lc,
    mc
  }
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  if (lc && !mc) {
    const { data: d, error } = await supabase
      .from('small_categories')
      .select('id, name, monthly_budget, items(amount, is_income, timestamp), medium_categories(name, large_categories(name))')
      .eq('medium_categories.large_category_id', parseInt(lc));
    if (error)
      throw error;
    return data(d, {headers});
  }

  if (mc) {
    const { data: d, error } = await supabase
      .from('small_categories')
      .select('id, name, monthly_budget, items(amount, is_income, timestamp), medium_categories(name, large_categories(name))')
      .eq('medium_category_id', parseInt(mc));
    if (error)
      throw error;
    return data(d, { headers });
  }

  const { data: d, error: e } = await supabase
    .from('small_categories')
    .select('id, name, monthly_budget, items(amount, is_income, timestamp), medium_categories(name, large_categories(name))');
  if (e)
    throw e;
  return data(d, { headers });
}

export default function SmallCategoriesView({
  loaderData
}: Route.ComponentProps) {
  return (
    <>
      <Typography variant="h2" component="h2">小分類</Typography>
      <SmallCategoriesTable smallCategories={loaderData} />
    </>
  );
}