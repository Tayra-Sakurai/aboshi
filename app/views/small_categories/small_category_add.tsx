import { createClient } from "~/utils/supabase.server";
import SmallCategoryForm from "./small_category_form";
import { data, redirect } from "react-router";
import type { Route } from "./+types/small_category_add";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "小分類を追加 | Aboshi" },
    {
      name: "description",
      content: "中分類と月間予算を設定して、新しい小分類を登録します。",
    },
  ];
}

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: large_categories, error: e } = await supabase
    .from('large_categories')
    .select('id, name');
  if (e)
    throw e;
  const { data: medium_categories, error } = await supabase
    .from('medium_categories')
    .select('id, name, large_categories(id, name)');
  if (error)
    throw error;
  return data({
    large_categories,
    medium_categories
  }, {
    headers
  });
}

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const mcid = formData.get('medium_category_id');
  const budget = formData.get('monthly_budget');
  if (
    (typeof name === 'string') &&
    (typeof mcid === 'string') &&
    (typeof budget === 'string')
  ) {
    const { supabase, headers } = createClient(request);
    const medium_category_id = parseInt(mcid);
    const monthly_budget = parseFloat(budget);
    const { error } = await supabase
      .from('small_categories')
      .insert({
        medium_category_id,
        monthly_budget,
        name
      });
    if (error)
      throw error;
    throw redirect('/small_categories', { headers });
  }
}

export default function SmallCategoryAdd({
  loaderData
}: Route.ComponentProps) {
  return <SmallCategoryForm {...loaderData} />;
}
