import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/medium_categories_view";
import { data } from "react-router";
import Typography from "@mui/material/Typography";
import MediumCategoriesTable from "./medium_categories_table";

export async function loader({
  request,
  params: {
    lc
  }
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  if (lc) {
    const { data: d, error } = await supabase
      .from('medium_categories')
      .select('id, name, large_categories(name), small_categories(items(amount, is_income))')
      .eq('large_category_id', parseInt(lc));
    if (error) {
      console.error(error);
      throw error;
    }
    return data(d, { headers });
  }
  else {
    const { data: d, error } = await supabase
      .from('medium_categories')
      .select('id, name, large_categories(name), small_categories(items(amount, is_income))');
    if (error) {
      console.error(error);
      throw error;
    }
    return data(d, { headers });
  }
}

export default function MediumCategoriesView({
  loaderData
}: Route.ComponentProps) {
  return (
    <>
      <Typography variant="h2" component="h2">中分類</Typography>
      <MediumCategoriesTable mediumCategories={loaderData} />
    </>
  );
}