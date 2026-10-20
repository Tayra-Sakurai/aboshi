import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/large_category_add";
import LargeCategoryForm from "./large_category_form";
import { data, redirect } from "react-router";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "大分類を追加 | Aboshi" },
    {
      name: "description",
      content: "新しい大分類を登録します。",
    },
  ];
}

export async function action({
  request
}: Route.ActionArgs) {
  const { supabase, headers } = createClient(request);
  const formData = await request.formData();
  const name = formData.get('name');
  if (typeof name === 'string') {
    const { error } = await supabase
      .from('large_categories')
      .insert({
        name,
      });
    if (error)
      throw data(error, 500);
    return redirect('/large_categories', {headers});
  }
}

export default function LargeCategoryAdd() {
  return <LargeCategoryForm />;
}