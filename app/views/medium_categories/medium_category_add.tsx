import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/medium_category_add";
import MediumCategoryForm from "./medium_category_form";
import { data, redirect } from "react-router";

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: dt, error } = await supabase
    .from('large_categories')
    .select('id, name');
  if (error)
    throw error;
  return data(dt, { headers });
}

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const large_category_id = formData.get('large_category_id');
  const name = formData.get('name');
  if ((typeof name === 'string') && (typeof large_category_id === 'string')) {
    const { supabase, headers } = createClient(request);
    const { error } = await supabase
      .from('medium_categories')
      .insert({
        large_category_id: parseInt(large_category_id),
        name,
      });
    if (error)
      throw error;
    throw redirect('/medium_categories', { headers });
  }
  throw data(null, 400);
}

export default function MediumCategoryAdd({
  loaderData
}: Route.ComponentProps) {
  return <MediumCategoryForm largeCategories={loaderData} />;
}